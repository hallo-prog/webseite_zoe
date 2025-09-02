import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { trackVariant } from '@/utils/tracking';
import { AlertTriangle, TrendingUp, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function ProblemSolutionSection() {
  React.useEffect(() => trackVariant('problem_solution_view', { section: 'homepage' }), []);

  const problems = [
    {
      icon: TrendingUp,
      title: 'Steigende Stromkosten',
      description: 'Strompreise sind seit 2021 um 40% gestiegen. Ohne Solar zahlen Sie jährlich tausende Euro mehr.',
      impact: '€2.400/Jahr Mehrkosten'
    },
    {
      icon: AlertTriangle,
      title: 'Unsichere Planung',
      description: 'Viele Anbieter versprechen viel, aber liefern wenig. Undurchsichtige Preise und lange Wartezeiten.',
      impact: '96% der Projekte verzögern sich'
    },
    {
      icon: Shield,
      title: 'Risiko bei der Qualität',
      description: 'Billige Komponenten bedeuten geringere Leistung und kürzere Lebensdauer. Hohe Nachrüstkosten.',
      impact: '30% Leistungsverlust nach 5 Jahren'
    },
    {
      icon: Clock,
      title: 'Zeitaufwändige Prozesse',
      description: 'Monatelange Wartezeiten, unzählige Absprachen und unzuverlässige Handwerker.',
      impact: '8-12 Monate durchschnittlich'
    }
  ];

  const solutions = [
    {
      icon: CheckCircle,
      title: 'Festpreis & 25 Jahre Garantie',
      description: 'Transparente Kalkulation ohne versteckte Kosten. Volle Sicherheit für Ihre Investition.',
      benefit: '0% Risiko für Sie'
    },
    {
      icon: Clock,
      title: 'Von Analyse zu Strom in 21 Tagen',
      description: 'Schneller Prozess mit festen Terminen. Keine Wartezeiten, keine Verzögerungen.',
      benefit: '4x schneller als der Markt'
    },
    {
      icon: Shield,
      title: 'Premium-Komponenten & TÜV-zertifiziert',
      description: 'Nur Tier-1 Hersteller mit höchsten Qualitätsstandards. Maximale Leistung garantiert.',
      benefit: '99.2% Leistung nach 10 Jahren'
    },
    {
      icon: TrendingUp,
      title: 'Intelligente Optimierung',
      description: 'KI-gestützte Anpassung an Wetter & Verbrauch. Mehr Ertrag durch smarte Steuerung.',
      benefit: '+23% mehr Ertrag'
    }
  ];

  return (
    <Section variant="default" padding="normal" size="wide">
        {/* Problemübersicht */}
        <div className="mb-14">
          <div className="text-center mb-10">
            <Heading level={2} variant="h2" className="mb-4">Herausforderungen im Markt</Heading>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
              Die typischen Stolpersteine bei Solarprojekten – klar benannt.
              <strong> Transparenz statt Alarmismus.</strong>
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {problems.map((p,i)=> (
              <Card key={i} variant="outline" elevation="sm" className="p-5 flex gap-4 border-l-2 border-neutral-200">
                <div className="pt-0.5"><p.icon className="w-6 h-6 text-neutral-500" /></div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-neutral-800 leading-snug">{p.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{p.description}</p>
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-600">{p.impact}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Übergang */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-medium tracking-wide text-neutral-600">
            <ArrowRight className="w-4 h-4" /> Unser Ansatz
          </div>
        </div>

        {/* Lösungen */}
        <div>
          <div className="text-center mb-10">
            <Heading level={2} variant="h2" className="mb-4">Die ZOE Lösung</Heading>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
              Systematisch adressiert – Qualität, Geschwindigkeit, Sicherheit & Performance.
              <strong> Messbar und abgesichert.</strong>
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {solutions.map((s,i)=> (
              <Card key={i} variant="accent" elevation="sm" className="p-5 flex gap-4 border-l-2 border-emerald-400/30">
                <div className="pt-0.5"><s.icon className="w-6 h-6 text-emerald-600" /></div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-neutral-800 leading-snug">{s.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{s.description}</p>
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">{s.benefit}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
    <div className="mt-16 text-center">
          <Card variant="outline" elevation="md" className="p-10">
            <Heading level={3} variant="h3" className="mb-4">Nächster Schritt</Heading>
            <p className="text-neutral-600 mb-6 text-sm-token leading-relaxed max-w-2xl mx-auto">
              Erhalten Sie eine fundierte Einschätzung zu Potenzial, Wirtschaftlichkeit und Umsetzungspfad Ihrer Anlage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="px-7">Kostenlose Analyse</Button>
              <Button variant="outline" size="lg" className="px-7">Mehr erfahren</Button>
            </div>
          </Card>
        </div>
  </Section>
  );
}
