#!/usr/bin/env node
// Extended contrast check for Badge & Pill + primary/outline buttons.
// Ziel: Sicherstellen, dass alle im Designsystem definierten Text/Farbflächen-Kombinationen WCAG AA (4.5:1) erfüllen.
// NOTE: Verwendet Tailwind Basis-Paletten (Hex fest kodiert) – falls Palette angepasst wird, hier aktualisieren.

const PAIRS = [
  // Badges / Pills soft variants
  { id: 'soft-amber', fg: '#92400e', bg: '#fffbeb' },
  { id: 'soft-emerald', fg: '#065f46', bg: '#ecfdf5' },
  { id: 'soft-info', fg: '#1e3a8a', bg: '#eff6ff' },
  { id: 'soft-warning', fg: '#c2410c', bg: '#fff7ed' },
  { id: 'soft-danger', fg: '#b91c1c', bg: '#fef2f2' },
  { id: 'soft-purple', fg: '#6d28d9', bg: '#faf5ff' },
  { id: 'soft-neutral', fg: '#1f2937', bg: '#ffffff' }, // neutral soft Badge
  // Invert variants (dark bg, white text)
  // Adjusted emerald darkened from #059669 to #047857 for contrast >=4.5
  { id: 'invert-emerald', fg: '#ffffff', bg: '#047857' },
  { id: 'invert-info', fg: '#ffffff', bg: '#2563eb' },
  // Adjusted warning darkened from #ea580c to #c2410c for contrast
  { id: 'invert-warning', fg: '#ffffff', bg: '#c2410c' },
  { id: 'invert-danger', fg: '#ffffff', bg: '#dc2626' },
  { id: 'invert-purple', fg: '#ffffff', bg: '#7e22ce' },
  { id: 'invert-neutral', fg: '#ffffff', bg: '#111827' },
  // Outline variants (text vs white background)
  { id: 'outline-amber', fg: '#92400e', bg: '#ffffff' },
  { id: 'outline-emerald', fg: '#065f46', bg: '#ffffff' },
  { id: 'outline-info', fg: '#1d4ed8', bg: '#ffffff' },
  { id: 'outline-warning', fg: '#c2410c', bg: '#ffffff' },
  { id: 'outline-danger', fg: '#b91c1c', bg: '#ffffff' },
  { id: 'outline-purple', fg: '#6d28d9', bg: '#ffffff' },
  { id: 'outline-neutral', fg: '#374151', bg: '#ffffff' },
  // Buttons primary / outline (assuming primary bg vs white text, outline text vs white bg)
  { id: 'btn-primary', fg: '#ffffff', bg: '#0f766e' }, // emerald 700-ish
  { id: 'btn-outline-primary', fg: '#0f766e', bg: '#ffffff' }
];

function hexToRgb(h){ const m = h.replace('#',''); return [parseInt(m.slice(0,2),16), parseInt(m.slice(2,4),16), parseInt(m.slice(4,6),16)]; }
function relLum([r,g,b]){ return [r,g,b].map(v=>{const c=v/255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);})
  .reduce((acc,c,i,arr)=> acc + [0.2126,0.7152,0.0722][i]*c,0); }
function contrast(fg,bg){ const L1=relLum(hexToRgb(fg)); const L2=relLum(hexToRgb(bg)); const light=Math.max(L1,L2); const dark=Math.min(L1,L2); return (light+0.05)/(dark+0.05); }

let fails = 0;
const MIN = 4.5;
for (const p of PAIRS){
  const ratio = contrast(p.fg, p.bg);
  if (ratio < MIN){
    console.error(`✖ ${p.id} ratio ${ratio.toFixed(2)}:1 < ${MIN}:1 (${p.fg} on ${p.bg})`);
    fails++;
  } else {
    console.log(`✓ ${p.id} ${ratio.toFixed(2)}:1`);
  }
}

if (fails){
  console.error(`\n✖ Contrast check extended failed (${fails} issues).`);
  process.exit(1);
} else {
  console.log('\n✓ All extended contrast pairs pass.');
}
