#!/usr/bin/env node
/**
 * UI Audit Script (Phase 5.1)
 * Scans the codebase (Arbeitsverzeichnis/src) for:
 *  - Component inventory (unique component names by file)
 *  - Typography usage (raw h1..h6 tags, Heading component usage, inline font sizes)
 *  - Color drift (raw hex / rgb(a) values)
 *  - Spacing drift (arbitrary Tailwind spacing utilities e.g. mt-[13px])
 *  - Shadow & Radius variations (non-token arbitrary utilities)
 * Outputs a markdown + json report under docs/ui-audit-latest.*
 */
const fs = require('fs');
const path = require('path');

// Resolve repository root (one level up if current working dir is /Arbeitsverzeichnis)
const cwd = process.cwd();
const isInsideArbeits = path.basename(cwd) === 'Arbeitsverzeichnis';
const repoRoot = isInsideArbeits ? path.dirname(cwd) : cwd;
const baseDir = path.join(repoRoot, 'Arbeitsverzeichnis', 'src');
const exts = ['.js', '.jsx', '.ts', '.tsx'];

function listFiles(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(listFiles(p));
    else if (exts.includes(path.extname(e.name))) out.push(p);
  }
  return out;
}

function read(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }

const files = fs.existsSync(baseDir) ? listFiles(baseDir) : [];

