import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { Section } from '@/components/ui/section';

export function SectionCostInaction({ metrics = [], copy = {} }) {
  const hl = copy.hl || getCopy('coi.hl', 'Kosten des Nicht-Handelns');
  const desc = copy.desc || getCopy('coi.txt.desc', 'Aufschub frisst Rendite: Opportunitätskosten, Emissionen & Preisvolatilität akkumulieren.');
  const data = metrics.length ? metrics : [
    { label: getCopy('coi.metric.loss_year', 'Verpasste Ersparnis / Jahr'), value: '1.240 €' },
    { label: getCopy('coi.metric.co2', 'Zusätzliche CO₂ Emissionen'), value: '≈ 2,1 t' },
    { label: getCopy('coi.metric.escalation', 'Preissteigerungs-Risiko'), value: '+X% p.a.' }
  ];
  return (
    <Section variant="plain" padding="normal" size="wide">
        <div className="max-w-3xl mb-12">
          <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
          <p className="text-gray-600 leading-relaxed text-sm-token md:text-base">{desc}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.map((m,i)=>(
            <Card key={i} variant="subtle" elevation="sm" className="p-6">
              <Metric value={m.value} label={m.label} size="md" />
            </Card>
          ))}
        </div>
    </Section>
  );
}

export default SectionCostInaction;