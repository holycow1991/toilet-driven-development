#!/usr/bin/env node

const path = require("path");
const { scanDir } = require("../src/scanner");
const { printReport } = require("../src/reporter");
const { parseLimit, parseTargetDir, exceedsLimit } = require("../src/limit");

const args = process.argv.slice(2);
const targetDir = path.resolve(parseTargetDir(args) || process.cwd());
const limit = parseLimit(args);

const findings = scanDir(targetDir);
const total = printReport(findings, targetDir);

if (exceedsLimit(total, limit)) {
  console.error(
    `Found ${total} lazy comments, which exceeds the limit of ${limit}.`,
  );
  process.exit(1);
}
