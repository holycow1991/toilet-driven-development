#!/usr/bin/env node

const path = require('path');
const { scanDir }     = require('../src/scanner');
const { printReport } = require('../src/reporter');

const args      = process.argv.slice(2);
const targetDir = path.resolve(args[0] || process.cwd());
const limit     = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] ?? '999', 10);

const findings = scanDir(targetDir);
const total    = printReport(findings, targetDir);

if (total > limit) {
  process.exit(1);
}
