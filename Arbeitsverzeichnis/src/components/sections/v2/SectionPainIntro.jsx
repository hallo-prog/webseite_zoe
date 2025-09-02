import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionPainIntro({ items = [], copy = {} }) {
  const hl = copy.hl || getCopy('pain.hl', 'Warum jetzt handeln?');
  const intro = copy.intro || getCopy('pain.intro', 'Jede Verzögerung verschiebt Rendite und erhöht Risiko – drei Kernfaktoren:');
  const list = items.length ? items : [
    getCopy('pain.item.energy_prices', 'Steigende Strompreise'),
    getCopy('pain.item.delay_costs', 'Verpasste kumulierte Ersparnis bei Aufschub'),
    getCopy('pain.item.uncertainty', 'Förder- & Regulierungs-Unsicherheit')
  ];
  return (
    <Section variant="neutral" padding="normal" size="wide">
        <div className="max-w-3xl mb-10">
          <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
          <p className="text-gray-600 text-sm-token md:text-base leading-relaxed">{intro}</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {list.map((l,i)=>(
            <li key={i} className="list-none">
              <Card variant="subtle" elevation="sm" className="p-5 h-full">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">{l}</p>
              </Card>
            </li>
          ))}
        </ul>
    </Section>
  );
}

export default SectionPainIntro;