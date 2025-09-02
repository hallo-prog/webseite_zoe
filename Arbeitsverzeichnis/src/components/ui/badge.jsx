import React from 'react';

// Badge Varianten orientiert an globalen .badge-* Klassen
const VARIANT_CLASS = {
  soft: 'badge badge-soft',
  outline: 'badge badge-outline',
  invert: 'badge badge-invert',
  amber: 'badge badge-amber',
  emerald: 'badge badge-emerald',
  ambient: 'badge badge-outline badge-outline-ambient'
};

const SIZE_CLASS = { md: '', xs: 'badge-xs' };

export function Badge({ variant = 'soft', size = 'md', className = '', children, as:Component='span', ...rest }) {
  const variantCls = VARIANT_CLASS[variant] || VARIANT_CLASS.soft;
  const sizeCls = SIZE_CLASS[size] || '';
  return (
    <Component className={`${variantCls} ${sizeCls} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}

export default Badge;
