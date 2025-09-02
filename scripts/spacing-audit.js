#!/usr/bin/env node
/**
 * Spacing Audit Script
 * Scans JSX/TSX files for Tailwind top-margin utilities (mt-*) to highlight
 * candidates for replacement with flow utilities (.flow / .flow-sm / .flow-lg).
 *
 * Heuristics:
 *  - Counts total mt-* occurrences per file.
 *  - Identifies lines containing multiple margin utilities.
 *  - Detects sequences of consecutive elements each with mt-* (potential vertical rhythm smells).
 *  - Flags large spacing jumps (mt-8, mt-10, mt-12, mt-16, mt-20) which often can be standardized.
 *
 * Outputs a concise text summary to stdout and writes a JSON report to docs/spacing-audit.json.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'Arbeitsverzeichnis', 'src', 'pages');
const REPORT_PATH = path.resolve(__dirname, '..', 'docs', 'spacing-audit.json');

const MT_REGEX = /mt-(\d+|px|auto)/g; // basic detection
const FILE_EXTENSIONS = new Set(['.jsx', '.tsx']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (FILE_EXTENSIONS.has(path.extname(e.name))) files.push(full);
  }
  return files;
}

function analyzeFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let total = 0;
  const occurrences = [];
  const large = [];
  const consecutiveGroups = [];
  let currentGroup = [];

  lines.forEach((line, idx) => {
    const matches = line.match(MT_REGEX);
    if (matches) {
      total += matches.length;
      occurrences.push({ line: idx + 1, count: matches.length, text: line.trim() });
      // classify large values
      matches.forEach(m => {
        const num = parseInt(m.split('-')[1], 10);
        if (!isNaN(num) && num >= 8) large.push({ line: idx + 1, value: m, text: line.trim() });
      });
      currentGroup.push(idx + 1);
    } else {
      if (currentGroup.length > 1) consecutiveGroups.push([...currentGroup]);
      currentGroup = [];
    }
  });
  if (currentGroup.length > 1) consecutiveGroups.push([...currentGroup]);

  return { file, total, occurrences, large, consecutiveGroups };
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('Pages directory not found:', ROOT);
    process.exit(1);
  }
  const files = walk(ROOT);
  const report = files.map(analyzeFile).filter(r => r.total > 0);

  // Aggregate
  const aggregate = {
    generatedAt: new Date().toISOString(),
    totalFilesWithMt: report.length,
    totalMtOccurrences: report.reduce((a, r) => a + r.total, 0),
    topFiles: [...report].sort((a, b) => b.total - a.total).slice(0, 10).map(r => ({ file: path.relative(process.cwd(), r.file), total: r.total })),
  };

  const output = { aggregate, files: report };
  // Write JSON
  try {
    fs.writeFileSync(REPORT_PATH, JSON.stringify(output, null, 2));
  } catch (e) {
    console.error('Failed to write report:', e.message);
  }

  // Human-readable summary
  console.log('=== Spacing Audit (mt-*) Summary ===');
  console.log('Generated:', aggregate.generatedAt);
  console.log('Files with mt-*:', aggregate.totalFilesWithMt);
  console.log('Total mt-* occurrences:', aggregate.totalMtOccurrences);
  console.log('\nTop files by mt-* usage:');
  aggregate.topFiles.forEach(f => console.log(` - ${f.file}: ${f.total}`));
  console.log('\nRefactor candidates (consecutive groups > 2 lines or large gaps):');
  report.forEach(r => {
    const big = r.large.length;
    const groups = r.consecutiveGroups.filter(g => g.length >= 3);
    if (big || groups.length) {
      console.log(` * ${path.relative(process.cwd(), r.file)}: ${big} large, ${groups.length} group(s)`);
    }
  });
  console.log('\nReport JSON:', path.relative(process.cwd(), REPORT_PATH));
  console.log('Hint: Replace clusters with a parent .flow and remove individual mt-* where spacing is sequential. Leave form control micro-spacing (mt-1) intact.');
}

if (require.main === module) {
  main();
}
