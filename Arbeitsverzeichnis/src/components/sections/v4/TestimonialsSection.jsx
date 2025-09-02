import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { trackVariant } from '@/utils/tracking';
import { Star, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { Section } from '@/components/ui/section';

export default function TestimonialsSection() {
  React.useEffect(() => trackVariant('testimonials_view', { section: 'homepage' }), []);

  const testimonials = [
    {
      name: 'Familie Bauer',
      location: 'München',
      rating: 5,
      text: 'Die Anlage übertrifft alle Erwartungen. Wir sind seit 8 Monaten komplett autark und sparen €2.400 im Jahr! Die Beratung war absolut professionell.',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      verified: true,
      savings: '€2.400/Jahr',
      installationDate: 'März 2024'
    },
    {
      name: 'Herr Schmidt',
      location: 'Berlin',
      rating: 5,
      text: 'Von der ersten Beratung bis zur Fertigstellung – alles lief reibungslos. Keine versteckten Kosten, keine Verzögerungen. Sehr empfehlenswert!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      verified: true,
      savings: '€1.800/Jahr',
      installationDate: 'Mai 2024'
    },
    {
      name: 'Frau Weber',
      location: 'Hamburg',
      rating: 5,
      text: 'Die Kombination aus Qualität, Geschwindigkeit und Service ist unschlagbar. Innerhalb von 2 Stunden Rückruf bekommen zu haben, hat mich beeindruckt.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      verified: true,
      savings: '€2.100/Jahr',
      installationDate: 'April 2024'
    },
    {
      name: 'Familie Müller',
      location: 'Stuttgart',
      rating: 5,
      text: 'Nach 6 Monaten sind wir zu 85% autark. Die App zeigt uns genau, wie viel Strom wir produzieren. Perfekte Lösung für unsere 4-köpfige Familie.',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      verified: true,
      savings: '€2.600/Jahr',
      installationDate: 'Februar 2024'
    }
  ];

  const stats = [
    { value: '4.9/5', label: 'Ø Bewertung', icon: <Star className="w-6 h-6 text-neutral-500" /> },
    { value: '2.847', label: 'Kunden', icon: <span className="text-lg">👥</span> },
    { value: '98%', label: 'Weiterempfehlung', icon: <span className="text-lg">↺</span> }
  ];

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Stimmen unserer Kunden</Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm-token leading-relaxed">
            Reale Projekte. Messbare Ergebnisse. Verifizierte Erfahrungen.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {stats.map((s,i)=> (
            <StatCard key={i} icon={s.icon} value={s.value} label={s.label} animate />
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t,i)=> (
            <TestimonialCard key={i} name={t.name} location={t.location} text={t.text} image={t.image} verified={t.verified} savings={t.savings} date={t.installationDate} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex flex-col md:flex-row md:items-center gap-4 px-6 py-5 rounded-xl border border-neutral-200 bg-white">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto md:mx-0" />
            <p className="text-sm text-neutral-600 max-w-xl md:text-left">100% verifizierte Bewertungen – Herkunft & Projektstatus intern dokumentiert. Keine gekauften Rezensionen.</p>
          </div>
        </div>

    <div className="mt-16 text-center">
          <Card variant="accent" elevation="md" className="p-10 max-w-2xl mx-auto text-center">
            <Heading as="h3" size="lg" className="mb-4">Ergebnisorientierte Umsetzung</Heading>
            <p className="text-neutral-600 mb-6 text-sm-token leading-relaxed">Starten Sie mit einer fundierten Analyse – klarer Business Case, transparente Investition, messbarer Nutzen.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="px-7">Kostenlose Beratung</Button>
              <Button variant="outline" size="lg" className="px-7">Rechner testen</Button>
            </div>
          </Card>
        </div>
  </Section>
  );
}
