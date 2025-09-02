import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function LeadForm({ persona, onTracked }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState(1); // Progressive Profiling: 1 = Minimal (Commitment), 2 = Vollständige Daten
  const [plz, setPlz] = useState('');
  const emailRegex = /^(?:[a-zA-Z0-9_'^&+%!-]+(?:\.[a-zA-Z0-9_'^&+%!-]+)*|".+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  const phoneRegex = /^(?:\+?\d{2,3}[ \-]?)?(?:0)?[1-9]\d{1,4}[ \-]?\d{2,4}(?:[ \-]?\d{2,4})$/;
  const minimalOk = emailRegex.test(email);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (stage === 1) {
      if (!minimalOk) { setError('Bitte gültige E‑Mail eingeben.'); return; }
      onTracked?.('lead_step1', { placement: 'cta_form', persona });
      setStage(2);
      return;
    }
    if (!name || !emailRegex.test(email) || !phoneRegex.test(phone)) { setError('Bitte Name, gültige E‑Mail & Telefon (Format prüfen) angeben.'); return; }
  try {
      setBusy(true);
      onTracked?.('lead_submit', { placement: 'cta_form', persona });
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, message, plz, persona, source: 'cta_section', utm: (typeof window!== 'undefined' ? ( () => { try { const u = new URLSearchParams(window.location.search); const o={}; ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{const v=u.get(k); if(v) o[k]=v;}); return o; } catch { return {}; } })() : {}) })
      });
      if (!res.ok) throw new Error('Request failed');
      setDone(true);
      try { if (typeof window !== 'undefined' && window.dataLayer) window.dataLayer.push({ event: 'lead_success', persona, placement: 'cta_form' }); } catch {}
    } catch (e) {
      setError('Senden fehlgeschlagen. Bitte später erneut versuchen.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mt-10 max-w-2xl mx-auto bg-white text-amber-800 rounded-2xl p-6 text-left">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600"/>
          <div>
            <p className="font-semibold">Danke! Wir melden uns schnellstmöglich.</p>
            <p className="text-sm mt-1 text-amber-900">Unser Team ruft Sie in der Regel binnen 24 Stunden zurück.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10 max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-7 text-left" data-form-stage={stage}>
      <p className="font-semibold mb-4 text-lg">
        {stage===1 ? 'Kurzer Schritt zuerst – wir senden Ihre konservative Spanne & optional das PDF. (Nur E‑Mail nötig)' : 'Optional ergänzen: So können wir gezielt & ohne Verkaufsdruck anrufen.'}
      </p>
      {error && <div className="mb-4 text-sm bg-red-50 text-red-700 rounded-md px-3 py-2">{error}</div>}
      {stage===1 && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="lead-email" className="text-white/90 text-base">E‑Mail*</Label>
            <Input id="lead-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} aria-required placeholder="max@mail.de" className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
          </div>
            <div>
              <Label htmlFor="lead-plz" className="text-white/90 text-base">PLZ (optional)</Label>
              <Input id="lead-plz" value={plz} onChange={(e)=>setPlz(e.target.value)} placeholder="12345" className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
            </div>
        </div>
      )}
      {stage===2 && (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lead-name" className="text-white/90 text-base">Name*</Label>
              <Input id="lead-name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Max Mustermann" className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
            </div>
            <div>
              <Label htmlFor="lead-email2" className="text-white/90 text-base">E‑Mail*</Label>
              <Input id="lead-email2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="max@mail.de" className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
            </div>
            <div>
              <Label htmlFor="lead-phone" className="text-white/90 text-base">Telefon*</Label>
              <Input id="lead-phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="0151 2345678" className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="lead-msg" className="text-white/90 text-base">Kurz Ihr Ziel (optional)</Label>
            <Input id="lead-msg" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={persona==='privat' ? 'z.B. Einfamilienhaus, 5 kWp, Speicher geplant' : 'z.B. Halle, 50 kWp, Lastspitzen senken'} className="mt-1 bg-white text-amber-900 placeholder:text-amber-700/60 h-11 text-base" />
          </div>
        </>
      )}
      <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-white/85 max-w-sm">
          {stage===1 ? '100% kostenlos • Kein Verkaufsdruck • Sie können später Daten ergänzen' : 'Mit Klick stimmen Sie der Verarbeitung gemäß Datenschutz zu. Wir melden uns nur zur Beratung.'}
        </p>
        <Button type="submit" disabled={busy} className="bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 text-base">
          {busy ? 'Senden…' : stage===1 ? 'Weiter' : 'Rückruf anfordern'}
        </Button>
      </div>
    </form>
  );
}
