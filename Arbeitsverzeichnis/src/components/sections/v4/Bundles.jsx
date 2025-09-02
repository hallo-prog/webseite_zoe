import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { trackVariant, trackCta } from '@/utils/tracking';
import { Section } from '@/components/ui/section';

const defaultBundles = [
  {
    id:'pv-basic',
    title:'Solar Basis-Paket',
    desc:'Ihre Eintrittskarte in die Energiewende – ohne versteckte Kosten',
    kpis:['Premium-Komponenten (Tier-1)','25 Jahre Leistungsgarantie','Kostenlose Wartung 5 Jahre'],
    price:'ab 9.500 €',
    savings:'1.200 €/Jahr sparen',
    popular: false,
    urgency: 'Noch 3 Plätze diese Woche'
  },
  {
    id:'pv-storage',
    title:'Solar Premium + Speicher',
    desc:'Maximale Unabhängigkeit – produzieren Sie Ihren eigenen Strom',
    kpis:['85% Eigenstromanteil','10 kWh Speicher inklusive','Intelligente Steuerung'],
    price:'ab 15.900 €',
    savings:'1.800 €/Jahr sparen',
    popular: true,
    urgency: 'Am beliebtesten – nur noch 5 verfügbar'
  },
  {
    id:'pv-full',
    title:'Solar Komplett-System',
    desc:'Die Zukunft der Energie: PV + Speicher + Wallbox + Smart Home',
    kpis:['95% Autarkie garantiert','Wallbox für E-Auto','24/7 Monitoring'],
    price:'ab 22.500 €',
    savings:'2.400 €/Jahr sparen',
    popular: false,
    urgency: 'Exklusives Angebot – limitiert'
  }
];

export default function Bundles({ bundles=defaultBundles, onSelect }) {
  React.useEffect(()=> trackVariant('bundle_card_view',{ count: bundles.length }),[bundles.length]);
  return (
    <Section variant="warm" padding="normal" size="wide">
  <Heading as="h2" size="2xl" className="mb-6">Pakete & Systembauweisen</Heading>
        <p className="text-neutral-600 max-w-2xl mb-10 text-sm-token leading-relaxed">Skalierbare Module – von effizientem Einstieg bis maximaler Unabhängigkeit. Alle Pakete enthalten Planung, Installation & Monitoring.</p>

        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((b,i)=> {
            const variant = b.popular ? 'accent' : 'subtle';
            return (
              <Card key={b.id} variant={variant} elevation={b.popular ? 'md' : 'sm'} className="flex flex-col relative">
                {b.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="outline" color="ambient">Empfohlen</Badge></div>}
                <div className="mb-4">
                  <Heading as="h3" size="md" className="mb-2 leading-snug">{b.title}</Heading>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{b.desc}</p>
                  <Metric value={b.savings.split(' ')[0]} label="Ø Einsparung" size="sm" className="mb-2" />
                </div>
                <ul className="mb-6 space-y-2 text-sm text-neutral-600">
                  {b.kpis.map((k,idx)=>(
                    <li key={idx} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-neutral-400 flex-shrink-0" />
                      {k}
                    </li>
                  ))}
                </ul>
                {b.urgency && <div className="mb-4 p-2 bg-neutral-50/70 border border-neutral-150 rounded text-[11px] text-neutral-600 text-center">{b.urgency}</div>}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-150">
                  <div>
                    <div className="text-base font-semibold text-neutral-900">{b.price}</div>
                    <div className="text-xs text-neutral-500">inkl. Installation & MwSt.</div>
                  </div>
                  <Button
                    size="lg"
                    variant="primary"
                    className="px-6 py-3 text-sm font-semibold"
                    onClick={()=>{ trackVariant('bundle_select',{ bundle_id:b.id, position:i }); trackCta('bundles','select',{bundle_id:b.id}); onSelect?.(b); }}
                  >Jetzt anfragen</Button>
                </div>
              </Card>
            );
          })}
        </div>

    <Card variant="accent" elevation="md" className="mt-12 p-8">
          <div className="grid gap-6 md:grid-cols-3 text-sm text-neutral-600">
            {[{icon:'🏆',t:'15+ Jahre Erfahrung',s:'Seit 2009 aktiv'},{icon:'🛡️',t:'25 Jahre Garantie',s:'Leistung & Material'},{icon:'⭐',t:'98% Zufriedenheit',s:'Verifizierte Bewertungen'}].map((f,i)=>(
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl">{f.icon}</span>
                <div><div className="font-medium text-neutral-900">{f.t}</div><div className="text-[11px]">{f.s}</div></div>
              </div>
            ))}
          </div>
        </Card>
  </Section>
  );
}
