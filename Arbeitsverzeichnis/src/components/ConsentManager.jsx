import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Lightweight Consent Manager: stores consent in localStorage & conditionally loads scripts
export default function ConsentManager() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(null); // null | true | false

  useEffect(() => {
    const stored = localStorage.getItem('zoe_consent');
    if (stored === null) {
      // delay a bit to avoid CLS
      setTimeout(() => setOpen(true), 1200);
    } else {
      const val = stored === '1';
      setConsent(val);
      if (val) loadScripts();
    }
  }, []);

  function decide(val) {
    setConsent(val);
    localStorage.setItem('zoe_consent', val ? '1' : '0');
    setOpen(false);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: val ? 'consent_accept' : 'consent_decline' });
    if (val) loadScripts();
  }

  function loadScripts() {
    if (window.__zoeScriptsLoaded) return;
    window.__zoeScriptsLoaded = true;
    const head = document.head;
    const gtmId = import.meta.env.VITE_GTM_ID;
    if (gtmId) { const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`; head.appendChild(s); }
    const gaId = import.meta.env.VITE_GA_ID;
    if (gaId) {
      const s1 = document.createElement('script'); s1.async = true; s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`; head.appendChild(s1);
      const s2 = document.createElement('script');
      s2.innerHTML = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${gaId}',{send_page_view:true});`;
      head.appendChild(s2);
    }
    const fbId = import.meta.env.VITE_FB_PIXEL_ID;
    if (fbId && !window.fbq) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n; n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      try { window.fbq('init', fbId); window.fbq('track', 'PageView'); } catch {}
    }
    const liId = import.meta.env.VITE_LI_PID;
    if (liId && !window.lintrk) {
      const s = document.createElement('script'); s.type='text/javascript'; s.innerHTML = `_linkedin_partner_id = "${liId}";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];window._linkedin_data_partner_ids.push(_linkedin_partner_id);`; head.appendChild(s);
      const s2 = document.createElement('script'); s2.type='text/javascript'; s2.async=true; s2.src='https://snap.licdn.com/li.lms-analytics/insight.min.js'; head.appendChild(s2);
    }
  }

  if (!open || consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto rounded-2xl border border-gray-200 shadow-lg bg-white/95 backdrop-blur px-5 py-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-50 via-white to-amber-50" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">i</span>
          {t('consent.title')}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {t('consent.text')}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="plain" onClick={() => decide(true)} className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            {t('consent.accept')}
          </Button>
          <Button variant="plain" onClick={() => decide(false)} className="inline-flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
            {t('consent.decline')}
          </Button>
        </div>
      </div>
    </div>
  );
}
