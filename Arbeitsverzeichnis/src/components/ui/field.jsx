import React from 'react';
import { Label } from './label';

// Field wrapper: label, input slot, helper, error
export function Field({ id, label, required, hint, error, children, className='' }) {
  return (
    <div className={`field flex flex-col gap-1 ${className}`.trim()}>
      {label && <Label htmlFor={id} className="flex items-center gap-2">{label}{required && <span className="text-red-600 ml-0.5">*</span>}</Label>}
      {children}
      {hint && !error && <p className="text-[11px] text-neutral-500 leading-snug">{hint}</p>}
      {error && <p className="text-[11px] text-red-600 leading-snug" role="alert">{error}</p>}
    </div>
  );
}

export default Field;
