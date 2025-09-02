import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionLeadMagnetStack({ items = [], copy = {}, onSelect }) {
  const hl = copy.hl || getCopy('lm.stack.hl', 'Ihr Einstieg – wählen Sie den nächsten Schritt');
  const desc = copy.desc || getCopy('lm.stack.desc', 'Option wählen & Momentum nutzen – skalierbarer Einstieg.');
  const data = items.length ? items : [
    { k: 'analysis', hl: getCopy('lm.analysis.hl','Individuelle Potenzialanalyse'), sub: getCopy('lm.analysis.sub','Kennzahlen zu Ertrag & Amortisation'), cta: getCopy('cta.lm.analysis.primary','Analyse starten') },
    { k: 'guide', hl: getCopy('lm.guide.hl','Entscheidungs-Guide 2025'), sub: getCopy('lm.guide.sub','Förderung • Wirtschaftlichkeit • Technik'), cta: getCopy('cta.lm.guide.primary','PDF herunterladen') },
    { k: 'consult', hl: getCopy('lm.consult.hl','Kostenfreie Erstberatung'), sub: getCopy('lm.consult.sub','Planung & Wirtschaftlichkeits-Abgleich'), cta: getCopy('cta.lm.consult.primary','Termin anfragen') }
  ];
  return (
    <Section variant="plain" padding="normal" size="wide">
        <div className="max-w-3xl mb-12">
          <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
          <p className="text-gray-600 text-sm-token md:text-base leading-relaxed">{desc}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.map(card => (
            <Card key={card.k} variant="subtle" elevation="sm" className="p-6 flex flex-col">
              <Heading as="h3" size="sm" className="mb-2 tracking-tight">{card.hl}</Heading>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-5 flex-1">{card.sub}</p>
              <Button onClick={()=>onSelect && onSelect(card.k)} variant="outline" size="sm" className="text-xs md:text-sm mt-auto">{card.cta}</Button>
            </Card>
          ))}
        </div>
    </Section>
  );
}

export default SectionLeadMagnetStack;