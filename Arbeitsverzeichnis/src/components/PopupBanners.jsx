import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, Calculator as Calc, FileCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTranslation } from 'react-i18next';

function useTrack() {
  return (event, payload = {}) => {
    try { if (typeof window !== 'undefined' && window.dataLayer) window.dataLayer.push({ event, ...payload }); } catch {}
  };
}

function Backdrop({ onClose, children, ariaTitle }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={ariaTitle} className="relative w-full sm:max-w-lg">
        {children}
      </div>
    </div>
  );
}

function EmailCapture({ topic, onDone }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const track = useTrack();
  const submit = async (e) => {
    e?.preventDefault?.();
    setErr('');
    if (!email || !email.includes('@')) { setErr(t('popup.common.email_invalid')); return; }
    try {
      setBusy(true);
      track('lead_submit', { placement: topic });
      const res = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Popup Lead', email, phone: 'n/a', message: topic, source: topic })
      });
      if (!res.ok) throw new Error('failed');
      setOk(true);
      onDone?.();
    } catch (e) {
      setErr(t('popup.common.submit_error'));
    } finally {
      setBusy(false);
    }
  };
  if (ok) return <div className="mt-3 text-sm rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-2">{t('popup.common.email_ok')}</div>;
  return (
    <form onSubmit={submit} className="mt-3 flex gap-2">
      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={t('popup.timed.email_placeholder')} className="bg-white" />
      <Button type="submit" disabled={busy} className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1">
        <Mail className="w-4 h-4"/>{busy ? t('popup.common.sending') : t('popup.common.receive')}
      </Button>
    </form>
  );
}

function TimedPopup({ delayMs = 8000, hiddenRoutes = [] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const track = useTrack();
  useEffect(() => {
    if (hiddenRoutes.some((r)=> location.pathname.toLowerCase().includes(r))) return;
    if (sessionStorage.getItem('zoe_popup_timed_shown') === '1') return;
    const id = setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem('zoe_popup_timed_shown', '1'); } catch {}
      track('popup_timed_shown');
    }, delayMs);
    return () => clearTimeout(id);
  }, [delayMs, location.pathname]);
  if (!open) return null;
  return (
    <Backdrop onClose={() => setOpen(false)} ariaTitle={t('popup.timed.title')}>
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl p-5 sm:p-6">
        <button aria-label="Schließen" onClick={()=>setOpen(false)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5"/></button>
        <div className="flex items-start gap-4">
          <div className="hidden sm:block text-3xl" aria-hidden>📘</div>
          <div>
            <div className="text-lg font-extrabold text-gray-900">{t('popup.timed.title')}</div>
            <ul className="mt-2 text-base sm:text-lg text-gray-700 list-disc pl-5 space-y-1">
              <li>{t('popup.timed.l1')}</li>
              <li>{t('popup.timed.l2')}</li>
              <li>{t('popup.timed.l3')}</li>
            </ul>
            <EmailCapture topic="popup_timed" onDone={() => track('popup_timed_submit')} />
            <div className="mt-3 text-[11px] text-gray-500">{t('popup.timed.email_help')}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to={createPageUrl('Calculator')} className="inline-flex"><Button className="bg-gray-900 hover:bg-black text-white"><Calc className="w-4 h-4 mr-1"/>{t('popup.timed.cta_calc')}</Button></Link>
              <Button variant="outline" onClick={()=>setOpen(false)} className="border-gray-300">{t('popup.timed.btn_later')}</Button>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

function ExitIntentPopup({ hiddenRoutes = [] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [variant] = useState(()=> Math.random() < 0.5 ? 'base' : 'incentive');
  const track = useTrack();
  const location = useLocation();
  const triggered = useRef(false);
  useEffect(() => { triggered.current = false; }, [location.pathname]);
  useEffect(() => {
    if (hiddenRoutes.some((r)=> location.pathname.toLowerCase().includes(r))) return;
    const onMouseOut = (e) => {
      if (triggered.current) return;
      if (!e.relatedTarget && e.clientY <= 0) {
        triggered.current = true;
        if (sessionStorage.getItem('zoe_popup_exit_shown') === '1') return;
        setOpen(true);
        try { sessionStorage.setItem('zoe_popup_exit_shown', '1'); } catch {}
  track('popup_exit_shown',{ variant });
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [location.pathname]);
  if (!open) return null;
  return (
    <Backdrop onClose={() => setOpen(false)} ariaTitle={t('popup.exit.aria_title')}>
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl p-5 sm:p-6">
        <button aria-label="Schließen" onClick={()=>setOpen(false)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5"/></button>
        <div className="flex items-start gap-4">
          <div className="hidden sm:block text-3xl" aria-hidden>🧮</div>
          <div>
            {variant==='base' && <div className="space-y-2"><div className="text-lg font-extrabold text-gray-900">{t('popup.exit.title_base')}</div><div className="mt-1 text-sm text-gray-700">{t('popup.exit.desc_base')}</div></div>}
            {variant==='incentive' && <div className="space-y-2"><div className="text-lg font-extrabold text-gray-900">{t('popup.exit.title_incentive')}</div><div className="mt-1 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('popup.exit.desc_incentive') }} /></div>}
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to={createPageUrl('Calculator')} className="inline-flex" onClick={()=>track('popup_exit_click', { action: 'calculator', variant })}><Button className="bg-gray-900 hover:bg-black text-white"><Calc className="w-4 h-4 mr-1"/>{t('popup.exit.btn_calc')}</Button></Link>
              {variant==='incentive' && <Button onClick={()=>{ track('popup_exit_incentive_click'); setOpen(false); }} className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1"><FileCheck className="w-4 h-4"/>{t('popup.exit.btn_incentive')}</Button>}
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-900">{t('popup.exit.email_intro')}</div>
              <EmailCapture topic="popup_exit" onDone={() => track('popup_exit_submit')} />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default function PopupBanners() {
  // Nicht auf Kontakt/Impressum/Privacy nerven
  const hidden = ['contact', 'imprint', 'privacy'];
  return (
    <>
      <TimedPopup delayMs={8000} hiddenRoutes={hidden} />
      <ExitIntentPopup hiddenRoutes={hidden} />
    </>
  );
}
