import React from 'react';
import getCopy from './copy';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionProcessSteps({ steps = [], copy = {} }) {
  const hl = copy.hl || getCopy('process.hl.steps', 'Ihr Weg zur eigenen Anlage');
  const desc = copy.desc || getCopy('process.txt.desc', 'Strukturierter Ablauf – Klarheit in jeder Phase.');
  const data = steps.length ? steps : [
    { t: getCopy('process.step.1.title','Analyse anfordern'), d: getCopy('process.step.1.desc','Bedarfsdaten erfassen & Potenzial skizzieren') },
    { t: getCopy('process.step.2.title','Technische Prüfung'), d: getCopy('process.step.2.desc','Dach + Lastprofil validieren') },
    { t: getCopy('process.step.3.title','Verbindliches Angebot'), d: getCopy('process.step.3.desc','Festpreis & Szenarien vergleichen') },
    { t: getCopy('process.step.4.title','Installation & Inbetriebnahme'), d: getCopy('process.step.4.desc','Zertifizierte Umsetzung') },
    { t: getCopy('process.step.5.title','Monitoring & Optimierung'), d: getCopy('process.step.5.desc','Performance sichern & verbessern') }
  ];
  return (
    <Section variant="neutral" padding="normal" size="wide">
        <div className="max-w-3xl mb-12">
          <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed measure">{desc}</p>
        </div>
  <ol className="space-y-8 relative">
          {data.map((s,i)=>(
            <li key={i} className="pl-14">
              <div className="absolute left-0 top-0 h-full">
                <div className="flex flex-col items-center">
      <span className="h-10 w-10 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold shadow-sm">{i+1}</span>
                  {i < data.length -1 && <span className="flex-1 w-px bg-neutral-300 mt-1" />}
                </div>
              </div>
              <h3 className="font-semibold text-sm md:text-base tracking-tight mb-1">{s.t}</h3>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
  </Section>
  );
}

export default SectionProcessSteps;