import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import getCopy from './copy';
import { Section } from '@/components/ui/section';

export function SectionSavingsCalculatorTeaser({ copy = {}, onStart }) {
  const hl = copy.hl || getCopy('calc.hl.invite', 'Wie viel können Sie sparen?');
  const sub = copy.sub || getCopy('calc.txt.sub', 'Kurzer Verbrauchs-Check liefert eine erste Potenzialindikation.');
  const cta = copy.cta || getCopy('calc.cta.start', 'Sparpotenzial prüfen');
  const bullets = copy.bullets || [
    getCopy('calc.bullet.time', '<2 Minuten'),
    getCopy('calc.bullet.no_commit', 'Ohne Verpflichtung'),
    getCopy('calc.bullet.instant', 'Ergebnis sofort')
  ];
  return (
    <Section variant="plain" padding="normal" size="wide">
      <div className="grid gap-14 md:grid-cols-2 items-start">
        <div>
          <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm-token md:text-base measure">{sub}</p>
          <ul className="mb-8 flex flex-wrap gap-3 text-[11px] md:text-xs text-neutral-600">
            {bullets.map((b,i)=>(<li key={i} className="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200">{b}</li>))}
          </ul>
          <Button onClick={onStart} variant="primary" size="lg" className="min-w-[220px]">{cta}</Button>
        </div>
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 elev-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-4">{getCopy('calc.form.placeholder_title', 'Schnelle Eingabe (Demo)')}</div>
          <form onSubmit={e=>e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-[11px] font-medium mb-1 uppercase tracking-wide">{getCopy('form.label.zip','Postleitzahl')}</label>
              <input className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm" placeholder={getCopy('form.placeholder.zip','z.B. 12345')} />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1 uppercase tracking-wide">{getCopy('form.label.consumption','Jahresstromverbrauch')}</label>
              <input className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm" placeholder={getCopy('form.placeholder.consumption','z.B. 4500')} />
            </div>
            <Button variant="outline" size="md" type="submit" className="w-full text-sm">{getCopy('calc.cta.inline','Kurzen Check durchführen')}</Button>
          </form>
        </div>
      </div>
    </Section>
  );
}

export default SectionSavingsCalculatorTeaser;