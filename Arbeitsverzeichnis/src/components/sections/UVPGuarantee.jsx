import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, ShieldCheck, Building2, Cpu, BatteryCharging, Zap, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

// Unique Value Proposition & Garantie- / Vertrauenselemente
export default function UVPGuarantee({ persona, onTrack }) {
  const { t } = useTranslation();
  const usp = t('uvp.points', { returnObjects: true }) || [];
  const guarantees = t('uvp.guarantees', { returnObjects: true }) || [];
  const innovations = t('uvp.innovations', { returnObjects: true }) || [];
  const IconMap = [Award, ShieldCheck, Building2, Cpu, BatteryCharging, Zap, Home];
  return (
    <Section id="uvp" variant="neutral" padding="normal" size="wide">
      <header className="text-center max-w-4xl mx-auto">
        <Badge variant="soft">{t('uvp.badge')}</Badge>
        <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">{t('uvp.title')}</h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('uvp.subtitle')}</p>
      </header>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {usp.map((b, i) => {
          const Ico = IconMap[i % IconMap.length];
          return (
            <div key={b.h} className="surface-card p-6 flex flex-col gap-3 hover:border-amber-300 transition">
              <span className="icon-pill-amber w-10 h-10"><Ico className="w-5 h-5 text-white"/></span>
              <h3 className="text-base font-semibold leading-snug">{b.h}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{b.d}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <Block title={t('uvp.guarantee_title')} items={guarantees} />
        <Block title={t('uvp.innovation_title')} items={innovations} />
      </div>
    </Section>
  );
}

function Block({ title, items }) {
  return (
    <div className="surface-card p-6 md:p-8">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
        {items.map(it => <li key={it}>{it}</li>)}
      </ul>
    </div>
  );
}
