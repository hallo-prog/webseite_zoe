import React from 'react';
import { Section } from '@/components/ui/section';
import { trackVariant } from '@/utils/tracking';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';

export default function ImpactSection({ metrics=[] }) {
  const data = metrics.length ? metrics : [
    { label:'CO₂ Einsparung / Jahr', value:'4.2 t', icon:'🌱', comparison:'= Emission von 2 Mittelklassewagen', tone:'emerald' },
    { label:'Autarkiegrad', value:'78%', icon:'💰', comparison:'Eigenversorgungsanteil aktuell', tone:'neutral' },
    { label:'Jahresproduktion', value:'2.1 MWh', icon:'⚡', comparison:'≈ Bedarf von 4 Haushalten', tone:'amber' },
    { label:'Garantie & Support', value:'25+', icon:'🛡️', comparison:'Jahre abgesichert', tone:'blue' },
  ];

  React.useEffect(()=> trackVariant('impact_section_view',{ metric_count:data.length }),[data.length]);

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Wirkung & Kennzahlen</Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">Nachhaltigkeit, Wirtschaftlichkeit und Betriebssicherheit – transparent quantifiziert.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.map((m,i)=>{
            const colorMap = {
              emerald: 'text-emerald-600',
              neutral: 'text-neutral-600',
              amber: 'text-amber-500',
              blue: 'text-blue-600'
            };
            return (
              <Card key={i} variant="subtle" elevation="sm" className="p-6 text-center">
                <div className="text-2xl mb-2">{m.icon}</div>
                <Metric value={m.value} label={m.label} size="md" className="mb-1" />
                <div className="text-[11px] text-neutral-500">{m.comparison}</div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card variant="accent" elevation="md" className="inline-flex flex-col md:flex-row md:items-center gap-4 px-6 py-5">
            <span className="text-xl">🌍</span>
            <p className="text-sm text-neutral-600 max-w-xl md:text-left">Jede Anlage reduziert Emissionen und stabilisiert Energiekosten – messbarer Impact statt Symbolik.</p>
          </Card>
        </div>
  </Section>
  );
}
