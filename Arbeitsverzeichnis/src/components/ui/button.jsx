import React from 'react';

// Vereinheitlichte Button-Komponente, die die bestehenden globalen CSS Utility-Klassen (btn-*) nutzt.
// Ziel: Alle CTAs laufen perspektivisch über diese Schnittstelle, damit Variant-Änderungen zentral möglich sind.
// Props: variant (primary|outline|secondary|ghost|destructive), size (sm|md|lg|xl), loading, iconStart, iconEnd, as (Elementtyp)

const VARIANT_CLASS = {
  primary: 'btn-primary',
  outline: 'btn-outline-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  destructive: 'btn-destructive'
};

const SIZE_CLASS = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-lg px-8 py-4 text-base' // xl nutzt lg Basis + größere Padding-Erweiterung
};

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  iconStart,
  iconEnd,
  as: Component = 'button',
  children,
  ...rest
}) {
  const variantCls = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;
  const sizeCls = SIZE_CLASS[size] || '';
  const loadingCls = loading ? 'btn-loading' : '';
  const isDisabled = disabled || loading;
  return (
    <Component
      className={`${variantCls} ${sizeCls} ${loadingCls} ${className}`.trim()}
      disabled={isDisabled}
      {...rest}
    >
      {iconStart && <span className="btn-icon-start flex items-center">{iconStart}</span>}
      <span className="inline-flex items-center gap-2">{children}</span>
      {iconEnd && <span className="btn-icon-end flex items-center">{iconEnd}</span>}
    </Component>
  );
}

export default Button;
