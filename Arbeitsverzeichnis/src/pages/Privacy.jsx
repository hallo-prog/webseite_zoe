import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export default function Privacy(){
  return (
    <Section size="narrow" padding="normal">
      <div className="flow">
        <Heading as="h1" size="3xl">Datenschutzerklärung</Heading>
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Website verwendet keine Tracking-Cookies, außer technisch notwendigen.</p>
        <p>Bei Nutzung des Kontaktformulars werden die angegebenen Daten zwecks Bearbeitung der Anfrage gespeichert.</p>
        <p>Weitere Informationen auf Anfrage unter info@zoesolar.de.</p>
      </div>
    </Section>
  );
}