const componentRegex = /export\s+(?:default\s+)?function\s+([A-Z][A-Za-z0-9_]*)|const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(/g;
const headingTagRegex = /<h([1-6])([^>]*?)>/g;
const headingCompRegex = /<(Heading)(\s+[^>]*?)?>/g;
const inlineFontSizeRegex = /style={{[^}]*fontSize:\s*['"]?([0-9.]+px)['"]?[^}]*}}/g;
const colorHexRegex = /#[0-9a-fA-F]{3,8}\b/g;
const colorRgbRegex = /rgb[a]?\([^)]*\)/g;
const arbitrarySpacingRegex = /(?:m|p)[trblxy]?-[\[](.*?)[\]]/g; // mt-[13px]
const arbitraryShadowRegex = /shadow-[\[](.*?)[\]]/g;
const arbitraryRadiusRegex = /rounded-[\[](.*?)[\]]/g;

// Allow-list (tokens) for colors we don't flag as drift (add common ones)
const allowedHex = new Set([
  '#0d2a33','#12b3c7','#0fa5b3','#18b364','#128a4d','#d7f5e6','#eefaf3','#dc2626','#d6a500',
  '#f5f7f9','#e9edf0','#dde3e7','#d1d9de','#b8c3c9','#96a3ab','#6d7c85','#516067','#304048','#1d2d34','#0d1b21'
]);

const data = {
  generatedAt: new Date().toISOString(),
  baseDir,
  totals: { files: files.length },
  components: [],
  typography: { rawHeadings: {}, headingComponentUses: 0, inlineFontSizes: [] },
  colors: { hex: {}, rgb: {} },
  colorDrift: { hex: [], rgb: [] },
  spacingDrift: [],
  shadowArbitrary: [],
  radiusArbitrary: []
};

for (const f of files) {
  const rel = path.relative(baseDir, f);
  const content = read(f);

  // Components
  let m; componentRegex.lastIndex = 0;
  while ((m = componentRegex.exec(content))) {
    const name = m[1] || m[2];
    if (name) data.components.push({ name, file: rel });
  }

  // Headings raw
  headingTagRegex.lastIndex = 0;
  while ((m = headingTagRegex.exec(content))) {
    const lvl = m[1];
    data.typography.rawHeadings[lvl] = (data.typography.rawHeadings[lvl] || 0) + 1;
  }
  // Heading component usage
  headingCompRegex.lastIndex = 0;
  while ((m = headingCompRegex.exec(content))) data.typography.headingComponentUses++;

  // Inline font sizes
  inlineFontSizeRegex.lastIndex = 0;
  while ((m = inlineFontSizeRegex.exec(content))) data.typography.inlineFontSizes.push({ file: rel, value: m[1] });

  // Colors
  colorHexRegex.lastIndex = 0;
  let h; while ((h = colorHexRegex.exec(content))) {
    const val = h[0].toLowerCase();
    data.colors.hex[val] = (data.colors.hex[val] || 0) + 1;
  }
  colorRgbRegex.lastIndex = 0;
  let r; while ((r = colorRgbRegex.exec(content))) {
    const val = r[0];
    data.colors.rgb[val] = (data.colors.rgb[val] || 0) + 1;
  }

  // Spacing drift (arbitrary)
  arbitrarySpacingRegex.lastIndex = 0; let s;
  while ((s = arbitrarySpacingRegex.exec(content))) data.spacingDrift.push({ file: rel, value: s[0] });

  arbitraryShadowRegex.lastIndex = 0; let sh;
  while ((sh = arbitraryShadowRegex.exec(content))) data.shadowArbitrary.push({ file: rel, value: sh[0] });

  arbitraryRadiusRegex.lastIndex = 0; let ra;
  while ((ra = arbitraryRadiusRegex.exec(content))) data.radiusArbitrary.push({ file: rel, value: ra[0] });
}

// Compute color drift (exclude allowed + those defined as CSS variable references)
data.colorDrift.hex = Object.entries(data.colors.hex)
  .filter(([hex]) => !allowedHex.has(hex))
  .map(([hex,count]) => ({ hex, count }))
  .sort((a,b) => b.count - a.count);

data.colorDrift.rgb = Object.entries(data.colors.rgb)
  .map(([rgb,count]) => ({ rgb, count }))
  .sort((a,b) => b.count - a.count);

// Deduplicate component list by name+file
const seenComp = new Set();
data.components = data.components.filter(c => { const key = c.name+'@'+c.file; if (seenComp.has(key)) return false; seenComp.add(key); return true; });

// Sort for readability
data.components.sort((a,b) => a.name.localeCompare(b.name));

// Write JSON
const docsDir = path.join(repoRoot, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
const outJson = path.join(docsDir, 'ui-audit-latest.json');
fs.writeFileSync(outJson, JSON.stringify(data, null, 2));

// Markdown summary
function list(items, keyMap) { return items.map(i => `| ${keyMap(i).join(' | ')} |`).join('\n'); }

const md = [];
md.push('# UI Audit Report (Phase 5.1)');
md.push('Generiert: '+data.generatedAt+'\n');
md.push('## Komponenten (Anzahl '+data.components.length+')');
md.push('| Name | Datei |');
md.push('|------|-------|');
md.push(list(data.components, c => [c.name, c.file]) || '');

md.push('\n## Typografie Nutzung');
md.push('Rohes h1..h6 Vorkommen: '+JSON.stringify(data.typography.rawHeadings));
md.push('Heading Komponente Verwendungen: '+data.typography.headingComponentUses);
if (data.typography.inlineFontSizes.length) {
  md.push('\n### Inline Font Sizes');
  md.push('| Wert | Datei |');
  md.push('|------|-------|');
  md.push(list(data.typography.inlineFontSizes, r => [r.value, r.file]));
} else md.push('\nKeine Inline fontSize Styles gefunden.');

md.push('\n## Farbwerte (alle)');
md.push('Hex total: '+Object.keys(data.colors.hex).length+' | RGB total: '+Object.keys(data.colors.rgb).length);
if (data.colorDrift.hex.length) {
  md.push('\n### Color Drift (Hex außerhalb Allow-List)');
  md.push('| Hex | Count |');
  md.push('|-----|-------|');
  md.push(list(data.colorDrift.hex, h => [h.hex, String(h.count)]));
} else md.push('\nKeine ungewöhnlichen Hex Werte (außerhalb Allow-List).');

if (data.colorDrift.rgb.length) {
  md.push('\n### RGB / RGBA Werte');
  md.push('| Wert | Count |');
  md.push('|------|-------|');
  md.push(list(data.colorDrift.rgb, r => [r.rgb, String(r.count)]));
}

md.push('\n## Spacing Drift (arbitrary Werte)');
if (data.spacingDrift.length) {
  md.push('| Klasse | Datei |');
  md.push('|--------|-------|');
  md.push(list(data.spacingDrift, s => [s.value, s.file]));
} else md.push('Keine gefunden.');

md.push('\n## Shadow (arbitrary)');
if (data.shadowArbitrary.length) {
  md.push('| Klasse | Datei |');
  md.push('|--------|-------|');
  md.push(list(data.shadowArbitrary, s => [s.value, s.file]));
} else md.push('Keine gefunden.');

md.push('\n## Radius (arbitrary)');
if (data.radiusArbitrary.length) {
  md.push('| Klasse | Datei |');
  md.push('|--------|-------|');
  md.push(list(data.radiusArbitrary, s => [s.value, s.file]));
} else md.push('Keine gefunden.');

const outMd = path.join(docsDir, 'ui-audit-latest.md');
fs.writeFileSync(outMd, md.join('\n'));

console.log('UI Audit abgeschlossen. Outputs:');
console.log('-', path.relative(repoRoot, outJson));
console.log('-', path.relative(repoRoot, outMd));
