import React from 'react';
import { Section } from '@/components/ui/section';
import { trackVariant } from '@/utils/tracking';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

const defaultSteps = [
  {
    id:1,
    title:'Kostenlose Analyse',
    desc:'Verbrauchsanalyse & Dach-Check in 24h',
    time:'1 Tag',
    icon:'🔍',
    benefit:'100% kostenlos & unverbindlich'
  },
  {
    id:2,
    title:'Festpreis-Angebot',
    desc:'Transparentes Angebot mit 25 Jahre Garantie',
    time:'2–3 Tage',
    icon:'📋',
    benefit:'Keine versteckten Kosten'
  },
  {
    id:3,
    title:'Professionelle Installation',
    desc:'Termingarantie & TÜV-zertifizierte Monteure',
    time:'1–2 Wochen',
    icon:'⚡',
    benefit:'96% pünktliche Fertigstellung'
  },
  {
    id:4,
    title:'Sofort einsatzbereit',
    desc:'Netzanmeldung & App-Setup inklusive',
    time:'Sofort',
    icon:'🚀',
    benefit:'Strom sparen ab Tag 1'
  },
  {
    id:5,
    title:'Lebenslanger Support',
    desc:'24/7 Monitoring & jährliche Wartung',
    time:'25+ Jahre',
    icon:'🛡️',
    benefit:'Maximale Sicherheit & Performance'
  }
];

export default function ProcessJourney({ steps=defaultSteps }) {
  React.useEffect(()=> steps.forEach((s,idx)=> setTimeout(()=>trackVariant('journey_step_view',{ step:s.id, total:steps.length }), 50*idx)),[steps]);
  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Ihr Weg zur finanziellen Freiheit</Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
            Von der ersten Analyse bis zur lebenslangen Betreuung – wir begleiten Sie durch jeden Schritt.
            <strong> Mit 98% Kundenzufriedenheit und 25 Jahren Garantie.</strong>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((s,i)=> (
            <Card key={s.id} variant="subtle" elevation="sm" className="relative overflow-hidden text-center p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-[11px] font-semibold tracking-wide text-neutral-500 mb-2 uppercase">{s.time}</div>
              <Heading as="h3" size="sm" className="mb-2 leading-snug">{s.title}</Heading>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">{s.desc}</p>
              <div className="text-[11px] font-medium text-neutral-600 bg-neutral-50 px-2 py-1 rounded border border-neutral-150 inline-block">
                {s.benefit}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-200 transform -translate-y-1/2"></div>
              )}
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 text-center">
          {[{icon:'⏰',t:'Schnelle Umsetzung',d:'Analyse bis Installation in 2–3 Wochen'},{icon:'🛡️',t:'Volle Sicherheit',d:'Festpreis + Garantie'},{icon:'📞',t:'Persönlicher Support',d:'Direkter Ansprechpartner'}].map((b,i)=>(
            <Card key={i} variant="accent" elevation="sm" className="p-5">
              <div className="text-xl mb-2">{b.icon}</div>
              <Heading as="h3" size="sm" className="mb-1">{b.t}</Heading>
              <div className="text-sm text-neutral-600">{b.d}</div>
            </Card>
          ))}
        </div>
  </Section>
  );
}
