import React, { useState } from 'react';
import getCopy from './copy';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

export function SectionObjectionsFAQ({ items = [], copy = {} }) {
  const hl = copy.hl || getCopy('obj.hl', 'Häufige Fragen & Einwände');
  const data = items.length ? items : [
    { slug: 'kosten', hl: getCopy('hl.obj.kosten','Investition steuert Kosten'), body: getCopy('txt.obj.kosten.fact','Eigenverbrauch ersetzt teureren Netzbezug.'), proof: getCopy('proof.obj.kosten','Stromrechnung 41% niedriger.') },
    { slug: 'amortisation', hl: getCopy('hl.obj.amortisation','Payback ist planbar'), body: getCopy('txt.obj.amortisation.fact','Szenario-Modell zeigt konservativ vs. optimiert.'), proof: getCopy('proof.obj.amortisation','Ø Amortisation 9–11 Jahre.') },
    { slug: 'wartung', hl: getCopy('hl.obj.wartung','Proaktives Monitoring'), body: getCopy('txt.obj.wartung.fact','Alerts bei Abweichungen >5%'), proof: getCopy('proof.obj.wartung','0 ungeklärte Garantieansprüche.') }
  ];
  const [open, setOpen] = useState(null);
  const toggle = slug => setOpen(o => o === slug ? null : slug);
  return (
    <Section variant="neutral" padding="normal" size="narrow">
  <Heading as="h2" size="2xl" className="mb-8 text-balance">{hl}</Heading>
        <div className="space-y-3">
          {data.map(item => {
            const isOpen = open === item.slug;
            return (
              <div key={item.slug} className="border border-neutral-200 rounded-lg bg-white transition-colors">
                <Button variant="plain" onClick={()=>toggle(item.slug)} className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
                  <span className="font-medium text-sm-token leading-snug">{item.hl}</span>
                  <span className="text-neutral-500 text-xs" aria-hidden>{isOpen ? '−' : '+'}</span>
                </Button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm-token text-neutral-600 leading-relaxed">
                    <p className="mb-3">{item.body}</p>
                    {item.proof && <p className="text-2xs text-neutral-500">{item.proof}</p>}
                  </div>
                )}
              </div>
            );
          })}
    </div>
  </Section>
  );
}

export default SectionObjectionsFAQ;