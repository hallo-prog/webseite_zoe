import React, { useState, useMemo } from 'react';
import { Section } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Shield, CheckCircle2, AlertCircle, Info, BarChart3 } from 'lucide-react';
import { Pill } from '@/components/ui/pill';
import { SectionHeader } from './SectionHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTranslation } from 'react-i18next';

export default function SectionAngebot({ persona, track }) {
  const { t, i18n } = useTranslation();
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
  const [offerTier, setOfferTier] = useState('komfort');
  const trackCta = (placement, action, extra = {}) => track?.('cta_click', { placement, action, persona, offerTier, ...extra });
  const featureSets = t('offer.featureSets', { returnObjects: true });
  const kpis = t(persona==='privat' ? 'offer.kpis_priv' : 'offer.kpis_biz', { returnObjects: true });
  const matrix = t('offer.matrix', { returnObjects: true });
  const pills = t('offer.pills', { returnObjects: true });
  const simpleIntro = persona==='privat' ? t('offer.simple_intro_priv') : t('offer.simple_intro_biz');
  const tierBenefits = t(`offer.tier_benefits.${persona==='privat' ? 'priv':'biz'}.${offerTier}`, { returnObjects: true }) || [];

  const tiers = [
    { key: 'smart', label: t('offer.tiers.smart') },
    { key: 'komfort', label: t('offer.tiers.komfort'), recommended: true },
    { key: 'premium', label: t('offer.tiers.premium') }
  ];

  const currentFeatures = featureSets?.[persona==='privat' ? 'priv':'biz']?.[offerTier] || [];
  return (
  <Section id="angebot" variant="gridSlate" padding="loose" contain={false} aria-labelledby="angebot-heading" itemScope itemType="https://schema.org/OfferCatalog">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 body-prose content-lg">
        <SectionHeader
          eyebrow={t('offer.eyebrow')}
          title={persona==='privat' ? t('offer.title_priv') : t('offer.title_biz')}
          subtitle={t('offer.subtitle')}
        />
        {simpleIntro && <p className="mt-4 max-w-3xl mx-auto text-center text-base text-gray-700 leading-relaxed">
          {simpleIntro}
        </p>}
        <div className="mt-10 flex items-center justify-center gap-3" role="tablist" aria-label={t('offer.aria_tier_tabs')}>
          {tiers.map(tier => (
            <div key={tier.key} className="relative" role="presentation">
              {tier.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">{t('offer.tiers.recommended')}</span>}
              <Button variant="plain" onClick={() => setOfferTier(tier.key)} role="tab" aria-selected={offerTier===tier.key} aria-controls={`offer-panel-${tier.key}`} id={`offer-tab-${tier.key}`} className={`px-4 py-2 rounded-full text-sm border ${offerTier===tier.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{tier.label}</Button>
            </div>
          ))}
        </div>
        <div className="mt-10 grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7" itemScope itemType="https://schema.org/Offer" itemProp="itemListElement" id={`offer-panel-${offerTier}`} role="tabpanel" aria-labelledby={`offer-tab-${offerTier}`}>
            <Card className={`card-glass ${prefersReducedMotion ? '' : 'reveal'} hover-lift`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <span className="icon-pill-amber"><Sparkles className="w-4 h-4 text-amber-900"/></span>
                  <div className="font-semibold" itemProp="name">{persona==='privat' ? t('offer.features.header_priv') : t('offer.features.header_biz')}</div>
                </div>
                <ul className="mt-4 space-y-2 text-base sm:text-lg text-gray-700" itemProp="description">
                  {currentFeatures.map(li => (
                    <li key={li} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600"/><span>{li}</span></li>
                  ))}
                </ul>
                {tierBenefits.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-5">
                    <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase mb-2">{t('offer.tier_benefits_label','Kurz erklärt')}</div>
                    <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                      {tierBenefits.map(b => <li key={b} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/><span>{b}</span></li>)}
                    </ul>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2" aria-label="Merkmale">
                  <Pill variant="soft" color="neutral">{pills.price}</Pill>
                  <Pill variant="soft" color="neutral">{pills.conservative}</Pill>
                  <Pill variant="soft" color="neutral">{pills.no_hidden}</Pill>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4" aria-label="Package KPIs">
                  {kpis?.map(k => (
                    <div key={k.label} className="p-3 rounded-lg bg-gray-100 border border-gray-200 text-center">
                      <div className="text-xs uppercase tracking-wide text-gray-600">{k.label}</div>
                      <div className="font-semibold text-gray-900 mt-0.5 text-sm">{k.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link to={createPageUrl('Contact') + `?persona=${persona}&tier=${offerTier}`} onClick={() => trackCta('angebot','contact')}><Button className="bg-amber-500 hover:bg-amber-600 text-white">{t('offer.cta_contact')}</Button></Link>
                  <Link to={createPageUrl('Calculator') + `?persona=${persona}`} onClick={() => trackCta('angebot','calculator')}><Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-50">{persona==='privat'? t('offer.cta_calc_priv'): t('offer.cta_calc_biz')}</Button></Link>
                </div>
                <meta itemProp="priceCurrency" content="EUR" />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-5" itemScope itemType="https://schema.org/Offer" itemProp="itemListElement">
            <Card className="card-glass reveal hover-lift">
              <CardContent className="p-6">
                <div className="font-semibold flex items-center gap-2">
                  <span className="icon-pill-amber"><Shield className="w-4 h-4 text-amber-900"/></span>
                  <span itemProp="name">{t('offer.fix_headline')}</span>
                </div>
                <ul className="mt-4 space-y-2 text-base sm:text-lg text-gray-700" itemProp="description">
                  {arr('offer.fix_points').map(li => (
                    <li key={li} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600"/><span>{li}</span></li>
                  ))}
                </ul>
                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2"><Info className="w-4 h-4 mt-0.5"/> {t('offer.disclaimer')}</div>
                <meta itemProp="priceCurrency" content="EUR" />
              </CardContent>
            </Card>
          </div>
        </div>
        {matrix?.rows && (
          <div className="mt-14" aria-label={t('offer.aria_matrix')}>
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900"><BarChart3 className="w-4 h-4"/> {matrix.headline}</div>
            <div className="overflow-auto rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">&nbsp;</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-900">{matrix.col_smart}</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-900">{matrix.col_komfort}</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-900">{matrix.col_premium}</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.rows.map(r => (
                    <tr key={r.label} className="border-t border-gray-100">
                      <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">{r.label}</td>
                      <td className="px-4 py-2 text-gray-900">{r.smart}</td>
                      <td className="px-4 py-2 text-gray-900">{r.komfort}</td>
                      <td className="px-4 py-2 text-gray-900">{r.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal hover-lift">
          <div className="flex items-center gap-3 text-gray-900"><AlertCircle className="w-6 h-6"/><span className="font-semibold text-lg">{t('offer.rate_headline')}</span></div>
          <div className="text-base text-gray-800">Ab <span className="font-bold">€{persona==='privat'?120:480}</span>/Monat (Richtwert). <span className="text-gray-600">{t('offer.rate_note')}</span></div>
        </div>
      </div>
    </Section>
  );
}
