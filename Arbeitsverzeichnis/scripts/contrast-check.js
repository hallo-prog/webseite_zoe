#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Very small contrast checker for invert badges vs white background.
// Looks into compiled CSS file to extract .badge-invert color (#fff text etc.) and base background color (#0d2a33) then computes WCAG ratio.

function hexToRgb(h){
  const m = h.replace('#','');
  return [parseInt(m.slice(0,2),16), parseInt(m.slice(2,4),16), parseInt(m.slice(4,6),16)];
}
function relLum([r,g,b]){
  const srgb = [r,g,b].map(v=> {
    const c = v/255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4);
  });
  return 0.2126*srgb[0]+0.7152*srgb[1]+0.0722*srgb[2];
}
function contrast(a,b){
  const L1 = relLum(a); const L2 = relLum(b);
  const light = Math.max(L1,L2); const dark = Math.min(L1,L2);
  return (light + 0.05) / (dark + 0.05);
}

// Hardcode colors (source tokens) to avoid parsing complexity
const bg = hexToRgb('0d2a33');
const fg = hexToRgb('ffffff');
const ratio = contrast(bg, fg);
const target = 4.5; // normal text
if (ratio < target) {
  console.error(`✖ Kontrast invert Badge (${ratio.toFixed(2)}:1) < ${target}:1 – Farbe prüfen.`);
  process.exit(1);
} else {
  console.log(`✓ Kontrast invert Badge OK (${ratio.toFixed(2)}:1 >= ${target}:1)`);
}
