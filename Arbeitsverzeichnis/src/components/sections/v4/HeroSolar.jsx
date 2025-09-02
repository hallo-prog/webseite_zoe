import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trackVariant, trackCta } from '@/utils/tracking';
import { ShieldCheck, Users, Gauge } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function HeroSolar({ onPrimary, onSecondary, data = {} }) {
  const {
    kicker = 'Stromkosten optimieren',
    title = 'Mehr Unabhängigkeit mit Ihrer eigenen Solaranlage',
    sub = 'Steigende Energiepreise? Mit unserem System produzieren Sie berechenbar Ihren eigenen Strom und sichern sich langfristige Kostenstabilität.',
    primary = 'Kostenlose Analyse starten',
    secondary = 'Beratung anfordern'
  } = data;
  React.useEffect(() => { trackVariant('hero_v4_view'); }, []);
  return (
    <Section className="hero-shell relative" padding="normal" variant="default" contain={false}>
      <div className="pro-container relative z-10">
        <div className="max-w-4xl">
          {/* Kicker */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <Badge variant="soft">{kicker}</Badge>
            <Badge variant="outline" color="ambient" size="xs" className="text-neutral-600 font-medium">Ø 200–300€ monatliche Stromkosten</Badge>
          </div>

            <h1 className="display-1 mb-6 text-neutral-900 inline-highlight">{title}</h1>
            <p className="lead mb-10 text-neutral-600 measure inline-emphasis">{sub}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-5 items-center">
            <Button size="lg" variant="primary" onClick={(e) => { trackCta('hero_v4', 'primary'); onPrimary?.(e); }}>{primary}</Button>
            <Button size="lg" variant="outline" onClick={(e) => { trackCta('hero_v4', 'secondary'); onSecondary?.(e); }}>{secondary}</Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-10 grid gap-6 md:grid-cols-3 text-[13px] font-medium tracking-wide text-neutral-600">
            <div className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600" /> 25 Jahre Garantie</div>
            <div className="flex items-start gap-2"><Users className="w-4 h-4 mt-0.5 text-emerald-600" /> 98% Zufriedenheit</div>
            <div className="flex items-start gap-2"><Gauge className="w-4 h-4 mt-0.5 text-emerald-600" /> TÜV & VDE geprüft</div>
          </div>

          {/* Social Proof */}
          <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-150">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-neutral-300 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-neutral-400 border-2 border-white" />
              </div>
              <span><strong>1.200+ Installationen</strong> in Ihrer Region</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-70 mix-blend-multiply pointer-events-none" aria-hidden="true" />
    </Section>
  );
}
