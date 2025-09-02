import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionPricingTeaser({ copy = {}, stats = [] }) {
  const hl = copy.hl || getCopy('pricing.hl.anchor','Was kostet Ihr System – und wann rechnet es sich?');
  const sub = copy.sub || getCopy('pricing.txt.sub','Transparente Szenarien liefern realistische Erwartungswerte.');
  const data = stats.length ? stats : [
    { label: getCopy('stat.trust.avg_payback','Ø Amortisation Jahre'), value: getCopy('stat.trust.avg_payback.value','9,1') },
    { label: getCopy('stat.intelligence.self_consumption_gain','Eigenverbrauch-Steigerung'), value: getCopy('stat.intelligence.self_consumption_gain.value','+18%') },
    { label: getCopy('coi.metric.loss_year','Verpasste Ersparnis / Jahr'), value: getCopy('coi.metric.loss_year.value','1.240 €') }
  ];
  const cta = copy.cta || getCopy('pricing.cta.details','Preisdetails & Szenarien ansehen');
  return (
  <Section variant="plain" padding="normal" size="wide">
      <div className="grid gap-14 md:grid-cols-2 items-start">
        <div>
          <Heading as="h2" size="2xl" className="mb-5 text-balance inline-highlight px-2 py-1 rounded-lg">{hl}</Heading>
          <p className="text-gray-600 mb-6 leading-relaxed max-w-xl text-sm-token px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200">{sub}</p>
          <Button variant="outline" size="lg" className="min-w-[220px]">{cta}</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.map((s,i)=>(
            <Card key={i} variant="subtle" elevation="sm" className="p-4">
              <Metric value={s.value} label={s.label} size="sm" />
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default SectionPricingTeaser;