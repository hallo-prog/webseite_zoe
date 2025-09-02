#!/usr/bin/env node
/**
 * Container Usage Audit
 * - Flags legacy container utility patterns to ensure migration to `pro-container`.
 * Patterns considered legacy:
 *   - max-w-7xl mx-auto (optionally followed by padding utilities)
 *   - px-4 sm:px-6 lg:px-8 combined in same class attribute
 * Exit code 1 if any legacy patterns are found.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(process.cwd(), 'src');
const LEGACY_REGEXES = [
  /max-w-7xl\s+mx-auto/g,
  /max-w-7xl[^"']*/g,
  /(max-w-7xl.*px-4.*sm:px-6.*lg:px-8)/g
];

let legacyHits = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) analyze(full);
  }
}

function analyze(file) {
  const txt = readFileSync(file, 'utf8');
  LEGACY_REGEXES.forEach(r => {
    let m;
    while ((m = r.exec(txt)) !== null) {
      legacyHits.push({ file, index: m.index, match: m[0] });
    }
  });
}

walk(ROOT);

if (legacyHits.length) {
  console.log('\n✗ Legacy Container Muster gefunden (sollten zu `pro-container` migriert werden):');
  legacyHits.forEach(h => {
    console.log(` - ${h.file}:${h.index} → ${h.match.substring(0,80)}`);
  });
  console.log(`\nInsgesamt ${legacyHits.length} Treffer.`);
  process.exit(1);
} else {
  console.log('✓ Container Audit: Keine Legacy-Muster gefunden.');
}
