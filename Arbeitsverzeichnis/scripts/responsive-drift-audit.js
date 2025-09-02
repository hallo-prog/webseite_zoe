#!/usr/bin/env node
// Scans src/ for Tailwind breakpoint utility frequency to spot inconsistent responsive usage.
// Outputs JSON summary and flags outliers where a breakpoint is heavily under- or over-represented.

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SRC = join(process.cwd(),'src');
const BREAKPOINTS = ['sm:','md:','lg:','xl:','2xl:'];
let counts = Object.fromEntries(BREAKPOINTS.map(b=>[b,0]));
let perFile = {};

function walk(dir){
  for (const e of readdirSync(dir,{withFileTypes:true})){
    if (e.name.startsWith('.')) continue;
    const full = join(dir,e.name);
    if (e.isDirectory()) walk(full); else if (/\.(jsx?|tsx?|css)$/.test(e.name)) analyze(full);
  }
}

function analyze(file){
  const txt = readFileSync(file,'utf8');
  let local = { file };
  for (const bp of BREAKPOINTS){
    const n = (txt.match(new RegExp(bp.replace(':','\\:'),'g'))||[]).length;
    if (n){ counts[bp]+=n; local[bp]=n; }
  }
  if (Object.keys(local).length>1) perFile[file]=local;
}

walk(SRC);

// Heuristics: ratio vs median
const totals = Object.values(counts);
const median = totals.slice().sort((a,b)=>a-b)[Math.floor(totals.length/2)] || 1;
let anomalies = [];
for (const [bp,val] of Object.entries(counts)){
  if (val && (val/median > 2.5 || val/median < 0.4)) anomalies.push({ breakpoint: bp, count: val, median, ratio:(val/median).toFixed(2)});
}

const report = { timestamp: Date.now(), counts, median, anomalies, files: perFile };
writeFileSync('responsive-drift-report.json', JSON.stringify(report,null,2));
console.log('Responsive Drift Audit geschrieben -> responsive-drift-report.json');
if (anomalies.length){
  console.log('Auffällige Breakpoint-Verteilung:');
  anomalies.forEach(a=> console.log('-', a.breakpoint, 'count', a.count, 'ratio', a.ratio));
}