import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, BarChart3, Video, CalendarCheck, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';

// Vierstufige Lead-Magnet-Leiter – Wertstaffelung & psychologische Prinzipien (Reziprozität, Commitment)
export default function LeadMagnetLadder({ persona, onTrack }) {
  const { t } = useTranslation();
  const items = t('leadMagnets.items', { returnObjects: true }) || [];
  return (
    <Section id="lead-magnets" variant="gradientSoft" padding="loose" contain={false} className="">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto">
          <Badge variant="soft">{t('leadMagnets.badge')}</Badge>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('leadMagnets.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('leadMagnets.subtitle')}</p>
        </header>
        <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label={t('leadMagnets.title')}>
          {items.map((it, idx) => {
            const icons = [FileText, BarChart3, Video, CalendarCheck];
            const Icon = icons[idx] || ArrowRight;
            return (
              <li key={it.h} className="relative surface-card p-6 flex flex-col group border-amber-100 hover:border-amber-300 transition" aria-posinset={idx+1} aria-setsize={items.length}>
                <div className="flex items-start gap-3">
                  <span className="icon-pill-amber"><Icon className="w-5 h-5 text-white"/></span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700/80">{t('leadMagnets.step_label',{n:idx+1})}</div>
                    <h3 className="text-base font-semibold leading-snug mt-1">{it.h}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{it.d}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{(it.chips||[]).map(c=> <Badge key={c} variant="soft" color="amber" size="xs" className="font-semibold">{c}</Badge>)}</div>
                {it.cta && <div className="mt-5"><LeadMagnetCTA persona={persona} variant={it.cta} onTrack={onTrack} /></div>}
                {idx < items.length - 1 && <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-amber-300" aria-hidden>→</div>}
              </li>
            );
          })}
        </ol>
        <div className="mt-12 text-center">
          <Button as={Link} to={createPageUrl('Calculator')+`?persona=${persona}`} variant="primary" size="xl" className="px-8 py-4" onClick={()=>onTrack?.('cta_click',{place:'lead_magnets',action:'calculator'})}>{persona==='privat'? t('leadMagnets.cta_calc_priv'): t('leadMagnets.cta_calc_biz')}</Button>
        </div>
      </div>
    </Section>
  );
}

function LeadMagnetCTA({ variant, persona, onTrack }) {
  const { t } = useTranslation();
  const map = {
    ebook: { label: t('leadMagnets.cta_ebook'), href: '#lead-magnets' },
    analyse: { label: t('leadMagnets.cta_analysis'), href: createPageUrl('Calculator') + `?persona=${persona}` },
    webinar: { label: t('leadMagnets.cta_webinar'), href: createPageUrl('Contact') + `?persona=${persona}` },
    onsite: { label: t('leadMagnets.cta_onsite'), href: createPageUrl('Contact') + `?persona=${persona}` }
  };
  const cfg = map[variant] || map.ebook;
  return <Link to={cfg.href} className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 group" onClick={()=>onTrack?.('lead_magnet_click',{variant})}>{cfg.label}<ArrowRight className="w-4 h-4 ml-1 transition group-hover:translate-x-0.5"/></Link>;
}
