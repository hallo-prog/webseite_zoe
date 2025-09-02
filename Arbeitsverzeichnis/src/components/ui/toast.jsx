import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
const ToastContext = createContext(null);
let idCounter = 0;

export function ToastProvider({ children, position='top-right', duration=4000 }) {
  const [toasts, setToasts] = useState([]);
  const portalRef = useRef(null);
  if (!portalRef.current && typeof document !== 'undefined') {
    const el = document.createElement('div');
    el.className = 'ui-portal-root';
    portalRef.current = el;
  }
  useEffect(() => { if (portalRef.current) { document.body.appendChild(portalRef.current); return ()=> portalRef.current.parentNode?.removeChild(portalRef.current);} }, []);
  const push = useCallback((content, opts={}) => {
    const id = ++idCounter;
    const toast = { id, content, variant: opts.variant||'info', ttl: opts.duration||duration };
    setToasts(t => [...t, toast]);
    return id;
  }, [duration]);
  const remove = useCallback(id => setToasts(t => t.filter(x=>x.id!==id)), []);

  // Auto dismiss
  useEffect(()=>{
    if(!toasts.length) return; const timers = toasts.map(t=> setTimeout(()=> remove(t.id), t.ttl));
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  const value = { push, remove };
  const posClass = position.includes('top') ? 'top-4' : 'bottom-4';
  const xClass = position.includes('right') ? 'right-4' : position.includes('left') ? 'left-4' : 'left-1/2 -translate-x-1/2';
  return (
    <ToastContext.Provider value={value}>
      {children}
      {portalRef.current && createPortal(
        <div className={`fixed z-[140] ${posClass} ${xClass} space-y-3 w-full max-w-sm`}>
          {toasts.map(t => (
            <div key={t.id} className={`toast flex items-start gap-3 p-4 rounded-lg shadow-md border text-sm bg-white ${toastVariantCls(t.variant)}`} role="status" aria-live="polite">
              <div className="flex-1 leading-snug">{typeof t.content === 'function' ? t.content({ id:t.id, dismiss:()=>remove(t.id) }) : t.content}</div>
              <Button variant="plain" onClick={()=>remove(t.id)} className="opacity-60 hover:opacity-100 rounded p-1 focus-visible:focus-ring" aria-label="Schließen">✕</Button>
            </div>
          ))}
        </div>, portalRef.current)}
    </ToastContext.Provider>
  );
}
function toastVariantCls(v){
  switch(v){
    case 'success': return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  case 'error': return 'border-red-200 bg-red-50 text-red-800';
  case 'warning': return 'border-amber-200 bg-amber-50 text-amber-900';
  case 'info': default: return 'border-neutral-200 bg-white text-neutral-900';
  }
}

export function useToast(){
  const ctx = useContext(ToastContext);
  if(!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

  const push = useCallback((content, opts={}) => {
    const id = ++idCounter;
    const toast = { id, content, variant: opts.variant||'info', ttl: opts.duration||duration };
    setToasts(t => [...t, toast]);
    return id;
  }, [duration]);
  const remove = useCallback(id => setToasts(t => t.filter(x=>x.id!==id)), []);

  // Auto dismiss
  useEffect(()=>{
    if(!toasts.length) return; const timers = toasts.map(t=> setTimeout(()=> remove(t.id), t.ttl));
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  const value = { push, remove };
  const posClass = position.includes('top') ? 'top-4' : 'bottom-4';
  const xClass = position.includes('right') ? 'right-4' : position.includes('left') ? 'left-4' : 'left-1/2 -translate-x-1/2';

  return (
    <ToastContext.Provider value={value}>
      {children}
      {portalRef.current && createPortal(
        <div className={`fixed z-[140] ${posClass} ${xClass} space-y-3 w-full max-w-sm`}>
          {toasts.map(t => (
            <div key={t.id} className={`toast flex items-start gap-3 p-4 rounded-lg shadow-md border text-sm bg-white ${toastVariantCls(t.variant)}`} role="status" aria-live="polite">
              <div className="flex-1 leading-snug">{typeof t.content === 'function' ? t.content({ id:t.id, dismiss:()=>remove(t.id) }) : t.content}</div>
              <Button variant="plain" onClick={()=>remove(t.id)} className="opacity-60 hover:opacity-100 rounded p-1 focus-visible:focus-ring" aria-label="Schließen">✕</Button>
            </div>
          ))}
        </div>, portalRef.current)}
    </ToastContext.Provider>
  );
}

export function useToast(){
  const ctx = useContext(ToastContext);
  if(!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
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
function toastVariantCls(v){
  switch(v){
    case 'success': return 'border-emerald-200 bg-emerald-50 text-emerald-900';
    case 'error': return 'border-red-200 bg-red-50 text-red-800';
    case 'warning': return 'border-amber-200 bg-amber-50 text-amber-900';
    case 'info': default: return 'border-neutral-200 bg-white text-neutral-900';
  }
}

export function useToast(){
  const ctx = useContext(ToastContext);
  if(!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

export default ToastProvider;
