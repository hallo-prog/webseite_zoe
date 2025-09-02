import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_COLUMNS, FOOTER_META_LINKS } from '@/config/siteNav';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { trackFooter } from '@/utils/tracking';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

function FooterMegaPanel({ title, kpi, links }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="group">
      <Button
        variant="plain"
        type="button"
        onClick={() => setOpen(o=>!o)}
        className="footer-heading w-full flex items-center justify-between md:justify-start md:cursor-default"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="md:hidden ml-2 text-neutral-400 group-hover:text-neutral-600" aria-hidden>{open ? '−' : '+'}</span>
      </Button>
      {kpi && <div className="mt-1 text-[11px] uppercase tracking-wide text-neutral-400 font-medium">{kpi}</div>}
      <ul className={`footer-links ${open ? 'block' : 'hidden md:block'}`}>
        {links.map(l => (
          <li key={l.label}>
            <Link to={createPageUrl(l.to)} onClick={()=>trackFooter(l.label)}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white/95 backdrop-blur-sm section-warm" role="contentinfo">
  <div className="pro-container py-14">
        <div className="grid gap-10 lg:gap-14 md:grid-cols-5">
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <img src="/Logo-ZOE.png" alt="ZOE" width="34" height="34" className="rounded" />
              <div className="font-semibold tracking-tight text-neutral-800 text-lg">ZOE Solar</div>
            </div>
            <p className="text-sm-token text-neutral-600 leading-relaxed max-w-sm">Konservativ gerechnete Solarlösungen mit klaren Zahlen, Festpreis & Monitoring – damit sich Ihre Investition planbar rechnet.</p>
            <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-300">Ø Payback 9–11 J.</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-300">96% Termintreue</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-300">Festpreis-Zusage</span>
            </div>
            <div className="flex gap-3 pt-1">
              <a href="#" aria-label="LinkedIn" className="social-icon focus:outline-none focus-visible:focus-ring"><Linkedin className="w-4 h-4"/></a>
              <a href="#" aria-label="Twitter" className="social-icon focus:outline-none focus-visible:focus-ring"><Twitter className="w-4 h-4"/></a>
              <a href="#" aria-label="Instagram" className="social-icon focus:outline-none focus-visible:focus-ring"><Instagram className="w-4 h-4"/></a>
              <a href="#" aria-label="Facebook" className="social-icon focus:outline-none focus-visible:focus-ring"><Facebook className="w-4 h-4"/></a>
            </div>
          </div>
          {FOOTER_COLUMNS.map(col => (
            <FooterMegaPanel key={col.type} title={col.title} kpi={col.kpi} links={col.links} />
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="text-2xs text-neutral-500 flex flex-wrap gap-x-4 gap-y-2">
            {FOOTER_META_LINKS.map(m => (
              <Link key={m.label} to={createPageUrl(m.to)} onClick={()=>trackFooter(m.label)} className="hover:text-neutral-700">{m.label}</Link>
            ))}
            <span>&copy; {new Date().getFullYear()} ZOE Solar GmbH</span>
            <span>Alle Angaben ohne Gewähr – Berechnungen konservativ.</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:+49301234567" onClick={()=>trackFooter('Telefon')} className="nav-item border border-neutral-300 focus:outline-none focus-visible:focus-ring">030 1234567</a>
            <Button as={Link} to={createPageUrl('Calculator')} onClick={()=>trackFooter('Analyse starten')} variant="outline" size="md">Analyse starten</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
