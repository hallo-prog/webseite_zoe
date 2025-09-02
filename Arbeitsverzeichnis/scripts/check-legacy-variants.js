#!/usr/bin/env node
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Simple recursive file list
function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(d => {
    const p = join(dir, d.name);
    if (d.isDirectory()) return listFiles(p);
    if (/\.(jsx?|tsx?)$/.test(d.name)) return [p];
    return [];
  });
}

const ROOT = join(process.cwd(), 'src');
const files = listFiles(ROOT);
const legacyPatterns = [
  /<Pill[^>]*variant="(light|dark|custom)"/g,
  /<Badge[^>]*variant="(amber|emerald|ambient|secondary)"/g
];

let errors = 0;
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  // Kommentare entfernen (einfache Heuristik) um False Positives in Doku-Kommentaren zu vermeiden
  const stripped = txt.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\n)\s*\/\/.*$/gm, '');
  legacyPatterns.forEach(rx => {
    if (rx.test(stripped)) {
      console.error(`[legacy-variant] ${f} enthält veraltete Pill/Badge Varianten.`);
      errors++;
    }
  });
}

if (errors) {
  console.error(`\n✖ Legacy Varianten gefunden (${errors}). Bitte auf neues API (variant + color) migrieren.`);
  process.exit(1);
} else {
  console.log('✓ Keine Legacy Pill/Badge Varianten gefunden.');
}