import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, ThumbsDown, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

// Wettbewerbsdifferenzierung: Probleme -> Risiken Billiganbieter -> Unsere Absicherung
export default function Differentiation({ persona, onTrack }) {
  const { t } = useTranslation();
  const probs = t('diff.problems', { returnObjects: true }) || [];
  const risks = t('diff.risks', { returnObjects: true }) || [];
  const solves = t('diff.solutions', { returnObjects: true }) || [];
  return (
    <Section id="differenzierung" variant="plain" padding="normal" size="wide">
      <header className="text-center max-w-4xl mx-auto">
        <Badge variant="soft">{t('diff.badge')}</Badge>
        <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">{t('diff.title')}</h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('diff.subtitle')}</p>
      </header>
      <div className="mt-16 grid lg:grid-cols-3 gap-8">
        <Column title={t('diff.col_problems')} icon={ThumbsDown} items={probs} color="red" />
        <Column title={t('diff.col_risks')} icon={AlertTriangle} items={risks} color="amber" />
        <Column title={t('diff.col_solution')} icon={ShieldAlert} items={solves} color="emerald" positive />
      </div>
      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {(t('diff.proof', {returnObjects:true})||[]).map(b => (
          <div key={b.h} className="surface-card p-6 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center"><Layers className="w-5 h-5"/></div>
            <div>
              <h3 className="text-base font-semibold leading-snug">{b.h}</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{b.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Column({ title, icon:Icon, items, color='gray', positive=false }) {
  const colorMap = positive ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200';
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${positive? 'bg-emerald-600 text-white':'bg-gray-900 text-white'}`}><Icon className="w-5 h-5"/></span>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map(it => (
          <li key={it} className={`surface-card p-4 text-sm leading-relaxed flex gap-2 ${colorMap}`}> {!positive && <ThumbsDown className="w-4 h-4 text-gray-500 mt-0.5"/>} {positive && <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5"/>} <span>{it}</span></li>
        ))}
      </ul>
    </div>
  );
}
