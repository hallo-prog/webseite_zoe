import React from 'react';
import { Heading } from '@/components/ui/heading';
export default function Privacy(){
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
  <Heading as="h1" size="3xl" className="mb-4">Datenschutzerklärung</Heading>
      <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Website verwendet keine Tracking-Cookies, außer technisch notwendigen.</p>
      <p>Bei Nutzung des Kontaktformulars werden die angegebenen Daten zwecks Bearbeitung der Anfrage gespeichert.</p>
      <p>Weitere Informationen auf Anfrage unter info@zoesolar.de.</p>
    </div>
  );
}
