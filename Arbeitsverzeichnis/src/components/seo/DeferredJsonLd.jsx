import React, { useEffect } from 'react';

/**
 * DeferredJsonLd – injiziert JSON-LD Objekte erst im Idle-Zeitfenster,
 * um die initiale Seitenladezeit nicht zu beeinträchtigen
 */
export default function DeferredJsonLd({ items = [], chunk = 'deferred-jsonld' }) {
  useEffect(() => {
    // Verwende requestIdleCallback wenn verfügbar, sonst setTimeout
    const scheduleInjection = window.requestIdleCallback ||
      ((callback) => setTimeout(callback, 1));

    scheduleInjection(() => {
      try {
        items.forEach((item, index) => {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.text = JSON.stringify(item);
          script.setAttribute('data-chunk', `${chunk}-${index}`);

          // Vermeide Duplikate
          const existing = document.querySelector(`script[data-chunk="${chunk}-${index}"]`);
          if (!existing) {
            document.head.appendChild(script);
          }
        });
      } catch (e) {
        console.warn('[DeferredJsonLd] inject failed', e);
      }
    });

    // Cleanup beim Unmount
    return () => {
      items.forEach((_, index) => {
        const existing = document.querySelector(`script[data-chunk="${chunk}-${index}"]`);
        if (existing) {
          existing.remove();
        }
      });
    };
  }, [items, chunk]);

  return null; // Diese Komponente rendert nichts
}
