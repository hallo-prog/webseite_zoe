import React from 'react';
import { trackVariant } from '@/utils/tracking';

export default function MetricsBar({ metrics=[] }) {
  const list = metrics.length ? metrics : [
    { label:'€ eingespart pro Jahr', value:'1.200–1.500', icon:'💰' },
    { label:'Jahre Erfahrung', value:'15+', icon:'🏆' },
    { label:'Kundenzufriedenheit', value:'98%', icon:'⭐' },
    { label:'Leistungsgarantie', value:'25 Jahre', icon:'🛡️' },
  ];
  React.useEffect(()=> trackVariant('metrics_bar_view',{ count:list.length }),[list.length]);
  return (
    <div className="w-full border-y border-neutral-150 bg-white/60 backdrop-blur">
      <div className="pro-container py-8 grid gap-5 md:grid-cols-4">
        {list.map((m,i)=> (
          <div key={i} className="flex flex-col gap-2 text-center">
            <div className="text-xl mb-1">{m.icon}</div>
            <div className="text-xl font-semibold tabular-nums tracking-tight text-neutral-900">{m.value}</div>
            <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
