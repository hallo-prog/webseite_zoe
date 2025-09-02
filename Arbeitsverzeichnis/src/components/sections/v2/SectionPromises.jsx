import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionPromises({ items = [], copy = {} }) {
  const hl = copy.hl || getCopy('promises.hl', 'Unser Versprechen an Sie');
  const desc = copy.desc || getCopy('promises.desc', 'Qualität, Transparenz und Betreuung – fundiert und überprüfbar.');
  const data = items.length ? items : [
    { k: 'quality', t: getCopy('promise.quality.hl', 'Technische Exzellenz'), d: getCopy('promise.quality.txt', 'Geprüfte Komponenten, konservative Ertragsannahmen, dokumentierte Auslegung.') },
    { k: 'installation', t: getCopy('promise.install.hl', 'Saubere Installation'), d: getCopy('promise.install.txt', 'Fest angestellte Teams, standardisierte Montage-Checklisten, Abnahmeprotokoll.') },
    { k: 'service', t: getCopy('promise.service.hl', 'Aktiver Service'), d: getCopy('promise.service.txt', 'Monitoring & proaktive Hinweis-Meldungen – keine reaktive Hotline.') },
    { k: 'advisor', t: getCopy('promise.advisor.hl', 'Fester Ansprechpartner'), d: getCopy('promise.advisor.txt', 'Von Analyse bis Inbetriebnahme & danach – durchgängige Ownership.') }
  ];
  return (
  <Section variant="plain" padding="normal" contain={false}>
      <div className="pro-container max-w-6xl">
        <div className="max-w-3xl mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 leading-relaxed text-sm-token">{desc}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.map(p => (
            <Card key={p.k} variant="subtle" elevation="sm" className="p-5">
              <Heading as="h3" size="sm" className="mb-2">{p.t}</Heading>
              <p className="text-sm text-gray-600 leading-relaxed">{p.d}</p>
            </Card>
          ))}
        </div>
      </div>
  </Section>
  );
}

export default SectionPromises;
