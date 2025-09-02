import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionCTA({ copy = {}, onPrimary, onSecondary, guarantees = [] }) {
  const hl = copy.hl || getCopy('cta.final.hl', 'Individuelle Solar-Analyse anfordern');
  const sub = copy.sub || getCopy('cta.final.sub', 'Verlässliche Kennzahlen statt Schätzwerte – kostenfrei & unverbindlich.');
  const ctaPrimary = copy.ctaPrimary || getCopy('cta.final.primary', 'Analyse starten');
  const ctaSecondary = copy.ctaSecondary || getCopy('cta.final.secondary', 'Fragen stellen');
  const guaranteeList = guarantees.length ? guarantees : [
    getCopy('risk.price.lock', 'Festpreis nach Prüfung'),
    getCopy('risk.performance.guarantee', 'Leistungsgarantie Monitoring'),
    getCopy('risk.service.sla', 'Reaktionszeit <24h')
  ];
  return (
    <Section variant="neutral" padding="normal" contain={false}>
      <div className="pro-container max-w-4xl text-center">
  <Heading as="h2" size="2xl" className="mb-5 text-balance">{hl}</Heading>
        <p className="text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto text-sm-token">{sub}</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button variant="primary" size="lg" onClick={onPrimary} className="min-w-[200px]">{ctaPrimary}</Button>
          <Button variant="outline" size="lg" onClick={onSecondary} className="min-w-[180px]">{ctaSecondary}</Button>
        </div>
        <ul className="flex flex-wrap justify-center gap-2 text-2xs text-neutral-600">
          {guaranteeList.map((g,i)=>(<li key={i} className="px-3 py-1 rounded-full bg-white border border-neutral-200">{g}</li>))}
        </ul>
      </div>
    </Section>
  );
}

export default SectionCTA;