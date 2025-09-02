import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/button';

// Accessible Accordion primitive
// Keyboard: ArrowUp/Down to navigate headers, Home/End jump, Enter/Space toggle
// Props: items: [{ id?, title, content }], allowMultiple, defaultOpen (ids)

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [] }) {
  const [openItems, setOpen] = useState(() => new Set(defaultOpen));
  const accId = useId();

  function toggle(id) {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  function onKey(e, idx) {
    const key = e.key;
    if (!['ArrowDown','ArrowUp','Home','End'].includes(key)) return;
    e.preventDefault();
    const buttons = e.currentTarget.parentElement.parentElement.querySelectorAll('button[role="button"][data-acc-btn]');
    if (!buttons.length) return;
    let targetIndex = idx;
    if (key === 'ArrowDown') targetIndex = (idx + 1) % buttons.length;
    if (key === 'ArrowUp') targetIndex = (idx - 1 + buttons.length) % buttons.length;
    if (key === 'Home') targetIndex = 0;
    if (key === 'End') targetIndex = buttons.length - 1;
    buttons[targetIndex].focus();
  }

  return (
    <div className="accordion divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-sm">
      {items.map((it, i) => {
        const id = it.id || `${accId}-${i}`;
        const open = openItems.has(id);
        const headingId = `${id}-heading`;
        const panelId = `${id}-panel`;
        return (
          <div key={id} className="accordion-item">
            <h3 className="m-0">
              <Button
                variant="plain"
                type="button"
                id={headingId}
                aria-controls={panelId}
                aria-expanded={open}
                data-acc-btn
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between gap-4 text-left py-4 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 hover:bg-white rounded-xl transition-colors"
              >
                <span className="font-medium leading-snug pr-4">{it.title}</span>
                <span className={`transition-transform duration-300 ease-standard text-neutral-500 ${open ? 'rotate-180' : ''}`} aria-hidden>⌄</span>
              </Button>
            </h3>
            <div
              role="region"
              id={panelId}
              aria-labelledby={headingId}
              hidden={!open}
              className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-neutral-700" 
            >
              {typeof it.content === 'function' ? it.content({ open }) : it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
