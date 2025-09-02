import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { track as globalTrack } from '@/utils/tracking';
import { createPageUrl } from '@/utils';
import {
  SectionHero,
  SectionPromises,
  SectionDifferentiators,
  SectionTeam,
  SectionGuarantees,
  SectionTrustWall,
  SectionCTA
} from '@/components/sections/v2';

export default function WhyUs(){
  const navigate = useNavigate();
  const goCalc = useCallback(()=>{ globalTrack('cta_click',{place:'whyus',type:'calculator'}); navigate(createPageUrl('Calculator')); },[navigate]);
  const goContact = useCallback(()=>{ globalTrack('cta_click',{place:'whyus',type:'contact'}); navigate(createPageUrl('Contact')); },[navigate]);
  return (
    <main id="main-content">
      <Helmet>
        <title>Warum ZOE – Qualität, Prozess, Garantie</title>
        <meta name="description" content="Differenzierung & Vertrauen: Engineering, Prozessgeschwindigkeit, Monitoring & Garantien." />
      </Helmet>
      <SectionHero copy={{ hl: 'Warum ZOE Solar?', sub: 'Differenzierung in Technik, Transparenz und Service – nachvollziehbar & messbar.' }} onPrimary={goCalc} onSecondary={goContact} />
      <SectionPromises />
      <SectionDifferentiators />
      <SectionTeam />
      <SectionGuarantees />
      <SectionTrustWall />
      <SectionCTA onPrimary={goCalc} onSecondary={goContact} />
    </main>
  );
}
