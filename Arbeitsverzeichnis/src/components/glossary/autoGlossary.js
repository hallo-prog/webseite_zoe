import React from 'react';
import { GLOSSARY_TERMS } from './terms';
import { GlossaryTooltip } from '@/components/ui/glossary-tooltip';

// Splittet einfachen Text in Nodes mit Tooltips
export function applyGlossary(text) {
  if (!text || typeof text !== 'string') return text;
  // Wir gehen sequenziell über die Patterns und ersetzen – um verschachtelte Probleme zu vermeiden, einmal pro Begriff parsen
  let nodes = [text];
  GLOSSARY_TERMS.forEach(entry => {
    const next = [];
    nodes.forEach(n => {
      if (typeof n !== 'string') { next.push(n); return; }
      const parts = n.split(entry.pattern);
      if (parts.length === 1) { next.push(n); return; }
      let idx = 0;
      parts.forEach((p, i) => {
        if (p) next.push(p);
        if (i < parts.length - 1) {
          const key = `${entry.term}-${idx++}-${i}`;
          next.push(
            React.createElement(GlossaryTooltip, { key, term: entry.term, description: entry.description }, entry.term)
          );
        }
      });
    });
    nodes = next;
  });
  return nodes;
}

// Komponente für einfache Verwendung
export function GlossarText({ children }) {
  return React.createElement(React.Fragment, null, applyGlossary(children));
}
