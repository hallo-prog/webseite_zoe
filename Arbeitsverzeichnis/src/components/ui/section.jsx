import React from 'react';

/**
 * Section wrapper to unify vertical rhythm, surface tone & container handling.
 * Props:
 *  - variant: default | warm | neutral | plain | gradient | gradientSoft | gridSlate | gradientAmber | gradientCyan
 *  - padding: none | tight | normal | loose
 *  - contain: boolean (wrap inner content with .pro-container)
 *  - bleed: allow disabling default max-width if contain=false
 */
export function Section({
  as:Comp='section',
  variant='default',
  padding='normal',
  contain=true,
  size='base', // base | narrow | wide | full
  className='',
  children,
  id,
  ...rest
}) {
  const padMap = {
    none: 'py-0',
    tight: 'py-12 md:py-14',
    normal: 'py-20',
    loose: 'py-28'
  };
  const tone = {
    default: '',
    warm: 'section-warm',
    neutral: 'bg-neutral-50',
    plain: 'bg-white',
    gradient: 'bg-gradient-to-b from-white to-neutral-50',
    gradientSoft: 'bg-gradient-to-b from-amber-50/40 to-white',
    gridSlate: 'bg-gray-50 bg-grid-slate',
    gradientAmber: 'bg-gradient-to-b from-amber-50/60 to-white',
    gradientCyan: 'bg-gradient-to-b from-cyan-50/40 via-white to-cyan-50/30'
  }[variant] || '';
  const base = ['section', padMap[padding], tone, className].filter(Boolean).join(' ');
  const sizeClass = {
    base: 'pro-container',
    narrow: 'pro-container max-w-4xl',
    wide: 'pro-container',
    full: 'pro-container max-w-none'
  }[size] || 'pro-container';
  const inner = contain ? <div className={sizeClass}>{children}</div> : children;
  return <Comp id={id} className={base} {...rest}>{inner}</Comp>;
}
