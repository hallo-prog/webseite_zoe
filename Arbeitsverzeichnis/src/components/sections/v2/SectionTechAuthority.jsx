import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { Section } from '@/components/ui/section';

export function SectionTechAuthority({ copy = {}, items = [] }) {
  const hl = copy.hl || getCopy('tech.auth.hl', 'Warum unsere Technologie vertrauenswürdig ist');
  const sub = copy.sub || getCopy('tech.auth.sub', 'Mit 15 Jahren Erfahrung und unabhängigen Zertifizierungen – Ihre Sicherheit hat höchste Priorität.');
  const list = items.length ? items : [
    {
      k: 'tuv',
      t: getCopy('tech.auth.tuv.t', 'TÜV / VDE zertifiziert'),
      d: getCopy('tech.auth.tuv.d', 'Alle Komponenten nach strengsten europäischen Normen geprüft – maximale Sicherheit für Ihr Zuhause'),
      icon: '🛡️',
      stat: '100%',
      statLabel: 'Zertifizierte Qualität'
    },
    {
      k: 'guarantee',
      t: getCopy('tech.auth.guarantee.t', '25 Jahre Leistungsgarantie'),
      d: getCopy('tech.auth.guarantee.d', 'Branchenführende Garantie auf Leistung und Produkt – Ihr Investment ist langfristig geschützt'),
      icon: '📋',
      stat: '25+',
      statLabel: 'Jahre Garantie'
    },
    {
      k: 'monitoring',
      t: getCopy('tech.auth.monitoring.t', '24/7 Live-Monitoring'),
      d: getCopy('tech.auth.monitoring.d', 'Proaktive Überwachung mit Echtzeit-Alerts – Sie haben jederzeit die volle Kontrolle'),
      icon: '📊',
      stat: '99.9%',
      statLabel: 'Systemverfügbarkeit'
    },
  ];

  return (
    <Section variant="warm" padding="normal" contain={false}>
      <div className="pro-container">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm-token leading-relaxed">{sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {list.map(i => (
            <Card key={i.k} variant="subtle" elevation="sm" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{i.icon}</div>
                <div className="flex-1">
                  <Heading as="h3" size="sm" className="mb-2 leading-snug">{i.t}</Heading>
                  <p className="text-gray-600 text-sm-token leading-relaxed mb-4">{i.d}</p>
                  <Metric value={i.stat} label={i.statLabel} size="sm" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center">
          <Card variant="accent" elevation="md" className="inline-block p-6">
            <div className="text-lg font-semibold text-gray-900 mb-2">🔬 Wissenschaftlich fundiert & praxisbewährt</div>
            <p className="text-sm text-gray-600">
              Unsere Technologie basiert auf jahrelanger Forschung und wird kontinuierlich
              von unabhängigen Instituten validiert.<br />
              <strong className="text-gray-900">98% unserer Anlagen übertreffen die Leistungsprognose.</strong>
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export default SectionTechAuthority;
