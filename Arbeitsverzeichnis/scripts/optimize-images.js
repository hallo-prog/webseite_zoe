#!/usr/bin/env node
/**
 * Image optimization pipeline (optimized version):
 * - Scans public/homepage/herosection for JPG/PNG (only original files, not generated variants)
 * - Generates WebP & JPG responsive variants (widths: 640, 960, 1280)
 * - Produces a manifest JSON with srcSet entries for each format
 * - Skips regeneration if variant newer than source (mtime check)
 * - Creates 6 variants per image instead of 15 (2 formats × 3 widths)
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd(); // Script wird im Arbeitsverzeichnis ausgeführt
// Projektstruktur: Skript liegt unter Arbeitsverzeichnis/scripts, Public ebenso unter Arbeitsverzeichnis/public
const SOURCE_DIR = path.resolve(PROJECT_ROOT, 'public/homepage/herosection');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'public/image-manifest.json');
const TARGET_WIDTHS = [640, 960, 1280]; // Reduziert von 5 auf 3 Breiten für weniger Dateien
// Optimierte Formate: Nur WebP und JPG (AVIF hat Kompatibilitätsprobleme)
const FORMATS = [
  { ext: 'webp', method: 'webp', options: { quality: 78 } },
  { ext: 'jpg', method: 'jpeg', options: { quality: 82 } } // Fallback falls Browser kein WebP kann
];
const LQIP_WIDTH = 48; // sehr kleines Preview

async function collectImages(dir){
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(n => /\.(jpe?g|png)$/i.test(n))
    // Nur Originalbilder verarbeiten, keine generierten Varianten
    .filter(n => !/-(\d+)\./.test(n));
}

async function optimizeOne(file, manifest){
  const srcPath = path.join(SOURCE_DIR, file);
  const srcStat = await fs.promises.stat(srcPath);
  const base = file.replace(/\.(jpe?g|png)$/i,'');
  const extOriginal = path.extname(file).slice(1);
  const image = sharp(srcPath);
  const metadata = await image.metadata();
  for (const { ext, method, options } of FORMATS) {
    const srcSetParts = [];
    for (const width of TARGET_WIDTHS) {
      if (metadata.width && width > metadata.width) continue; // don't upscale
      const outName = `${base}-${width}.${ext}`;
      const outPath = path.join(SOURCE_DIR, outName);
      let regenerate = true;
      if (fs.existsSync(outPath)) {
        const outStat = await fs.promises.stat(outPath);
        regenerate = outStat.mtimeMs < srcStat.mtimeMs; // regenerate only if source newer
      }
      if (regenerate) {
        const pipeline = sharp(srcPath).resize({ width, withoutEnlargement: true });
        if (!pipeline[method]) {
          console.warn('Unexpected method for format', ext, 'falling back to toFormat');
          await pipeline.toFormat(ext, options).toFile(outPath);
        } else {
          await pipeline[method](options).toFile(outPath);
        }
        console.log('Generated', outName);
      }
      srcSetParts.push(`/homepage/herosection/${outName} ${width}w`);
    }
    if (srcSetParts.length) {
      manifest[file] = manifest[file] || { original: `/homepage/herosection/${file}`, variants: {} };
      manifest[file].variants[ext] = srcSetParts.join(', ');
    }
  }
  // Add fallback original if not yet
  manifest[file] = manifest[file] || { original: `/homepage/herosection/${file}`, variants: {} };
  manifest[file].originalType = extOriginal;
  // LQIP nur neu generieren, wenn Quelle neuer als evtl. vorhandener Placeholder
  try {
    const needLqip = !manifest[file].lqip || !manifest[file].lqipCreated || manifest[file].lqipSourceMtime < srcStat.mtimeMs;
    if (needLqip) {
      const lqipBuffer = await sharp(srcPath)
        .resize({ width: LQIP_WIDTH, withoutEnlargement: true })
        .blur(8)
        .toFormat('webp', { quality: 42 })
        .toBuffer();
      manifest[file].lqip = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;
      manifest[file].lqipWidth = LQIP_WIDTH;
      manifest[file].lqipCreated = Date.now();
      manifest[file].lqipSourceMtime = srcStat.mtimeMs;
    }
  } catch (e) {
    console.warn('LQIP generation failed for', file, e.message);
  }
}

async function writeManifest(manifest){
  await fs.promises.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Wrote manifest', MANIFEST_PATH);
}

async function run(){
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('Source directory not found:', SOURCE_DIR);
    process.exit(1);
  }
  const images = await collectImages(SOURCE_DIR);
  const manifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(await fs.promises.readFile(MANIFEST_PATH,'utf-8')) : {};
  for (const img of images) {
    try {
      await optimizeOne(img, manifest);
    } catch (err) {
      console.error('Failed processing', img, err.message);
    }
  }
  await writeManifest(manifest);
}

run();
