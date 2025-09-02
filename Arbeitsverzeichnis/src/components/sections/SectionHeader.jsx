import React from 'react';

/** Reusable standardized section header
 * Props:
 * - eyebrow?: string
 * - title: string
 * - subtitle?: string
 * - align: 'center' | 'left'
 * - kickerProps?: extra class names
 */
export function SectionHeader({ eyebrow, title, subtitle, align='center', className='' }) {
  return (
    <div className={`max-w-2xl ${align==='center'?'mx-auto text-center':'text-left'} ${className}`}> 
      {eyebrow && (
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide">{eyebrow}</div>
      )}
      <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      {subtitle && <p className="mt-3 text-xl text-gray-700 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
