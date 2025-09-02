import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { trackCta } from '@/utils/tracking';
import { HeroSolar, TrustAuthoritySection, ProblemSolutionSection, TestimonialsSection, TeamSection, MetricsBar, Bundles, FinancingTeaser, ProcessJourney, ImpactSection, FinalCTA } from '@/components/sections/v4';
import ReviewsJsonLd from '@/components/seo/ReviewsJsonLd';
import DeferredJsonLd from '@/components/seo/DeferredJsonLd';

export default function HomeV4() {
  const navigate = useNavigate();
  const goCalc = useCallback(()=>{ trackCta('home_v4','calculator'); navigate(createPageUrl('Calculator')); },[navigate]);
  const goContact = useCallback(()=>{ trackCta('home_v4','contact'); navigate(createPageUrl('Contact')); },[navigate]);
  return (
    <main id="main-content">
      <Helmet>
        <title>Solaranlage Berlin | Photovoltaik ZOE - Kostenlose Beratung & Installation</title>
        <meta name="description" content="Solaranlage in Berlin & Brandenburg ✓ Kostenlose Beratung ✓ TÜV-zertifiziert ✓ 15+ Jahre Erfahrung ✓ Sparen Sie €2.400/Jahr ✓ Jetzt unverbindlich anfragen!" />
        <meta name="keywords" content="Solaranlage Berlin, Photovoltaik, PV-Anlage, Solarstrom, erneuerbare Energie, Energieberatung, Solarinstallation" />
        <meta name="geo.region" content="DE-BE" />
        <meta name="geo.placename" content="Berlin" />
        <meta name="geo.position" content="52.5200;13.4050" />
        <meta name="ICBM" content="52.5200, 13.4050" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ZOE Solar" />
        <meta name="language" content="de-DE" />
        <link rel="canonical" href="https://www.zoe-solar.de/" />
      </Helmet>
      <HeroSolar onPrimary={goCalc} onSecondary={goContact} />
      <TrustAuthoritySection />
      <ProblemSolutionSection />
      <TestimonialsSection />
      <TeamSection />
      <MetricsBar />
      <Bundles onSelect={(b)=>navigate(createPageUrl('Pricing')+`?bundle=${b.id}`)} />
      <FinancingTeaser />
      <ProcessJourney />
      <ImpactSection />
      <FinalCTA onPrimary={goCalc} onSecondary={goContact} />
      <ReviewsJsonLd />
      <DeferredJsonLd items={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ZOE Solar",
          "url": "https://www.zoe-solar.de",
          "description": "Solaranlage Berlin | Photovoltaik Installation & Beratung | TÜV-zertifiziert | 15+ Jahre Erfahrung",
          "publisher": {
            "@type": "Organization",
            "name": "ZOE Solar",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.zoe-solar.de/Logo-ZOE.png"
            }
          }
        }
      ]} />
    </main>
  );
}