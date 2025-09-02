import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Metric } from '@/components/ui/metric';
import { trackVariant } from '@/utils/tracking';
import { Shield, Award, Users, CheckCircle, Star } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function TrustAuthoritySection() {
  React.useEffect(() => trackVariant('trust_authority_view', { section: 'homepage' }), []);

  const certifications = [
    { src: '/auszeichnungen/-vde.png', alt: 'VDE zertifiziert', title: 'VDE Geprüft' },
    { src: '/auszeichnungen/-hwk.png', alt: 'HWK zertifiziert', title: 'HWK Zertifiziert' },
    { src: '/auszeichnungen/-edis.png', alt: 'EDIS zertifiziert', title: 'EDIS Zertifiziert' },
    { src: '/auszeichnungen/-stromnetz_berlin.png', alt: 'Stromnetz Berlin', title: 'Stromnetz Berlin' }
  ];

  const partners = [
    { src: '/partners/partner-1.svg', alt: 'Partner 1' },
    { src: '/partners/partner-2.svg', alt: 'Partner 2' },
    { src: '/partners/partner-3.svg', alt: 'Partner 3' },
    { src: '/partners/partner-4.svg', alt: 'Partner 4' },
    { src: '/partners/partner-5.svg', alt: 'Partner 5' }
  ];

  const stats = [
    { value: '2.847+', label: 'zufriedene Kunden', icon: Users },
    { value: '15+', label: 'Jahre Erfahrung', icon: Award },
    { value: '4.9/5', label: 'Kundenbewertung', icon: Star },
    { value: '100%', label: 'TÜV-zertifiziert', icon: Shield }
  ];

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading level={2} variant="h2" className="mb-4">Vertrauen & Nachweisbarkeit</Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
            Langjährige Erfahrung, verifizierte Qualität und unabhängige Prüfung – die Basis für belastbares Vertrauen.
          </p>
        </div>

        {/* Kennzahlen */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((s,i)=> {
            const Icon = s.icon;
            return (
              <Card key={i} variant="outline" elevation="sm" className="p-5 text-center">
                <Icon className="w-7 h-7 mx-auto mb-3 text-neutral-500" />
                <Metric value={s.value} label={s.label} size="md" />
              </Card>
            );
          })}
        </div>

        {/* Zertifizierungen */}
    <Card variant="outline" elevation="md" className="p-8 mb-10">
          <div className="text-center mb-6">
      <Heading level={3} variant="h3" className="mb-2 text-neutral-900">Unabhängige Zertifizierungen</Heading>
            <p className="text-neutral-600 text-sm">Höchste Standards – regelmäßig auditiert</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c,i)=> (
              <div key={i} className="flex flex-col items-center p-4 rounded-lg border border-neutral-150 bg-neutral-50">
                <img src={c.src} alt={c.alt} className="h-12 w-auto object-contain mb-3 opacity-80" />
                <span className="text-[11px] font-medium text-neutral-600 tracking-wide uppercase">{c.title}</span>
              </div>
            ))}
          </div>
    </Card>

        {/* Partner */}
    <Card variant="accent" elevation="sm" className="p-8">
          <div className="text-center mb-6">
      <Heading level={3} variant="h3" className="mb-2 text-neutral-900">Technologie- & Systempartner</Heading>
            <p className="text-neutral-600 text-sm">Ausgewählte Hersteller für maximale Performance & Lebensdauer</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((p,i)=> (
              <div key={i} className="flex items-center justify-center p-3 border border-neutral-150 rounded-md bg-white">
                <img src={p.src} alt={p.alt} className="h-8 w-auto object-contain opacity-70" />
              </div>
            ))}
          </div>
    </Card>

        {/* Statement */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col md:flex-row md:items-center gap-4 px-6 py-4 rounded-xl border border-neutral-200 bg-white">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto md:mx-0" />
            <p className="text-sm text-neutral-600 md:text-left max-w-2xl">
              <strong className="text-neutral-800">Sicherheit:</strong> Festpreis-Vertrag • 25 Jahre Leistungsgarantie • Transparentes Monitoring.
            </p>
          </div>
        </div>

        {/* CTA */}
    <div className="mt-16 text-center">
          <Card variant="outline" elevation="lg" className="p-10 max-w-2xl mx-auto">
            <Heading level={3} variant="h3" className="mb-4 text-neutral-900">Expertise nutzen</Heading>
            <p className="text-neutral-600 text-sm-token leading-relaxed mb-6">Geprüfte Qualität für Ihr Projekt – erhalten Sie eine fundierte Erstbewertung Ihrer Rahmenbedingungen.</p>
            <Button variant="primary" size="lg" className="px-8">Kostenlose Erstberatung</Button>
          </Card>
        </div>
  </Section>
  );
}
