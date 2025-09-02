import React, { useMemo, useState } from 'react';
import { Section } from '@/components/ui/section';
import { useTranslation } from 'react-i18next';
import { Sparkles, Star, Calendar, CheckCircle2, FileCheck, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';

function MiniSparkline({ points = [], width = 220, height = 40, className = '' }) {
  if (!points || points.length === 0) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const d = points.map((p, i) => ` ${i===0?'M':'L'}${i*step},${height-((p-min)/range)*height}`).join('');
  const area = `${d} L ${width},${height} L 0,${height} Z`;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <path d={area} fill="currentColor" className={`${className} opacity-10`} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className={className} />
    </svg>
  );
}

export default function SectionBeweis({ persona, track }) {
  const { t, i18n } = useTranslation();
  const [kpiMode, setKpiMode] = useState(persona === 'gewerbe' ? 'biz' : 'priv');
  const prefersReducedMotion = useMemo(()=> typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
  const arr = (key) => {
    const v = t(key, { returnObjects: true });
    if (Array.isArray(v) && v.length) return v;
    if (i18n.language !== 'de') {
      const fb = i18n.getFixedT('de')(key, { returnObjects: true });
      if (Array.isArray(fb)) return fb;
    }
    return [];
  };
  const stats = arr(kpiMode === 'biz' ? 'beweis.stats_biz' : 'beweis.stats_priv').length ? arr(kpiMode === 'biz' ? 'beweis.stats_biz' : 'beweis.stats_priv') : arr('beweis.stats');
  const cases = arr('beweis.cases');
  const statsHelp = arr('beweis.stats_help');
  const simpleIntro = t('beweis.simple_intro','');
  const simpleBullets = arr('beweis.simple_bullets');
  return (
  <Section id="beweis" variant="gradientSoft" padding="loose" contain={false} className="bg-sun" aria-labelledby="beweis-heading">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 body-prose content-lg">
  <SectionHeader
          eyebrow={t('beweis.eyebrow')}
          title={t('beweis.title')}
          subtitle={t('beweis.subtitle')}
        />
        {simpleIntro && <p className="mt-6 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">{simpleIntro}</p>}
        {simpleBullets?.length>0 && (
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs font-medium text-gray-600">
            {simpleBullets.map(b => <li key={b} className="inline-flex items-center gap-1 bg-white border border-amber-100 rounded-full px-3 py-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600"/>{b}</li>)}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 rounded-full px-3 py-1"><Star className="w-4 h-4 text-amber-500"/>{t('beweis.chips.rating')}</span>
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 rounded-full px-3 py-1"><Calendar className="w-4 h-4 text-amber-600"/>{t('beweis.chips.on_time')}</span>
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 rounded-full px-3 py-1"><Sparkles className="w-4 h-4 text-amber-600"/>{t('beweis.chips.installs')}</span>
          <div className="inline-flex rounded-full overflow-hidden border border-amber-200 bg-white/90 backdrop-blur ml-2 text-xs">
            {['priv','biz'].map(mode => (
              <Button
                key={mode}
                variant="plain"
                onClick={() => { setKpiMode(mode); track?.('kpi_mode_change',{placement:'beweis',mode}); }}
                className={`px-3 py-1 font-medium transition ${kpiMode===mode ? 'bg-amber-500 text-white' : 'text-amber-800 hover:bg-amber-100'}`}
                aria-pressed={kpiMode===mode}
              >{mode==='priv' ? t('beweis.toggle_priv') : t('beweis.toggle_biz')}</Button>
            ))}
          </div>
        </div>
  <div className="mt-12 grid md:grid-cols-3 gap-6" role="list" aria-label={t('sections.beweis')+ ' stats'}>
          {stats.map((s, idx) => {
            const Icon = [Sparkles, Star, Calendar][idx] || Sparkles;
            return (
            <div key={s.label} role="listitem" className={`rounded-2xl p-6 card-glass text-center hover-lift ${prefersReducedMotion ? '' : 'reveal'}`}>
              <div className="mx-auto mb-3 icon-pill-amber"><Icon className="w-4 h-4 text-amber-900" /></div>
              <div className="text-3xl font-extrabold text-gray-900">{s.number}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              {statsHelp[idx] && <div className="mt-2 text-[11px] text-gray-500 leading-snug">{statsHelp[idx]}</div>}
            </div>
          );})}
        </div>
  <div className="mt-16 grid md:grid-cols-2 gap-6" role="list" aria-label={t('sections.beweis')+ ' cases'}>
      {cases.map((c,i)=>(
            <div key={i} role="listitem" className={`rounded-2xl card-glass p-8 hover-lift ${prefersReducedMotion ? '' : 'reveal'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">{c.title}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-0.5">{c.caption}</div>
                </div>
        <div className="eyebrow">{t('beweis.case_badge')}</div>
              </div>
              <div className="mt-4">
                <MiniSparkline points={c.points} height={40} className="text-emerald-600" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.kpis.map(k => <span key={k} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800"><CheckCircle2 className="w-4 h-4 text-emerald-600"/>{k}</span>)}
              </div>
              <div className="mt-4 text-xs sm:text-sm text-gray-500 leading-relaxed">{c.note}</div>
              <div className="mt-5 flex gap-3">
  <Button variant="plain" onClick={() => track?.('cta_click', { placement: 'beweis', action: 'download_case', persona, case: c.title })} className="text-xs sm:text-sm inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 transition"><Download className="w-3.5 h-3.5"/>{t('beweis.cta_block.report_icon')}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-2xl border border-amber-200 bg-gradient-to-r from-white via-amber-50/70 to-white px-6 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 reveal hover-lift">
          <div>
            <div className="text-base font-semibold text-gray-900">{t('beweis.cta_block.title')}</div>
            <div className="text-sm text-gray-700">{t('beweis.cta_block.sub')}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Calculator') + `?persona=${persona}`} onClick={() => track?.('cta_click', { placement: 'beweis', action: 'calculator', persona })}><Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 text-base">{t('beweis.cta_block.calc')}</Button></Link>
            <Link to={createPageUrl('Contact') + `?persona=${persona}&offer=beispielbericht`} onClick={() => track?.('cta_click', { placement: 'beweis', action: 'contact', persona })}><Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-50 px-6 py-3 text-base"><FileCheck className="w-5 h-5 mr-2"/>{t('beweis.cta_block.report')}</Button></Link>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center max-w-3xl mx-auto">
          {t('beweis.disclaimer')}
        </div>
      </div>
    </Section>
  );
}
