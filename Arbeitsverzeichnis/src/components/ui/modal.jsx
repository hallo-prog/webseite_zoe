import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Modal primitive (centered) with focus trap + ESC close
export function Modal({ open, onOpenChange, children, ariaLabel='Dialog', size='md' }) {
  const ref = useRef(null);
  const mountRef = useRef(null);
  if (!mountRef.current && typeof document !== 'undefined') {
    mountRef.current = document.createElement('div');
  }
  useEffect(() => { if (mountRef.current) { document.body.appendChild(mountRef.current); return () => mountRef.current.parentNode?.removeChild(mountRef.current);} }, []);
  useEffect(() => { if (open) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; } return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => { if (!open) return; const onKey = e => { if (e.key === 'Escape') onOpenChange(false);} ; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [open, onOpenChange]);
  useEffect(() => { if (!open || !ref.current) return; const el = ref.current; const focusable = el.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'); focusable[0]?.focus(); const trap = e=>{ if(e.key!=='Tab')return; if(!focusable.length)return; const first=focusable[0]; const last=focusable[focusable.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }; el.addEventListener('keydown', trap); return ()=>el.removeEventListener('keydown',trap); }, [open]);
  if (!open || !mountRef.current) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>onOpenChange(false)} />
      <div ref={ref} className={`relative bg-white rounded-xl shadow-soft-lg border border-neutral-200 w-full ${sizes[size]||sizes.md} mx-4 p-6 anim-base ease-standard`}>{children}</div>
    </div>,
    mountRef.current
  );
}

export default Modal;
