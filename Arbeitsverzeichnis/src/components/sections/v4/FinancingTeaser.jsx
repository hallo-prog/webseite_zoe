import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { trackVariant } from '@/utils/tracking';
import { Section } from '@/components/ui/section';

export default function FinancingTeaser({ options=[] }) {
  const list = options.length ? options : [
    { id:'kfw', title:'KfW Programm', desc:'Förderkredit für zinsgünstige Finanzierung', apr:'ab 3,2% eff.' },
    { id:'leasing', title:'Leasing Modell', desc:'Planbare monatliche Rate statt Kapitalbindung', apr:'ab 0 € Anzahlung' },
    { id:'bank', title:'Bank Partner', desc:'Regionale Banken – schnelle Entscheidung', apr:'flexibel' }
  ];
  React.useEffect(()=> trackVariant('financing_teaser_view',{ count:list.length }),[list.length]);
  return (
    <Section variant="default" padding="normal" size="wide">
  <Heading as="h2" size="2xl" className="mb-6">Finanzierung & Förderung einfach gemacht</Heading>
        <p className="text-neutral-600 max-w-2xl mb-8 text-sm-token leading-relaxed">Wir bündeln Förderprogramme, günstige Konditionen und flexible Modelle. So bleibt Ihre Liquidität erhalten – und die Anlage arbeitet trotzdem für Sie.</p>
        <div className="grid gap-5 md:grid-cols-3">
          {list.map((o,i)=> (
            <Card key={o.id} variant="subtle" elevation="sm" className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Heading as="h3" size="sm" className="leading-snug">{o.title}</Heading>
                <span className="inline-block rounded-full bg-neutral-900 text-white text-[11px] font-medium px-2 py-1">{o.apr}</span>
              </div>
              <p className="text-sm-token text-neutral-600 leading-relaxed flex-1">{o.desc}</p>
              <Button variant="outline" size="sm" className="mt-auto self-start text-sm">Details</Button>
            </Card>
          ))}
        </div>
    </Section>
  );
}
