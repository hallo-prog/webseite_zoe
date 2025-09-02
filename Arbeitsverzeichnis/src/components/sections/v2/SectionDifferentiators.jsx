import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { Section } from '@/components/ui/section';

export function SectionDifferentiators({ usps = [], copy = {} }) {
  const hl = copy.hl || getCopy('usp.hl', 'Warum 2.847 Kunden sich für ZOE entschieden haben');
  const items = usps.length ? usps : [
    {
      k: 'engineering',
      t: getCopy('usp.engineering.hl', 'Premium-Engineering seit 2008'),
      d: getCopy('usp.engineering.one', 'Tier-1 Komponenten mit 25 Jahren Garantie – Ihr Dach als Kapitalanlage'),
      icon: '⚡',
      stat: '99.2%',
      statLabel: 'Leistung nach 10 Jahren'
    },
    {
      k: 'process',
      t: getCopy('usp.process.hl', 'Von Analyse zu Strom in 21 Tagen'),
      d: getCopy('usp.process.one', 'Festpreis-Vertrag ohne versteckte Kosten – Termingarantie inklusive'),
      icon: '🚀',
      stat: '96%',
      statLabel: 'Pünktliche Fertigstellung'
    },
    {
      k: 'trust',
      t: getCopy('usp.trust.hl', 'Transparente Garantie & Monitoring'),
      d: getCopy('usp.trust.one', '24/7 Leistungsüberwachung mit Echtzeit-Reports – Ihre Sicherheit hat Priorität'),
      icon: '🛡️',
      stat: '4.9/5',
      statLabel: 'Kundenbewertungen'
    },
    {
      k: 'intelligence',
      t: getCopy('usp.intelligence.hl', 'Intelligente Optimierung'),
      d: getCopy('usp.intelligence.one', 'KI-gestützte Anpassung an Wetter & Verbrauch – Maximale Rendite garantiert'),
      icon: '🧠',
      stat: '+23%',
      statLabel: 'Mehr Ertrag durch Optimierung'
    }
  ];

  return (
  <Section variant="warm" padding="normal" className="bg-white border-t border-neutral-200/60" contain={false}>
      <div className="pro-container">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4 text-balance">{hl}</Heading>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
            Nicht nur Technik – sondern das komplette Paket für Ihre finanzielle Freiheit.
            <strong> Mit messbaren Ergebnissen und jahrelanger Erfahrung.</strong>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map(u => (
            <Card key={u.k} variant="subtle" elevation="sm" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{u.icon}</div>
                <div className="flex-1">
                  <Heading as="h3" size="sm" className="mb-2 leading-snug">{u.t}</Heading>
                  <p className="text-gray-600 text-sm-token leading-relaxed mb-4">{u.d}</p>
                  <Metric value={u.stat} label={u.statLabel} size="sm" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center">
          <Card variant="accent" elevation="md" className="inline-block p-4">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Warum Kunden uns wählen:</strong> "Die Kombination aus Qualität,
              Geschwindigkeit und Sicherheit gibt es nirgendwo anders." – Michael K., Berlin
            </p>
          </Card>
        </div>
      </div>
  </Section>
  );
}

export default SectionDifferentiators;