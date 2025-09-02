#!/usr/bin/env node
/**
 * Image optimization pipeline (phase 1):
 * - Scans public/homepage/herosection for JPG/PNG
 * - Generates AVIF & WebP responsive variants (widths: 640, 960, 1280, 1920)
 * - Produces a manifest JSON with srcSet entries for each format
 * - Skips regeneration if variant newer than source (mtime check)
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Support running from repo root while actual app lives in Arbeitsverzeichnis/
const PROJECT_ROOT = fs.existsSync(path.resolve(process.cwd(), 'Arbeitsverzeichnis')) ? path.resolve(process.cwd(), 'Arbeitsverzeichnis') : process.cwd();
const SOURCE_DIR = path.resolve(PROJECT_ROOT, 'public/homepage/herosection');
const MANIFEST_PATH = path.resolve(PROJECT_ROOT, 'public/image-manifest.json');
const TARGET_WIDTHS = [640, 960, 1280, 1600, 1920];
const FORMATS = [
  { ext: 'avif', options: { quality: 55 } },
  { ext: 'webp', options: { quality: 78 } }
];

async function collectImages(dir){
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(n => /\.(jpe?g|png)$/i.test(n));
}

async function optimizeOne(file, manifest){
  const srcPath = path.join(SOURCE_DIR, file);
  const srcStat = await fs.promises.stat(srcPath);
  const base = file.replace(/\.(jpe?g|png)$/i,'');
  const extOriginal = path.extname(file).slice(1);
  const image = sharp(srcPath);
  const metadata = await image.metadata();
  for (const { ext, options } of FORMATS) {
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
        await sharp(srcPath).resize({ width, withoutEnlargement: true })[ext](options).toFile(outPath);
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
