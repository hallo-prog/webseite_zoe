import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

export function SectionTechComponentsGrid({ components = [], copy = {} }) {
  const hl = copy.hl || getCopy('tech.comp.hl', 'Premium-Komponenten für maximale Leistung');
  const sub = copy.sub || getCopy('tech.comp.sub', 'Jede Komponente wurde sorgfältig für höchste Effizienz, Sicherheit und Langlebigkeit ausgewählt.');
  const list = components.length ? components : [
    {
      k: 'module',
      t: getCopy('tech.comp.module.t', 'Hochleistungs-Module'),
      d: getCopy('tech.comp.module.d', 'Premium Glas-Glas Module mit 23% Wirkungsgrad – Optimale Energieausbeute bei jedem Wetter'),
      icon: '☀️',
      benefit: '23% Wirkungsgrad'
    },
    {
      k: 'inverter',
      t: getCopy('tech.comp.inverter.t', 'Intelligente Wechselrichter'),
      d: getCopy('tech.comp.inverter.d', 'Hybridfähige Technologie mit Smart Monitoring – Maximale Effizienz und Zukunftssicherheit'),
      icon: '⚡',
      benefit: '98% Effizienz'
    },
    {
      k: 'storage',
      t: getCopy('tech.comp.storage.t', 'Langzeit-Speicher'),
      d: getCopy('tech.comp.storage.d', 'LiFePO4 Batterien mit 10.000+ Zyklen – Ihre Energie sicher gespeichert für die Nacht'),
      icon: '🔋',
      benefit: '10.000+ Zyklen'
    },
    {
      k: 'mount',
      t: getCopy('tech.comp.mount.t', 'Stabile Montagesysteme'),
      d: getCopy('tech.comp.mount.d', 'Statisch geprüfte, korrosionsbeständige Systeme – Sicher für 25+ Jahre'),
      icon: '🏗️',
      benefit: 'Windlast 200 km/h'
    },
    {
      k: 'cabling',
      t: getCopy('tech.comp.cabling.t', 'Professionelle Verkabelung'),
      d: getCopy('tech.comp.cabling.d', 'Verlustarme, brandschutzkonforme Kabel – Optimale Leistung und Sicherheit'),
      icon: '🔌',
      benefit: '< 1% Verlust'
    },
    {
      k: 'monitor',
      t: getCopy('tech.comp.monitor.t', '24/7 Monitoring'),
      d: getCopy('tech.comp.monitor.d', 'Live-Ertragsdaten mit mobiler App – Volle Transparenz und Kontrolle'),
      icon: '📱',
      benefit: 'Echtzeit-Überwachung'
    }
  ];

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm-token leading-relaxed">{sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map(c => (
            <Card key={c.k} variant="subtle" elevation="sm" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{c.icon}</div>
                <div className="flex-1">
                  <Heading as="h3" size="sm" className="mb-2 leading-snug">{c.t}</Heading>
                  <p className="text-gray-600 text-sm-token leading-relaxed mb-3">{c.d}</p>
                  <Badge variant="outline" size="xs">{c.benefit}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Technology Promise */}
        <div className="mt-12 text-center">
          <Card variant="accent" elevation="md" className="inline-block p-6">
            <div className="text-lg font-semibold text-gray-900 mb-2">🚀 Zukunftssichere Technologie</div>
            <p className="text-sm text-gray-600">
              Alle Komponenten sind aufeinander abgestimmt und werden kontinuierlich
              durch Firmware-Updates optimiert.<br />
              <strong className="text-gray-900">Ihre Anlage wird mit der Zeit sogar noch besser.</strong>
            </p>
          </Card>
        </div>
  </Section>
  );
}

export default SectionTechComponentsGrid;
