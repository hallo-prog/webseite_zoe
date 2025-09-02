import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './button';

/**
 * Unified Overlay Component
 * 
 * Common overlay layer with portals, scroll lock, focus management, and escape key handling.
 * Supports both modal and drawer patterns with consistent behavior.
 */

// Hook for scroll lock management
function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}

// Hook for focus trap management
function useFocusTrap(isActive, containerRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, containerRef]);
}

/**
 * Base Overlay Component
 */
export function Overlay({
  isOpen,
  onClose,
  children,
  variant = 'modal', // 'modal' | 'drawer-right' | 'drawer-left' | 'drawer-bottom'
  size = 'default', // 'sm' | 'default' | 'lg' | 'xl' | 'full'
  backdrop = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  lockScroll = true,
  className = '',
  ...props
}) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll lock
  useScrollLock(isOpen && lockScroll);
  
  // Focus trap
  useFocusTrap(isOpen, containerRef);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  }, [closeOnBackdrop, onClose]);

  if (!isOpen) return null;

  // Variant styles
  const variantStyles = {
    modal: 'flex items-center justify-center p-4',
    'drawer-right': 'justify-end',
    'drawer-left': 'justify-start', 
    'drawer-bottom': 'items-end justify-center'
  };

  const contentStyles = {
    modal: {
      sm: 'max-w-sm w-full',
      default: 'max-w-lg w-full',
      lg: 'max-w-2xl w-full',
      xl: 'max-w-4xl w-full',
      full: 'max-w-6xl w-full'
    },
    'drawer-right': {
      sm: 'w-80 h-full',
      default: 'w-96 h-full',
      lg: 'w-[500px] h-full',
      xl: 'w-[600px] h-full',
      full: 'w-full h-full'
    },
    'drawer-left': {
      sm: 'w-80 h-full',
      default: 'w-96 h-full', 
      lg: 'w-[500px] h-full',
      xl: 'w-[600px] h-full',
      full: 'w-full h-full'
    },
    'drawer-bottom': {
      sm: 'w-full max-h-[50vh]',
      default: 'w-full max-h-[70vh]',
      lg: 'w-full max-h-[80vh]',
      xl: 'w-full max-h-[90vh]',
      full: 'w-full h-full'
    }
  };

  const animationStyles = {
    modal: 'animate-in fade-in zoom-in-95 duration-200',
    'drawer-right': 'animate-in slide-in-from-right duration-300',
    'drawer-left': 'animate-in slide-in-from-left duration-300',
    'drawer-bottom': 'animate-in slide-in-from-bottom duration-300'
  };

  const overlayContent = (
    <div
      ref={overlayRef}
      className={`
        fixed inset-0 z-50 flex
        ${backdrop ? 'bg-black/60 backdrop-blur-sm' : ''}
        ${variantStyles[variant]}
      `}
      onClick={handleBackdropClick}
      {...props}
    >
      <div
        ref={containerRef}
        className={`
          bg-white rounded-lg shadow-xl
          ${contentStyles[variant][size]}
          ${animationStyles[variant]}
          ${variant.startsWith('drawer') ? 'max-w-none' : ''}
          ${variant === 'drawer-right' || variant === 'drawer-left' ? 'rounded-l-none' : ''}
          ${variant === 'drawer-bottom' ? 'rounded-b-none' : ''}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
}

/**
 * Modal Component (preset)
 */
export function Modal({ 
  title,
  children,
  footer,
  onClose,
  showCloseButton = true,
  ...props 
}) {
  return (
    <Overlay variant="modal" onClose={onClose} {...props}>
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
                aria-label="Modal schließen"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 pt-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </Overlay>
  );
}

/**
 * Drawer Component (preset)
 */
export function Drawer({
  title,
  children,
  onClose,
  position = 'right', // 'right' | 'left' | 'bottom'
  showCloseButton = true,
  ...props
}) {
  const variant = `drawer-${position}`;
  
  return (
    <Overlay variant={variant} onClose={onClose} {...props}>
      <div className="flex flex-col h-full">
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 flex-shrink-0">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
                aria-label="Drawer schließen"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </Overlay>
  );
}

/**
 * React hooks for overlay management
 */
export function useOverlay(initialOpen = false) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export default Overlay;