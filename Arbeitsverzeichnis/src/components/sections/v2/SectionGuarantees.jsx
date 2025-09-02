import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

export function SectionGuarantees({ items = [], copy = {} }) {
  const hl = copy.hl || getCopy('guarantee.hl', 'Ihre Sicherheit ist unsere Priorität');
  const desc = copy.desc || getCopy('guarantee.desc', 'Mit 25 Jahren Garantie und voller Kostensicherheit – Ihr Investment ist geschützt.');
  const data = items.length ? items : [
    {
      k: 'price_lock',
      t: getCopy('risk.price.lock','Festpreis-Garantie'),
      d: getCopy('risk.price.desc','Verbindlicher Preis nach technischer Prüfung – keine versteckten Kosten'),
      icon: '💰',
      highlight: '100% Kostensicherheit'
    },
    {
      k: 'performance',
      t: getCopy('risk.performance.guarantee','25 Jahre Leistungsgarantie'),
      d: getCopy('risk.performance.desc','24/7 Monitoring mit automatischer Optimierung bei Abweichungen'),
      icon: '📊',
      highlight: '98% Verfügbarkeit'
    },
    {
      k: 'service',
      t: getCopy('risk.service.sla','Premium-Service < 24h'),
      d: getCopy('risk.service.desc','Schnelle Reaktion bei Störungen – Ihr Komfort hat Priorität'),
      icon: '🚀',
      highlight: '4h durchschnittlich'
    },
    {
      k: 'handover',
      t: getCopy('risk.handover.protocol','Professionelle Abnahme'),
      d: getCopy('risk.handover.desc','Umfassende Dokumentation und TÜV-Abnahme inklusive'),
      icon: '✅',
      highlight: 'Vollständige Dokumentation'
    }
  ];

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm-token leading-relaxed">{desc}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {data.map(g => (
            <Card key={g.k} variant="subtle" elevation="sm" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{g.icon}</div>
                <div className="flex-1">
                  <Heading as="h3" size="sm" className="mb-2 leading-snug">{g.t}</Heading>
                  <p className="text-gray-600 text-sm-token leading-relaxed mb-3">{g.d}</p>
                  <Badge variant="soft" color="emerald" size="xs">{g.highlight}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Risk Reversal Statement */}
        <div className="mt-12 text-center">
          <Card variant="accent" elevation="md" className="inline-block p-6">
            <div className="text-lg font-semibold text-gray-900 mb-2">💪 Vollständige Risiko-Umkehr</div>
            <p className="text-sm text-gray-600">
              Sollten wir unsere Garantien nicht einhalten, übernehmen wir alle Kosten.<br />
              <strong className="text-gray-900">Ihre Zufriedenheit ist garantiert – oder Sie zahlen nichts.</strong>
            </p>
          </Card>
        </div>
  </Section>
  );
}

export default SectionGuarantees;
