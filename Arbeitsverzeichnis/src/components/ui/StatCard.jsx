import React from 'react';
import { Card } from '@/components/ui/card';
import { Metric } from '@/components/ui/metric';

/**
 * StatCard: Einheitliche Darstellung einer Kennzahl.
 * Props:
 *  - icon: ReactNode (optional)
 *  - value: string | number
 *  - label: string
 *  - tone: 'neutral' | 'emerald' | 'blue' | 'amber' | 'indigo'
 *  - dense: boolean (kompakter Stil)
 */
export function StatCard({ icon, value, label, tone='neutral', dense=false, align='center', animate=false, format }) {
  const toneMap = { neutral: 'text-neutral-900', emerald: 'text-emerald-600', blue: 'text-blue-600', amber: 'text-amber-500', indigo: 'text-indigo-600' };
  const valueCls = `${dense ? 'text-lg' : 'text-2xl'} font-semibold ${toneMap[tone] || toneMap.neutral}`;
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(value);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(()=>{
    if(!animate) return;
    const el = ref.current; if(!el) return;
    const raw = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.,+-]/g,'').replace(',','.'));
    if(isNaN(raw)) return; // fallback: keine Animation bei nicht-numerisch
    let obs;
    function start(){
      const duration = 900; const startTs = performance.now(); const from = 0; const to = raw;
      setAnimating(true);
      function step(ts){
        const p = Math.min(1,(ts-startTs)/duration);
        const eased = p<.5 ? 2*p*p : -1+(4-2*p)*p; // easeInOutQuad
        const cur = from + (to-from)*eased;
        const formatted = format ? format(cur,to) : toStringLikeSource(cur, value);
        setDisplay(formatted);
        if(p<1) requestAnimationFrame(step); else setTimeout(()=>setAnimating(false),80);
      }
      requestAnimationFrame(step);
    }
    obs = new IntersectionObserver(([entry])=>{ if(entry.isIntersecting){ start(); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return ()=> obs && obs.disconnect();
  },[animate, value, format]);

  return (
    <Card ref={ref} variant="subtle" elevation={dense ? 'xs' : 'sm'} className={`${dense ? 'p-4' : 'p-5'} text-${align} space-y-1`}> 
      <Metric value={display} label={label} size={dense ? 'sm' : 'md'} className={align==='center' ? 'items-center' : ''} />
      {icon && <div className={`absolute top-3 right-3 opacity-40 pointer-events-none`}>{icon}</div>}
    </Card>
  );
}

function toStringLikeSource(cur, source){
  const isInt = /^[^0-9]*[0-9]+$/.test(String(source).replace(/[^0-9]/g,''));
  const num = isInt ? Math.round(cur) : cur;
  let out = isInt ? String(num) : num.toFixed(1);
  // Tausendertrennungen grob (de-DE)
  out = out.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Ersetze Dezimalpunkt durch Komma falls vorhanden und Quelle mit Komma
  if(/,/.test(String(source))) out = out.replace(/\.(\d)/, ',$1');
  // Suffixe aus Quelle extrahieren
  const suffixMatch = String(source).match(/[^0-9.,]+$/);
  if(suffixMatch) out += suffixMatch[0];
  return out;
}

export default StatCard;
