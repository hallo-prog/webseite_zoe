import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

export default function NotFound(){
  return (
    <div className="max-w-3xl mx-auto p-12 text-center">
  <Heading as="h1" size="3xl" className="mb-4">Seite nicht gefunden</Heading>
      <p className="text-gray-600 mb-8">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
      <Link to="/">
        <Button>Zur Startseite</Button>
      </Link>
    </div>
  );
}
