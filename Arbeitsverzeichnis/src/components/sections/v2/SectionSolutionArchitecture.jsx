import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionSolutionArchitecture({ pillars = [], copy = {} }) {
  const hl = copy.hl || getCopy('solution.hl', 'Das integrierte Energiesystem');
  const sub = copy.sub || getCopy('solution.txt.sub', 'Planung → Installation → Monitoring – orchestrierte Kette für stabile Rendite.');
  const items = pillars.length ? pillars : [
    { t: getCopy('solution.pillar.planning', 'Planung'), d: getCopy('solution.pillar.planning.desc', 'Lastprofil-Auslegung & Szenarienmodellierung') },
    { t: getCopy('solution.pillar.install', 'Installation'), d: getCopy('solution.pillar.install.desc', 'Zertifizierte Montage & Qualitätssicherung') },
    { t: getCopy('solution.pillar.monitor', 'Monitoring'), d: getCopy('solution.pillar.monitor.desc', 'Performance Alerts & Optimierung') }
  ];
  return (
    <Section variant="plain" padding="normal" size="wide">
        <div className="max-w-3xl mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 text-sm-token md:text-base leading-relaxed">{sub}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((p,i)=>(
            <Card key={i} variant="subtle" elevation="sm" className="p-6">
              <Heading as="h3" size="sm" className="mb-2 tracking-tight">{p.t}</Heading>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">{p.d}</p>
            </Card>
          ))}
        </div>
    </Section>
  );
}

export default SectionSolutionArchitecture;