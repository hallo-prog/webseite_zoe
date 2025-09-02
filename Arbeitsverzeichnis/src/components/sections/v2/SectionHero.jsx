import React from 'react';
import { Button } from '@/components/ui/button';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionHero({ copy = {}, onPrimary, onSecondary, kicker }) {
  const hl = copy.hl || getCopy('hero.hl.primary', 'Ihre Solar-Analyse beginnt hier');
  const sub = copy.sub || getCopy('hero.txt.sub', 'Transparente Daten für wirtschaftliche Entscheidungen.');
  const ctaPrimary = copy.ctaPrimary || getCopy('hero.cta.primary', 'Analyse starten');
  const ctaSecondary = copy.ctaSecondary || getCopy('hero.cta.secondary', 'Mehr erfahren');
  const kickerText = kicker || copy.kicker || getCopy('hero.kicker', 'Premium Photovoltaik Intelligence');
  return (
  <Section className="hero-shell cinematic" padding="loose" variant="plain" size="wide">
      <div className="relative z-10">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="eyebrow bg-neutral-100 border border-neutral-200 text-neutral-600">{kickerText}</span>
          </div>
          <h1 className="display-1 mb-6 text-neutral-900 inline-highlight px-1">{hl}</h1>
          <p className="lead mb-10 text-neutral-600 measure inline-soft px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200">{sub}</p>
          <div className="flex flex-wrap gap-5 items-center">
            <Button variant="primary" size="lg" onClick={onPrimary}>{ctaPrimary}</Button>
            <Button variant="outline" size="lg" onClick={onSecondary}>{ctaSecondary}</Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-[13px] font-medium tracking-wide text-neutral-500">
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />{getCopy('hero.proof.guarantee','30J Garantie')}</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />{getCopy('hero.proof.performance','23% Wirkungsgrad')}</div>
            <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />{getCopy('hero.proof.trust','TÜV / VDE geprüft')}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default SectionHero;