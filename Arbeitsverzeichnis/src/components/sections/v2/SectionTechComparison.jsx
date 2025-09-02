import React from 'react';
import getCopy from './copy';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';

export function SectionTechComparison({ rows = [], copy = {} }) {
  const hl = copy.hl || getCopy('tech.compare.hl', 'Premium vs. Standard – der Unterschied in Zahlen');
  const sub = copy.sub || getCopy('tech.compare.sub', 'Investitionssicherheit durch höhere Effizienz & längere Garantie.');
  const data = rows.length ? rows : [
    { k: 'module', label: getCopy('tech.compare.module', 'Module Wirkungsgrad'), standard: '18%', premium: '23%' },
    { k: 'inverter', label: getCopy('tech.compare.inverter', 'WR Effizienz'), standard: '95%', premium: '98%' },
    { k: 'storage', label: getCopy('tech.compare.storage', 'Zyklen Speicher'), standard: '3.000', premium: '6.000+' },
    { k: 'warranty', label: getCopy('tech.compare.warranty', 'Garantie Leistung'), standard: '10 J.', premium: '30 J.' }
  ];
  return (
    <Section variant="plain" padding="normal" size="narrow">
  <Heading as="h2" size="2xl" className="mb-4">{hl}</Heading>
        <p className="text-gray-600 max-w-3xl mb-10 leading-relaxed text-sm-token">{sub}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-neutral-200">
                <th className="py-3 pr-4 font-medium">{getCopy('tech.compare.metric', 'Kennzahl')}</th>
                <th className="py-3 px-4 font-medium">{getCopy('tech.compare.standard', 'Standard')}</th>
                <th className="py-3 px-4 font-medium">{getCopy('tech.compare.premium', 'Premium')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map(r => (
                <tr key={r.k} className="border-b last:border-b-0 border-neutral-100">
                  <td className="py-3 pr-4">{r.label}</td>
                  <td className="py-3 px-4 text-neutral-500">{r.standard}</td>
                  <td className="py-3 px-4 font-medium text-emerald-600">{r.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </Section>
  );
}

export default SectionTechComparison;
