import React, { useState } from 'react';
import { Section } from '@/components/ui/section';
import { CheckCircle2, XCircle, ChevronDown, Shield, FileCheck, Calendar, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Feature matrix
const FEATURES_KEYS = ['ertragsbasis','festpreis','foerder','terminplan','monitoring','subunternehmer','handover','transparency'];

export default function SectionComparison() {
  const { t } = useTranslation();
  const rows = t('comparison.rows', { returnObjects: true }) || [];
  const [open, setOpen] = useState(null);
  return (
  <Section id="vergleich" variant="gridSlate" padding="loose" contain={false} className="relative overflow-hidden" aria-labelledby="vergleich-heading" itemScope itemType="https://schema.org/Table">
      <div aria-hidden className="absolute -top-20 -left-40 w-[480px] h-[480px] rounded-full bg-amber-100/40 blur-3xl" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 content-lg">
        <h2 id="vergleich-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-center">{t('comparison.headline')}</h2>
        <p className="mt-5 max-w-2xl mx-auto text-center text-base sm:text-lg text-gray-600">{t('comparison.sub')}</p>
        <div className="mt-6 max-w-3xl mx-auto bg-white/70 backdrop-blur rounded-xl border border-gray-200 p-4 text-xs sm:text-sm text-gray-700 flex flex-wrap gap-3 justify-center" aria-label={t('comparison.legend_aria','Legende')}>
          <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>{t('comparison.legend_yes','Vorhanden / zugesichert')}</span>
          <span className="inline-flex items-center gap-1"><XCircle className="w-4 h-4 text-gray-500"/>{t('comparison.legend_no','Fehlt / unsicher')}</span>
          <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-amber-600"/>{t('comparison.legend_focus','Unser Fokus: Planbarkeit & Schriftlichkeit')}</span>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-900 rounded-full px-3 py-1"><Shield className="w-3.5 h-3.5"/>{t('comparison.chips.responsibility')}</span>
          <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-900 rounded-full px-3 py-1"><FileCheck className="w-3.5 h-3.5"/>{t('comparison.chips.written')}</span>
            <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-900 rounded-full px-3 py-1"><Calendar className="w-3.5 h-3.5"/>{t('comparison.chips.dates')}</span>
          <span className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-900 rounded-full px-3 py-1"><LineChart className="w-3.5 h-3.5"/>{t('comparison.chips.conservative')}</span>
        </div>
        <div className="mt-14 hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white hover-lift" role="table" aria-label="Vergleich ZOE Solar vs. Marktstandard">
          <div className="grid grid-cols-3 text-sm font-semibold">
            <div className="px-4 py-3" role="columnheader" />
            <div className="px-4 py-3 text-gray-900 bg-gray-50 border-l border-gray-200" role="columnheader">ZOE Solar</div>
            <div className="px-4 py-3 text-gray-700 border-l border-gray-200" role="columnheader">Marktstandard</div>
          </div>
          <div className="divide-y divide-gray-200" role="rowgroup">
            {rows.map(row => (
              <div key={row.k} className="grid grid-cols-3" role="row" itemScope itemType="https://schema.org/PropertyValue">
                <div className="px-4 py-3 text-sm text-gray-700" role="rowheader" itemProp="name">{row.k}</div>
                <div className="px-4 py-3 border-l border-gray-200" role="cell" itemProp="value"><div className="inline-flex items-center gap-2 text-emerald-700"><CheckCircle2 className="w-4 h-4"/><span>{row.a}</span></div></div>
                <div className="px-4 py-3 border-l border-gray-200" role="cell"><div className="inline-flex items-center gap-2 text-gray-600"><XCircle className="w-4 h-4"/><span>{row.b}</span></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 md:hidden space-y-3" aria-label={t('comparison.mobile_label')}>
          {rows.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.k} className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm">
                <Button variant="plain" onClick={()=> setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left" aria-expanded={isOpen} aria-controls={`cmp-panel-${i}`}>
                  <span className="text-sm font-medium text-gray-800">{f.k}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
                </Button>
                <div id={`cmp-panel-${i}`} className={`grid grid-cols-2 border-t border-gray-100 text-sm transition-[max-height] duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'} overflow-hidden`} role="group" aria-label={`Vergleich ${f.k}`}>
                  <div className="px-4 py-3 flex items-start gap-2 text-emerald-700 bg-emerald-50/60">
                    <CheckCircle2 className="w-4 h-4 mt-0.5"/>
                    <span>{f.a}</span>
                  </div>
                  <div className="px-4 py-3 flex items-start gap-2 text-gray-600">
                    <XCircle className="w-4 h-4 mt-0.5"/>
                    <span>{f.b}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" variant="primary" onClick={()=> document.getElementById('angebot')?.scrollIntoView({behavior:'smooth'})} className="bg-amber-500 hover:bg-amber-600">
            {t('comparison.to_offer_cta','Jetzt Paket prüfen')}
          </Button>
        </div>
      </div>
    </Section>
  );
}