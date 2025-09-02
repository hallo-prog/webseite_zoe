#!/usr/bin/env node
// Scans src/ for interactive elements missing explicit focus styles or relying on outline:none without fallback.
// Heuristics: looks for 'outline-none' or 'outline: none' without a paired 'focus-visible' style in same file region.
// Also flags raw <button>, <a>, <input>, role="button" usages missing class containing 'focus' or 'focus-ring'.

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC = join(process.cwd(), 'src');
const INTERACTIVE_TAGS = ['button','a','input','select','textarea'];
const WHITELIST_SNIPPET_REGEX = [
  /sr-only focus:not-sr-only/, // Skip link already has visible focus expansion
  /focus:ring-2/, // Accept Tailwind ring usage as sufficient
  /focus:ring-offset-2/,
  /fab-btn/, // now has global :focus-visible style in CSS
  /social-icon/, // global focus-visible style added
  /focus:ring-brand/,
  /focus:ring-emerald/,
  /focus:ring-blue/,
  /focus:ring-amber/, 
  /focus:ring-gray/,
  /focus:ring-neutral/
];
let issues = [];

function walk(dir){
  for (const f of readdirSync(dir,{withFileTypes:true})){
    if (f.name.startsWith('.') || f.name === 'public') continue;
    const full = join(dir,f.name);
    if (f.isDirectory()) walk(full); else if (/\.(jsx?|tsx?)$/.test(f.name)) analyze(full);
  }
}

function analyze(file){
  const txt = readFileSync(file,'utf8');
  const lines = txt.split(/\n/);
  // Heuristic 1: outline-none without focus-visible class nearby (30 line window)
  lines.forEach((line,i)=>{
    if (/(outline-none|outline: ?none)/.test(line) && !/focus-visible/.test(line)){
      // look forward a window for remediation pattern
      const windowSlice = lines.slice(Math.max(0,i-5), i+10).join('\n');
      const snippet = line.trim();
      if (!/focus-visible/.test(windowSlice) && !/focus-ring/.test(windowSlice)){
        if (!WHITELIST_SNIPPET_REGEX.some(r=> r.test(windowSlice) || r.test(snippet))){
          issues.push({file,line:i+1,type:'outline-none-no-focus-visible', snippet});
        }
      }
    }
  });
  // Heuristic 2: raw interactive tags missing focus class
  // Exclude our wrapped component definitions (<input\n  className={` pattern) by ignoring newline after tag start
  // Custom lightweight parser to avoid treating '=>' inside onClick as tag end
  const TAGS = /(button|a|input|select|textarea)/;
  for (let i=0;i<txt.length;i++){
    if (txt[i] === '<'){
      const start = i;
      // skip closing tags
      if (txt[i+1] === '/') continue;
      // extract tag name
      let j = i+1; let name='';
      while(j<txt.length && /[a-zA-Z]/.test(txt[j])){ name += txt[j]; j++; }
      if (!TAGS.test(name)) continue;
      // scan until real '>'
      let k = j; let inQuote = null; let attrs='';
      while(k<txt.length){
        const ch = txt[k];
        if (!inQuote && (ch === '"' || ch === "'")) { inQuote = ch; attrs += ch; k++; continue; }
        if (inQuote && ch === inQuote){ inQuote = null; attrs += ch; k++; continue; }
        if (!inQuote && ch === '>' && txt[k-1] !== '='){ // treat '>': not part of '=>'
          break;
        }
        attrs += ch; k++;
      }
      if (k >= txt.length) break;
      const full = attrs; // attributes text
      if (/role="(presentation|none)"/.test(full)) { i=k; continue; }
      if (/disabled/.test(full)) { i=k; continue; }
      if (/tabIndex="-1"/.test(full)) { i=k; continue; }
      if (INTERACTIVE_TAGS.includes(name)){
        const hasClass = /class(Name)?="([^"]*)"/.exec(full);
        // Skip known component wrapper definitions (Input/Textarea files exporting base primitives)
        if ((/input.jsx$/.test(file) || /textarea.jsx$/.test(file)) && /className={`/.test(full)) {
          i = k;
          continue;
        }
        if (hasClass){
          const cls = hasClass[2];
          if (!/(focus-|focus:ring|focus-visible|focus-ring)/.test(cls)){
            if (!WHITELIST_SNIPPET_REGEX.some(r=> r.test(cls))){
              issues.push({file,line: lineOfIndex(txt,start), type:'interactive-missing-focus-style', snippet:`<${name} ${full.trim()}>`});
            }
          }
        } else {
          issues.push({file,line: lineOfIndex(txt,start), type:'interactive-no-class', snippet:`<${name} ${full.trim()}>`});
        }
      }
      i = k;
    }
  }
}

function lineOfIndex(text, idx){
  return text.slice(0,idx).split(/\n/).length;
}

walk(SRC);

if (issues.length){
  console.log(`✖ Focus Audit: ${issues.length} potentielle Probleme`);
  for (const i of issues.slice(0,50)){
    console.log(`- [${i.type}] ${i.file}:${i.line} -> ${i.snippet}`);
  }
  if (issues.length > 50) console.log(`… ${issues.length-50} weitere Einträge`);
  process.exitCode = 1; // non-blocking? set to 1 to enforce eventually
} else {
  console.log('✓ Focus Audit: Keine Probleme gefunden');
}
