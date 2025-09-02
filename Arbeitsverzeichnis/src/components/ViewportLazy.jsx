import React, { useEffect, useRef, useState, Suspense } from 'react';

// Generic viewport based lazy loader wrapper
export default function ViewportLazy({ importer, children, fallback = null, rootMargin = '200px 0px', once = true }) {
  const [ready, setReady] = useState(false);
  const [Comp, setComp] = useState(null);
  const ref = useRef(null);
  useEffect(()=>{
    if (ready) return; // already loaded
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(async e => {
        if (e.isIntersecting) {
          try {
            const mod = await importer();
            setComp(()=> mod.default || mod);
            setReady(true);
            if (once) io.disconnect();
          } catch (err) { /* ignore */ }
        }
      });
    }, { root: null, rootMargin, threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [importer, ready, rootMargin, once]);
  return (
    <div ref={ref} data-viewport-lazy>
      {Comp ? <Suspense fallback={fallback}>{React.createElement(Comp, null, children)}</Suspense> : (fallback || null)}
    </div>
  );
}
