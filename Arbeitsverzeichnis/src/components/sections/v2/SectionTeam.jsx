import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionTeam({ members = [], copy = {} }) {
  const hl = copy.hl || getCopy('team.hl', 'Team & Fachkompetenz');
  const desc = copy.desc || getCopy('team.desc', 'Interdisziplinär – Planung, Elektrotechnik, Dachmontage, Monitoring.');
  const data = members.length ? members : [
    { n: 'Ing. K. Wagner', r: getCopy('team.role.engineering','Leitung Engineering'), img: '', bio: getCopy('team.bio.engineering','20+ Jahre PV Systemdesign & Netzanschluss') },
    { n: 'M. Schulz', r: getCopy('team.role.install','Lead Montage'), img: '', bio: getCopy('team.bio.install','DGUV zertifiziert, standardisierte Qualitäts-Checklisten') },
    { n: 'L. Peters', r: getCopy('team.role.service','Service & Monitoring'), img: '', bio: getCopy('team.bio.service','Proaktive Performance-Analyse & SLA Koordination') },
    { n: 'S. Richter', r: getCopy('team.role.advisor','Beratung'), img: '', bio: getCopy('team.bio.advisor','Transparente Wirtschaftlichkeits-Begleitung') }
  ];
  return (
    <Section variant="neutral" padding="normal" size="wide">
        <div className="max-w-3xl mb-10">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 leading-relaxed text-sm-token">{desc}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((m,i)=>(
            <Card key={i} variant="subtle" elevation="sm" className="p-5 flex flex-col">
              <div className="h-20 w-20 rounded-full bg-neutral-200 mb-4" aria-hidden />
              <Heading as="h3" size="sm" className="font-medium text-sm text-gray-900">{m.n}</Heading>
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{m.r}</div>
              <p className="text-xs text-gray-600 leading-relaxed flex-1">{m.bio}</p>
            </Card>
          ))}
        </div>
    </Section>
  );
}

export default SectionTeam;
