#!/usr/bin/env node
/**
 * Injects a minimal inline image manifest subset (hero image) into index.html
 * so that runtime can deterministically select correct preload before hydration.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
// After Vite build, index.html and generated image-manifest.json live in dist/
const INDEX_PATH = path.join(ROOT, 'dist/index.html');
const MANIFEST_PATH = path.join(ROOT, 'dist/image-manifest.json');
const PLACEHOLDER = '<!-- INLINE_IMAGE_MANIFEST -->';
const HERO_KEY = 'energy-1322810_1920 (1).jpg';

try {
  const html = fs.readFileSync(INDEX_PATH, 'utf-8');
  if (!html.includes(PLACEHOLDER)) {
    console.warn('Placeholder not found in index.html, skipping inline manifest.');
    process.exit(0);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH,'utf-8'));
  const subset = {}; // minimal subset (hero only)
  if (manifest[HERO_KEY]) subset[HERO_KEY] = manifest[HERO_KEY];
  const script = `<script>window.__imageManifest=${JSON.stringify(subset)};window.__imageManifestPreloaded=true;<\/script>`;
  const out = html.replace(PLACEHOLDER, script);
  fs.writeFileSync(INDEX_PATH, out, 'utf-8');
  console.log('Inline image manifest injected (keys:', Object.keys(subset).join(','), ')');
} catch (e) {
  console.error('Failed to inline image manifest:', e.message);
  process.exit(1);
}
