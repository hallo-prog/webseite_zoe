import React, { useMemo } from 'react';
import { Section } from '@/components/ui/section';
import { useTranslation } from 'react-i18next';
import { LineChart, PiggyBank, Factory, TrendingUp, ShieldCheck, Timer, Info, FileCheck, Calculator } from 'lucide-react';
import { Pill } from '@/components/ui/pill';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Kennzahl-Karte
function KpiCard({ icon:Icon, label, value, note }) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 hover:border-cyan-300 hover:shadow-xl transition group overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200"><Icon className="w-5 h-5"/></span>
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-wide text-gray-600">{label}</span>
          <span className="text-xl font-semibold tracking-tight text-gray-900 tabular-nums">{value}</span>
        </div>
      </div>
      {note && <div className="mt-3 text-[11px] leading-relaxed text-gray-500 flex items-start gap-1"><Info className="w-3.5 h-3.5 mt-0.5"/>{note}</div>}
      <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

export default function SectionEconomicImpact({ persona = 'privat', track }) {
  const { t } = useTranslation();
  const isBiz = persona === 'gewerbe';
  const range = isBiz ? t('impact.calc_range_biz') : t('impact.calc_range_priv');
  const chips = t('impact.chips', { returnObjects: true }) || [];
  const levers = t('impact.levers', { returnObjects: true }) || [];
  const kpis = t('impact.kpis', { returnObjects: true }) || [];
  const simpleIntro = t('impact.simple_intro','');
  const simpleBullets = t('impact.simple_bullets', { returnObjects: true }) || [];
  const kpiHelp = t('impact.kpi_help', { returnObjects: true }) || [];

  return (
  <Section id="impact" variant="gradientCyan" padding="loose" contain={false} className="relative overflow-hidden" aria-labelledby="impact-heading">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.16),transparent_60%)]" />
      </div>
  <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 content-lg body-prose">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-semibold tracking-wide">{t('impact.eyebrow')}</div>
          <h2 id="impact-heading" className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {isBiz ? t('impact.headline_biz') : t('impact.headline_priv')}
          </h2>
          <p className="mt-5 text-xl text-gray-700 leading-relaxed">{isBiz ? t('impact.sub_biz') : t('impact.sub_priv')}</p>
          {simpleIntro && <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">{simpleIntro}</p>}
          {simpleBullets.length>0 && (
            <ul className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] sm:text-xs font-medium text-gray-600">
              {simpleBullets.map(b=> <li key={b} className="inline-flex items-center gap-1 bg-white border border-cyan-100 rounded-full px-3 py-1"><Calculator className="w-3.5 h-3.5 text-cyan-700"/>{b}</li>)}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {chips.map(c => <Pill key={c} size="md" variant="soft" color="neutral">{c}</Pill>)}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Wirtschaftliche Hebel */}
      <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-6 md:p-8 shadow-sm hover-lift">
              <div className="flex items-center gap-3 mb-6">
        <span className="icon-pill-amber"><TrendingUp className="w-5 h-5 text-cyan-900"/></span>
                <h3 className="text-xl font-semibold tracking-tight text-gray-900">{t('impact.lever_title')}</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4" aria-label={t('impact.lever_title')}>
                {levers.map(l => (
                  <li key={l.h} className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0"/>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{l.h}</div>
                      <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{l.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                {kpis.map((k,i) => <div key={k.label} className="flex flex-col gap-2">
                  <KpiCard icon={{LineChart, PiggyBank, Factory, Timer}[k.icon] || LineChart} label={k.label} value={k.value} note={k.note} />
                  {kpiHelp[i] && <div className="-mt-2 text-[11px] text-gray-500 leading-snug px-1">{kpiHelp[i]}</div>}
                </div>)}
              </div>
            </div>

            {/* Handlungs-Fenster / Dringlichkeit */}
            <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-white via-cyan-50 to-white p-6 md:p-8 shadow-sm hover-lift relative overflow-hidden">
              <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-cyan-100/60 blur-3xl" aria-hidden />
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 flex items-center gap-2"><Timer className="w-5 h-5 text-cyan-600"/>{t('impact.window_title')}</h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">{t('impact.window_text')}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-gray-600">
                    {t('impact.window_chips', { returnObjects: true }).map(ch => <span key={ch} className="inline-flex items-center gap-1 bg-white/90 border border-cyan-200 rounded-full px-3 py-1"><Info className="w-3.5 h-3.5 text-cyan-600"/>{ch}</span>)}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to={createPageUrl('Calculator') + `?persona=${persona}`} onClick={()=>track?.('cta_click',{placement:'impact_window',action:'calculator',persona})}>
                    <Button variant="primary" className="px-7 py-3 text-sm sm:text-base"><span className="flex items-center gap-2"><Calculator className="w-4 h-4"/>{isBiz ? t('impact.cta_calc_biz') : t('impact.cta_calc_priv')}</span></Button>
                  </Link>
                  <Link to={createPageUrl('Contact') + `?persona=${persona}`} onClick={()=>track?.('cta_click',{placement:'impact_window',action:'contact',persona})}>
                    <Button variant="outlineBrand" className="font-semibold px-7 py-3 text-sm sm:text-base">{t('impact.cta_contact')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Rechte Spalte: ROI Snippet */}
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-6 md:p-8 shadow-sm hover-lift">
              <h3 className="text-lg font-semibold tracking-tight text-gray-900 flex items-center gap-2"><PiggyBank className="w-5 h-5 text-cyan-600"/>{t('impact.range_title')}</h3>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{t('impact.range_text', { range })}</p>
              {simpleIntro && <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">{t('impact.range_reassure','Konservativ & schriftlich – kein Verkaufsdruck.')}</p>}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {t('impact.range_bullets', { returnObjects: true }).map(b => (
                  <div key={b} className="flex gap-2 items-start text-[13px] text-gray-600"><FileCheck className="w-4 h-4 text-emerald-600 mt-0.5"/>{b}</div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-gray-600">
                {t('impact.range_chips', { returnObjects: true }).map(c => <span key={c} className="inline-flex items-center gap-1 bg-cyan-50 border border-cyan-200 rounded-full px-3 py-1">{c}</span>)}
              </div>
              <div className="mt-6 flex gap-3">
                <Link to={createPageUrl('Calculator') + `?persona=${persona}`} onClick={()=>track?.('cta_click',{placement:'impact_range',action:'calculator',persona})}>
                  <Button variant="primary" className="px-6 py-3 text-sm">{t('impact.cta_calc_short')}</Button>
                </Link>
                <Link to={createPageUrl('Contact') + `?persona=${persona}`} onClick={()=>track?.('cta_click',{placement:'impact_range',action:'contact',persona})}>
                  <Button variant="outlineBrand" className="px-6 py-3 text-sm">{t('impact.cta_contact_short')}</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-100/60 via-white to-cyan-50 p-6 md:p-7 shadow-sm hover-lift">
              <h3 className="text-base font-semibold tracking-tight text-gray-900 mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-cyan-700"/>{t('impact.delta_title')}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{t('impact.delta_text')}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-gray-600">
                {simpleBullets.slice(0,3).map(b=> <span key={b} className="inline-flex items-center gap-1 bg-white border border-cyan-100 rounded-full px-3 py-1"><Calculator className="w-3.5 h-3.5 text-cyan-700"/>{b}</span>)}
              </div>
              <ul className="mt-3 space-y-1.5 text-[13px] text-gray-700">
                {t('impact.delta_list', { returnObjects: true }).map(li => <li key={li} className="flex gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600"/>{li}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
