import React from 'react';

// Unified Heading component: level (1-6), variant controls visual style independent from semantic level
// Props: level (1..6), variant (display|display-2|h1|h2|h3|h4|lead|eyebrow), align, className, children
const VARIANT_MAP = {
  'display': 'display-1',
  'display-2': 'display-2',
  'h1': 'heading-1',
  'h2': 'heading-2',
  'h3': 'heading-3',
  'h4': 'text-2xl font-semibold tracking-tight',
  'lead': 'lead',
  'eyebrow': 'text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600'
};

export function Heading({ level = 2, variant, align, className = '', children, ...rest }) {
  const Tag = `h${Math.min(6, Math.max(1, level))}`;
  const vis = VARIANT_MAP[variant || `h${level}`] || '';
  const alignCls = align ? `text-${align}` : '';
  return <Tag className={`${vis} ${alignCls} ${className}`.trim()} {...rest}>{children}</Tag>;
}

export default Heading;
