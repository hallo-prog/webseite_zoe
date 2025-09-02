import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Metric } from '@/components/ui/metric';
import { trackVariant } from '@/utils/tracking';
import { Award, Users, Wrench, GraduationCap, Star, CheckCircle } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function TeamSection() {
  React.useEffect(() => trackVariant('team_view', { section: 'homepage' }), []);

  const teamMembers = [
    {
      name: 'Dr. Michael Weber',
      role: 'Geschäftsführer & Solar-Experte',
      bio: '15+ Jahre Erfahrung in der Solarbranche. Doktor der Elektrotechnik mit Fokus auf erneuerbare Energien.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: ['Photovoltaik', 'Energieberatung', 'Projektmanagement'],
      certifications: ['TÜV-zertifiziert', 'VDE-geprüft'],
      experience: '15+ Jahre'
    },
    {
      name: 'Sarah Müller',
      role: 'Leitende Projektmanagerin',
      bio: 'Spezialistin für die Planung und Koordination komplexer Solarprojekte. Garantiert termingerechte Fertigstellung.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: ['Projektmanagement', 'Kundenbetreuung', 'Qualitätssicherung'],
      certifications: ['PMP-zertifiziert', 'HWK-geprüft'],
      experience: '12+ Jahre'
    },
    {
      name: 'Thomas Bauer',
      role: 'Chef-Installateur & Techniker',
      bio: 'Meister der Elektrotechnik mit Spezialisierung auf Solaranlagen. Führt alle Installationen persönlich durch.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: ['Elektrotechnik', 'Solarinstallation', 'Wartung & Service'],
      certifications: ['Elektromeister', 'VDE-zertifiziert'],
      experience: '18+ Jahre'
    },
    {
      name: 'Anna Schmidt',
      role: 'Energieberaterin & Finanzexpertin',
      bio: 'Hilft Ihnen bei der optimalen Finanzierung Ihrer Solaranlage. Findet die besten Förderungen und Kreditkonditionen.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      expertise: ['Finanzberatung', 'Fördermittel', 'Energiekonzepte'],
      certifications: ['Energieberaterin', 'IHK-zertifiziert'],
      experience: '10+ Jahre'
    }
  ];

  const teamStats = [
    { value: '45+', label: 'Team-Mitglieder', icon: Users },
    { value: '25+', label: 'Jahre Durchschnittserfahrung', icon: Award },
    { value: '500+', label: 'Installierte Anlagen', icon: Wrench },
    { value: '100%', label: 'Zertifizierte Fachkräfte', icon: GraduationCap }
  ];

  return (
    <Section variant="warm" padding="normal" size="wide">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Team & Expertise</Heading>
          <p className="text-neutral-600 max-w-3xl mx-auto text-sm-token leading-relaxed">
            Interdisziplinäre Fachkräfte – Planung, Installation, Finanzierung & Qualitätssicherung aus einer Hand.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {teamStats.map((s,i)=> (
            <Card key={i} variant="subtle" elevation="sm" className="p-5 text-center">
              <s.icon className="w-7 h-7 mx-auto mb-3 text-neutral-500" />
              <Metric value={s.value} label={s.label} size="md" />
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {teamMembers.map((m,i)=> (
            <Card key={i} variant="glass" elevation="sm" className="overflow-hidden p-0">
              <div className="aspect-square w-full overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <Heading as="h3" size="md" className="mb-1 leading-tight">{m.name}</Heading>
                  <p className="text-neutral-600 text-sm font-medium">{m.role}</p>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">{m.bio}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.expertise.map((s,j)=> (
                        <span key={j} className="px-2 py-1 rounded-full bg-neutral-50 border border-neutral-150 text-[11px] text-neutral-600">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide mb-2">Zertifizierungen</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.certifications.map((c,j)=> (
                        <span key={j} className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" />{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-150">
                    <span className="text-sm font-medium text-neutral-600">{m.experience}</span>
                    <div className="flex">
                      {[...Array(5)].map((_,j)=> <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

    <div className="text-center">
          <Card variant="accent" elevation="md" className="p-10 max-w-2xl mx-auto text-center">
            <Heading as="h3" size="lg" className="mb-4">Direkter Expertenzugang</Heading>
            <p className="text-neutral-600 mb-6 text-sm-token leading-relaxed">Individuelle Beratung mit belastbaren Kennzahlen – kein Sales Pitch, sondern Substanz.</p>
            <Button variant="primary" size="lg" className="px-7">Beratung anfragen</Button>
          </Card>
        </div>
  </Section>
  );
}
