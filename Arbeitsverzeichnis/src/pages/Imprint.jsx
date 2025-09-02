import React from 'react';
import { Heading } from '@/components/ui/heading';
export default function Imprint(){
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
  <Heading as="h1" size="3xl" className="mb-4">Impressum</Heading>
      <p>ZOE Solar GmbH</p>
      <p>Musterstraße 123, 12345 Musterstadt</p>
      <p>Telefon: 0800-123456 · E-Mail: info@zoesolar.de</p>
      <p>Geschäftsführer: Max Mustermann · Handelsregister: HRB 12345</p>
      <p>USt-IdNr.: DE123456789</p>
    </div>
  );
}
