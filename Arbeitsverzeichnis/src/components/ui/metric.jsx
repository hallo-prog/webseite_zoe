import React from 'react';

// Metric component standardizes value + label presentation.
// Props: value, label, suffix, icon, subtle, orientation
export function Metric({ value, label, suffix='', icon, className='', orientation='vertical', size='md' }) {
  const sizeMap = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  const valueCls = sizeMap[size] || sizeMap.md;
  return (
    <div className={`metric flex ${orientation==='horizontal' ? 'items-baseline gap-3' : 'flex-col'} ${className}`.trim()}>
      <div className={`font-semibold tracking-tight tabular-nums ${valueCls} text-neutral-900 flex items-center gap-2`}>
        {icon && <span className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">{icon}</span>}
        <span>{value}{suffix && <span className="text-neutral-500 ml-0.5 tabular-nums">{suffix}</span>}</span>
      </div>
      {label && <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 mt-1">{label}</div>}
    </div>
  );
}

export default Metric;
