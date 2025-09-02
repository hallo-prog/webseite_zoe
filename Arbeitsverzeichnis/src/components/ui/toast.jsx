import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, X, Info } from 'lucide-react';

/**
 * Toast Types and Configuration
 */
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error', 
  WARNING: 'warning',
  INFO: 'info'
};

const TOAST_ICONS = {
  [TOAST_TYPES.SUCCESS]: CheckCircle,
  [TOAST_TYPES.ERROR]: AlertCircle,
  [TOAST_TYPES.WARNING]: AlertTriangle,
  [TOAST_TYPES.INFO]: Info,
};

const TOAST_STYLES = {
  [TOAST_TYPES.SUCCESS]: 'bg-green-50 border-green-200 text-green-800',
  [TOAST_TYPES.ERROR]: 'bg-red-50 border-red-200 text-red-800',
  [TOAST_TYPES.WARNING]: 'bg-amber-50 border-amber-200 text-amber-800',
  [TOAST_TYPES.INFO]: 'bg-blue-50 border-blue-200 text-blue-800',
};

const ICON_STYLES = {
  [TOAST_TYPES.SUCCESS]: 'text-green-400',
  [TOAST_TYPES.ERROR]: 'text-red-400',
  [TOAST_TYPES.WARNING]: 'text-amber-400',
  [TOAST_TYPES.INFO]: 'text-blue-400',
};

/**
 * Toast Context
 */
const ToastContext = createContext();

/**
 * Individual Toast Component
 */
function Toast({ toast, onClose }) {
  const Icon = TOAST_ICONS[toast.type];
  const toastStyle = TOAST_STYLES[toast.type];
  const iconStyle = ICON_STYLES[toast.type];

  return (
    <div 
      className={`
        ${toastStyle} 
        flex items-start p-4 rounded-lg border shadow-lg 
        animate-in slide-in-from-right-full duration-300
        max-w-md w-full
      `}
      role="alert"
    >
      <Icon className={`${iconStyle} w-5 h-5 mt-0.5 flex-shrink-0`} />
      <div className="ml-3 flex-1">
        {toast.title && (
          <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
        )}
        <p className="text-sm">{toast.message}</p>
        {toast.action && (
          <div className="mt-2">
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-3 flex-shrink-0 p-1 rounded-lg hover:bg-white/50 transition-colors"
        aria-label="Toast schließen"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * Toast Container Component
 */
function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

/**
 * Toast Provider Component
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: TOAST_TYPES.INFO,
      duration: 5000, // 5 seconds default
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({ 
      message, 
      type: TOAST_TYPES.SUCCESS, 
      ...options 
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ 
      message, 
      type: TOAST_TYPES.ERROR, 
      duration: 7000, // Errors stay longer
      ...options 
    });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ 
      message, 
      type: TOAST_TYPES.WARNING, 
      ...options 
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ 
      message, 
      type: TOAST_TYPES.INFO, 
      ...options 
    });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast functionality
 */
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}

/**
 * Higher-order component to wrap with toast functionality
 */
export function withToast(Component) {
  return function ToastWrappedComponent(props) {
    return (
      <ToastProvider>
        <Component {...props} />
      </ToastProvider>
    );
  };
}

// Export types for external use
export { TOAST_TYPES };