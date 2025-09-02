import React, { useMemo, useState, useEffect } from 'react';
import { Section } from '@/components/ui/section';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, LineChart, Calendar, Handshake, Shield, CheckCircle2, Timer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SectionAblauf({ persona, track }) {
  const { t, i18n } = useTranslation();
  const prefersReducedMotion = useMemo(()=> typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
  const [progress, setProgress] = useState(0);
  const arr = (key) => {
    const v = t(key, { returnObjects: true });
    if (Array.isArray(v) && v.length) return v;
    if (i18n.language !== 'de') {
      const fb = i18n.getFixedT('de')(key, { returnObjects: true });
      if (Array.isArray(fb)) return fb;
    }
    return [];
  };
  const stepData = arr('ablauf.steps');
  const steps = stepData.map((s, idx) => ({ ...s, idx, icon: [FileCheck, LineChart, Calendar, Handshake][idx] || FileCheck }));
  useEffect(()=>{
    const el = document.getElementById('ablauf');
    if(!el || typeof IntersectionObserver==='undefined') return;
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ let start; const dur=1200; function step(ts){ if(!start) start=ts; const p=Math.min(1,(ts-start)/dur); setProgress(Math.round(p*100)); if(p<1) requestAnimationFrame(step);} requestAnimationFrame(step); io.disconnect(); }});
    },{threshold:0.35});
    io.observe(el); return ()=> io.disconnect();
  },[]);
  const personaNote = persona==='gewerbe' ? t('ablauf.persona_note_biz','Business: CAPEX/OPEX & Lastgang früh sichtbar.') : t('ablauf.persona_note_priv','Privat: Dimensionierung ohne Übergröße – Kostenrisiko runter.');
  return (
  <Section id="ablauf" variant="gradientAmber" padding="loose" contain={false} className="bg-grid-slate relative overflow-hidden" aria-labelledby="ablauf-heading">
      <div aria-hidden className="absolute -top-20 -right-32 w-[520px] h-[520px] rounded-full bg-amber-100/40 blur-3xl" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 content-lg relative">
  <SectionHeader
          eyebrow={t('ablauf.eyebrow')}
          title={t('ablauf.title')}
          subtitle={t('ablauf.subtitle')}
        />
        {t('ablauf.simple_intro') && <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl">{t('ablauf.simple_intro')}</p>}
        {(() => { const bullets = t('ablauf.simple_bullets', { returnObjects: true }); if(!Array.isArray(bullets)||bullets.length===0) return null; return (
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs font-medium text-gray-600">{bullets.map(b=> <li key={b} className="inline-flex items-center gap-1 bg-white border border-amber-100 rounded-full px-3 py-1">{b}</li>)}</ul>
        ); })()}
        <div className="mt-10 flex flex-col gap-4">
          <div className="relative w-full h-3 rounded-full bg-gray-200/70 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 transition-[width] duration-300" style={{width: progress+'%'}} aria-label={t('ablauf.progress_label','Fortschritt')} />
            <div className="absolute inset-0 flex justify-between px-1">
              {steps.map(s=> <span key={s.idx} className="relative flex-1">
                <span className={`absolute left-1/2 -translate-x-1/2 top-0 w-1 h-3 rounded-full ${progress >= (s.idx/(steps.length-1))*100 ? 'bg-amber-500' : 'bg-white/70'}`}></span>
              </span>)}
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1">{personaNote}</span>
            <span className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1">{t('ablauf.progress_hint','Struktur statt Druck')}</span>
          </div>
        </div>
        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <ol className="relative pl-6 before:content-[''] before:absolute before:left-1 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-gray-200 before:via-gray-100 before:to-transparent space-y-8">
              {steps.map((s,i) => (
                <li key={s.title} className={`relative group ${prefersReducedMotion ? '' : 'reveal'} hover-lift`} aria-label={`${i+1}/${steps.length} ${s.title}`} itemScope itemType="https://schema.org/ListItem">
                  <div className="absolute -left-1.5 top-1.5 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center group-hover:border-amber-300 transition"><s.icon className="w-3.5 h-3.5 text-amber-600"/></div>
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur text-gray-800 border border-gray-200 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide">
                    {s.badge} <span className="hidden sm:inline text-gray-400">·</span> <span className="text-gray-600 hidden sm:inline">{s.duration}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 text-lg flex items-center gap-2" itemProp="name">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed max-w-prose" itemProp="description">{s.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.chips.map(c => <span key={c} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-800 rounded-full px-2.5 py-1 text-[11px] font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600"/>{c}</span>)}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-medium text-gray-600">
                    <span className="inline-flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white/70 px-2 py-1"><LineChart className="w-3.5 h-3.5 text-amber-600"/><span>{t('ablauf.kpi_yield','Ertrag')}</span></span>
                    <span className="inline-flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white/70 px-2 py-1"><Shield className="w-3.5 h-3.5 text-amber-600"/><span>{t('ablauf.kpi_risk','Risiko ↓')}</span></span>
                    <span className="inline-flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white/70 px-2 py-1"><FileCheck className="w-3.5 h-3.5 text-amber-600"/><span>{t('ablauf.kpi_docs','Dokumente')}</span></span>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button onClick={()=> track?.('cta_click',{placement:'ablauf_step',action:'calculator',persona, step:i+1})} className="text-[11px] font-semibold tracking-wide uppercase text-amber-700 hover:text-amber-800">{t('ablauf.step_cta_calc','Spanne prüfen')}</button>
                    <button onClick={()=> track?.('cta_click',{placement:'ablauf_step',action:'contact',persona, step:i+1})} className="text-[11px] font-semibold tracking-wide uppercase text-gray-600 hover:text-gray-800">{t('ablauf.step_cta_contact','Fragen?')}</button>
                  </div>
                  {i < steps.length -1 && <ArrowRight aria-hidden className="hidden md:block absolute -right-6 top-6 w-5 h-5 text-amber-300 group-hover:text-amber-400 transition"/>}
                </li>
              ))}
            </ol>
            <div className="mt-14 rounded-2xl border border-amber-200 bg-white px-6 py-6 shadow-sm flex flex-col lg:flex-row items-center gap-5 hover-lift">
              <div className="flex items-center gap-3 text-gray-900 font-medium"><Timer className="w-5 h-5 text-amber-600"/>{t('ablauf.cta_title')}</div>
              <div className="text-sm text-gray-600 flex-1">{t('ablauf.cta_sub')}</div>
              <Link to={createPageUrl('Contact') + `?persona=${persona}`} onClick={() => track?.('cta_click', { placement: 'ablauf', action: 'contact', persona })}><Button className="bg-amber-500 hover:bg-amber-600 text-white">{t('ablauf.cta_btn')}</Button></Link>
            </div>
            <div className="mt-4 text-xs sm:text-sm text-gray-500">{t('ablauf.disclaimer')}</div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <Card className="card-glass hover-lift"><CardContent className="p-6"><div className="flex items-center gap-2"><span className="icon-pill-amber"><Shield className="w-4 h-4 text-amber-900"/></span><div className="font-semibold text-gray-900">{t('ablauf.deliverables_title')}</div></div><ul className="mt-4 space-y-2 text-base sm:text-lg text-gray-700">{t('ablauf.deliverables', { returnObjects: true }).map((d,i)=>{ const Icon=[FileCheck,LineChart,Calendar,CheckCircle2,Shield][i]||FileCheck; return <li key={i} className="flex gap-2"><Icon className="w-4 h-4 text-amber-700"/> {d}</li>; })}</ul><div className="mt-6 grid grid-cols-2 gap-3 text-[11px] font-medium">{t('ablauf.mini_metrics', { returnObjects: true }).map((m,i)=>(<div key={i} className="rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2 text-amber-900 flex flex-col items-start"><span>{m.label}</span><span className="text-[10px] text-amber-700/80 font-normal">{m.note}</span></div>))}</div><div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">{t('ablauf.fair_note')}</div></CardContent></Card>
            <Card className="card-glass hover-lift"><CardContent className="p-6"><div className="font-semibold text-gray-900 flex items-center gap-2"><Shield className="w-4 h-4 text-amber-900"/>{t('ablauf.why_title')}</div><ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700">{t('ablauf.why_items', { returnObjects: true }).map((w,i)=><li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> {w}</li>)}</ul><div className="mt-6 text-[11px] text-gray-500 leading-relaxed">{t('ablauf.why_note','Struktur senkt Fehlentscheidungen & Nachträge.')}</div></CardContent></Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
