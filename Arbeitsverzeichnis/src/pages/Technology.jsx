import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { track as globalTrack } from '@/utils/tracking';
import { createPageUrl } from '@/utils';
import {
  SectionHero,
  SectionTechArchitecture,
  SectionTechComponentsGrid,
  SectionTechComparison,
  SectionTechAuthority,
  SectionTechCalculatorCTA,
  SectionCTA
} from '@/components/sections/v2';

export default function Technology(){
  const navigate = useNavigate();
  const goCalc = useCallback(()=>{ globalTrack('cta_click',{place:'technology',type:'calculator'}); navigate(createPageUrl('Calculator')); },[navigate]);
  const goContact = useCallback(()=>{ globalTrack('cta_click',{place:'technology',type:'contact'}); navigate(createPageUrl('Contact')); },[navigate]);
  return (
    <main id="main-content">
      <Helmet>
        <title>Photovoltaik Technologie Berlin | PV-Module & Wechselrichter | ZOE</title>
        <meta name="description" content="Photovoltaik Technologie Berlin: Premium PV-Module, Hybrid-Wechselrichter & Speichersysteme ✓ TÜV-zertifiziert ✓ 15+ Jahre Erfahrung ✓ Maximale Rendite ✓ Jetzt informieren!" />
        <meta name="keywords" content="Photovoltaik Technologie Berlin, PV-Module, Solarwechselrichter, Solarspeicher, Solartechnik Berlin, erneuerbare Energien" />
        <meta property="og:title" content="Photovoltaik Technologie Berlin | PV-Module & Wechselrichter | ZOE" />
        <meta property="og:description" content="Photovoltaik Technologie Berlin: Premium PV-Module, Hybrid-Wechselrichter & Speichersysteme ✓ TÜV-zertifiziert ✓ 15+ Jahre Erfahrung ✓ Maximale Rendite ✓ Jetzt informieren!" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="DE-BE" />
        <meta name="geo.placename" content="Berlin" />
        <meta name="geo.position" content="52.5200;13.4050" />
        <meta name="ICBM" content="52.5200, 13.4050" />
        <link rel="canonical" href="https://zoe-solar.de/technologie" />
      </Helmet>
      <SectionHero copy={{ hl: 'Technologie, die für Sie arbeitet', sub: 'Architektur & Komponenten – nachvollziehbar wirtschaftlich' }} onPrimary={goCalc} onSecondary={goContact} />
      <SectionTechArchitecture />
      <SectionTechComponentsGrid />
      <SectionTechComparison />
      <SectionTechAuthority />
      <SectionTechCalculatorCTA onPrimary={goCalc} onSecondary={goContact} />
      <SectionCTA onPrimary={goCalc} onSecondary={goContact} />
    </main>
  );
}
