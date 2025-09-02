import React from 'react';
import { Button } from '@/components/ui/button';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionTechCalculatorCTA({ copy = {}, onPrimary, onSecondary }) {
  const hl = copy.hl || getCopy('tech.calccta.hl', 'Berechnen Sie Ihren Vorteil');
  const sub = copy.sub || getCopy('tech.calccta.sub', 'Kosten / Ertrag transparent simuliert – jetzt Analyse starten.');
  const ctaPrimary = copy.ctaPrimary || getCopy('tech.calccta.ctaPrimary', 'Ersparnis berechnen');
  const ctaSecondary = copy.ctaSecondary || getCopy('tech.calccta.ctaSecondary', 'Technische Beratung');
  return (
    <Section variant="neutral" padding="tight" size="narrow">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">{hl}</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">{sub}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={onPrimary} variant="primary" size="lg">{ctaPrimary}</Button>
          <Button onClick={onSecondary} variant="outline" size="lg">{ctaSecondary}</Button>
        </div>
      </div>
    </Section>
  );
}

export default SectionTechCalculatorCTA;
