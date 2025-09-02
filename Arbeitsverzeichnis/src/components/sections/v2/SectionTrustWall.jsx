import React from 'react';
import getCopy from './copy';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

export function SectionTrustWall({ kpis = [], certs = [], testimonials = [], copy = {} }) {
  const hl = copy.hl || getCopy('trust.hl', 'Warum 2.847 Kunden uns vertrauen');
  const kpiData = kpis.length ? kpis : [
    {
      label: getCopy('stat.trust.installs', 'Installierte Anlagen'),
      value: getCopy('stat.trust.installs.value', '2.847+'),
      icon: '🏠',
      trend: '+15% dieses Jahr'
    },
    {
      label: getCopy('stat.trust.avg_payback', 'Amortisation'),
      value: getCopy('stat.trust.avg_payback.value', '8,2 Jahre'),
      icon: '📈',
      trend: 'Durchschnittlich'
    },
    {
      label: getCopy('stat.trust.on_time_rate', 'Termintreue'),
      value: getCopy('stat.trust.on_time_rate.value', '96%'),
      icon: '⏰',
      trend: 'Pünktliche Fertigstellung'
    }
  ];

  const testimonialData = testimonials.length ? testimonials : [
    {
      text: getCopy('proof.testimonial.alpha.short', 'Von der Beratung bis zur Fertigstellung – alles lief reibungslos. Die Erträge übertreffen sogar die Prognose!'),
      author: 'Michael K., Berlin',
      rating: 5
    },
    {
      text: getCopy('proof.testimonial.beta.short', 'Das Dashboard zeigt mir genau, wann sich der Speicher lohnt. Super transparente Beratung!'),
      author: 'Anna S., Potsdam',
      rating: 5
    },
    {
      text: getCopy('proof.testimonial.gamma.short', 'Installation war sauber und termingerecht. Die Kommunikation war jederzeit transparent.'),
      author: 'Thomas M., Brandenburg',
      rating: 5
    }
  ];

  return (
    <Section variant="neutral" padding="normal" size="wide" className="border-y border-neutral-200/70">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4 text-balance">{hl}</Heading>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
            Messbare Ergebnisse, zufriedene Kunden und unabhängige Zertifizierungen.
            <strong> Ihr Vertrauen ist unser größtes Kapital.</strong>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* KPIs */}
          <div className="space-y-4">
            {kpiData.map((k,i)=>(
              <Card key={i} variant="subtle" elevation="sm" className="p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{k.icon}</div>
                  <div className="flex-1 space-y-1">
                    <Metric value={k.value} label={k.label} size="md" />
                    <div className="text-xs text-gray-500">{k.trend}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            {testimonialData.map((t,i)=>(
              <Card key={i} variant="glass" elevation="sm" className="p-6 bg-white">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⭐</div>
                  <div className="flex-1">
                    <blockquote className="text-sm text-gray-600 leading-relaxed mb-3">"{t.text}"</blockquote>
                    <div className="text-xs font-semibold text-gray-500">– {t.author}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <Card variant="subtle" elevation="sm" className="p-6 bg-white">
              <Heading as="h3" size="sm" className="mb-4">Unabhängige Zertifizierungen</Heading>
              <div className="flex flex-wrap gap-4">
                {(certs.length ? certs : [
                  { alt: 'VDE geprüft', src: '/public/auszeichnungen/-vde.png' },
                  { alt: 'Stromnetz Berlin', src: '/public/auszeichnungen/-stromnetz_berlin.png' },
                  { alt: 'HWK', src: '/public/auszeichnungen/-hwk.png' }
                ]).map((c,i)=>(
                  <div key={i} className="flex items-center justify-center p-2 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors">
                    <img src={c.src} alt={c.alt} className="h-8 object-contain" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Trust Badge */}
            <div className="text-center">
              <Badge variant="emerald" size="xs" className="inline-flex px-4 py-2">🏆 TÜV-zertifizierter Betrieb seit 2008</Badge>
            </div>
          </div>
        </div>
  </Section>
  );
}

export default SectionTrustWall;