import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { trackCta } from '@/utils/tracking';
import { Section } from '@/components/ui/section';

export default function FinalCTA({ onPrimary, onSecondary, copy={} }) {
  const {
    title='Starten Sie Ihre finanzielle Freiheit heute',
    sub='Mit 25 Jahren Garantie und kostenloser Analyse – Ihr Weg zu sauberem Strom und gesparten Kosten.',
    primary='Kostenlose Analyse starten',
    secondary='Persönliche Beratung'
  } = copy;

  return (
    <Section variant="warm" padding="normal">
        <Card variant="accent" elevation="lg" interactive className="p-10 text-center">
          <Heading level={2} variant="h2" className="mb-5 leading-tight">{title}</Heading>
          <p className="text-neutral-600 text-sm-token leading-relaxed max-w-2xl mx-auto mb-8">{sub}</p>
          <div className="mb-8 flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2"><span className="text-base">👥</span><span>2.847 Kunden</span></div>
            <div className="flex items-center gap-2"><span className="text-base">⭐</span><span>Ø 4.9 / 5</span></div>
            <div className="flex items-center gap-2"><span className="text-base">🛡️</span><span>25 Jahre Garantie</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" variant="primary" className="font-semibold min-w-[260px]" onClick={(e)=>{ trackCta('final_cta','primary'); onPrimary?.(e); }}>{primary}</Button>
            <Button size="xl" variant="outline" className="min-w-[260px]" onClick={(e)=>{ trackCta('final_cta','secondary'); onSecondary?.(e); }}>{secondary}</Button>
          </div>
          <div className="mt-6 text-[11px] text-neutral-500">
            <p><strong className="text-neutral-700">Transparenz:</strong> Analyse unverbindlich • Festpreis-Vertrag • Rücktritt innerhalb 30 Tagen möglich</p>
          </div>
        </Card>
    </Section>
  );
}
