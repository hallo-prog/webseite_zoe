import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionTechArchitecture({ copy = {} }) {
  const hl = copy.hl || getCopy('tech.arch.hl', 'Architektur die skaliert');
  const sub = copy.sub || getCopy('tech.arch.sub', 'Modulare PV + Speicher + Steuerung als orchestriertes Energiesystem.');
  const pillars = copy.pillars || [
    { k: 'modules', t: getCopy('tech.arch.modules.t', 'Premium Module'), d: getCopy('tech.arch.modules.d', 'Bifaziale Glas-Glas Module mit erhöhter Lebensdauer & Ertrag.') },
    { k: 'inverter', t: getCopy('tech.arch.inverter.t', 'Hybrid Wechselrichter'), d: getCopy('tech.arch.inverter.d', 'Effiziente Steuerung & Notstromfähigkeit.') },
    { k: 'storage', t: getCopy('tech.arch.storage.t', 'LiFePO4 Speicher'), d: getCopy('tech.arch.storage.d', 'Sichere Kapazität mit >6000 Ladezyklen.') },
    { k: 'monitoring', t: getCopy('tech.arch.monitoring.t', 'Monitoring & Alerts'), d: getCopy('tech.arch.monitoring.d', 'Transparente Performance & präventive Wartung.') }
  ];
  return (
    <Section variant="plain" padding="normal" size="wide">
  <Heading as="h2" size="2xl" className="mb-5">{hl}</Heading>
        <p className="text-gray-600 max-w-3xl mb-10 leading-relaxed text-sm-token">{sub}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(p => (
            <Card key={p.k} variant="subtle" elevation="sm" className="p-5">
              <Heading as="h3" size="sm" className="mb-2">{p.t}</Heading>
              <p className="text-sm text-gray-600 leading-relaxed">{p.d}</p>
            </Card>
          ))}
        </div>
    </Section>
  );
}

export default SectionTechArchitecture;
