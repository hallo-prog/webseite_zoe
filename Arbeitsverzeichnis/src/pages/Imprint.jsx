import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export default function Imprint(){
  return (
    <Section size="narrow" padding="normal">
      <div className="flow">
        <Heading as="h1" size="3xl">Impressum</Heading>
        <p>ZOE Solar GmbH</p>
        <p>Musterstraße 123, 12345 Musterstadt</p>
        <p>Telefon: 0800-123456 · E-Mail: info@zoesolar.de</p>
        <p>Geschäftsführer: Max Mustermann · Handelsregister: HRB 12345</p>
        <p>USt-IdNr.: DE123456789</p>
      </div>
    </Section>
  );
}
