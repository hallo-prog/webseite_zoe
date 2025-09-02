import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Drawer Component
// Props: open, onOpenChange(bool), side: 'right'|'left'|'bottom', width, children, ariaLabel
// Handles: body scroll lock, ESC close, basic focus trap (loop)

let overlayCounter = 0;
function lock(body) { if (overlayCounter === 0) { body.dataset.prevOverflow = body.style.overflow; body.style.overflow = 'hidden'; } overlayCounter++; }
function unlock(body) { overlayCounter = Math.max(overlayCounter - 1, 0); if (overlayCounter === 0) body.style.overflow = body.dataset.prevOverflow || ''; }

export function Drawer({ open, onOpenChange, side='right', width=384, children, ariaLabel='Seitliches Panel' }) {
  const mountRef = useRef(null);
  const panelRef = useRef(null);

  if (!mountRef.current && typeof document !== 'undefined') {
    const el = document.createElement('div');
    el.className = 'ui-portal-root';
    mountRef.current = el;
  }

  useEffect(() => {
    if (!mountRef.current) return;
    document.body.appendChild(mountRef.current);
    return () => { if (mountRef.current?.parentNode) mountRef.current.parentNode.removeChild(mountRef.current); };
  }, []);

  // Scroll lock
  useEffect(() => {
    if (open) lock(document.body); else unlock(document.body);
    return () => { if (open) unlock(document.body); };
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange(false); }; 
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    panel.addEventListener('keydown', trap);
    return () => panel.removeEventListener('keydown', trap);
  }, [open]);

  if (!open || !mountRef.current) return null;
  const translate = side === 'right' ? 'translate-x-0' : side === 'left' ? 'translate-x-0' : 'translate-y-0';
  const sidePos = side === 'right' ? 'right-0 top-0 h-full' : side === 'left' ? 'left-0 top-0 h-full' : 'left-0 bottom-0 w-full';
  const sizeStyle = side === 'bottom' ? { height: width } : { width };
  const originTransform = side === 'right' ? 'translate-x-full' : side === 'left' ? '-translate-x-full' : 'translate-y-full';
  return createPortal(
  <div className="fixed inset-0 z-[120]" role="dialog" aria-label={ariaLabel} aria-modal="true">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] anim-base ease-standard" onClick={() => onOpenChange(false)} />
      <div
        ref={panelRef}
  className={`absolute bg-white shadow-soft-lg border border-neutral-200 rounded-none md:rounded-tl-xl md:rounded-bl-xl flex flex-col outline-none ${sidePos} transform ${translate} anim-base ease-standard focus-visible:focus-ring`}
        style={sizeStyle}
        data-origin-transform={originTransform}
      >
        {children}
      </div>
    </div>,
    mountRef.current
  );
}

export default Drawer;
