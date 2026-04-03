const fs = require('fs');
const path = require('path');
const { LAZY_PATTERNS } = require('./patterns');

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.next']);
const CODE_EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs', '.py', '.go', '.java', '.cs', '.php', '.rb', '.rs']);

function scanDir(dir) {
  const results = [];

  function walk(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && CODE_EXTENSIONS.has(path.extname(entry.name))) {
        results.push(...scanFile(fullPath));
      }
    }
  }

  walk(dir);
  return results;
}

function scanFile(filePath) {
  const findings = [];
  let lines;

  try {
    lines = fs.readFileSync(filePath, 'utf8').split('\n');
  } catch {
    return findings;
  }

  lines.forEach((line, index) => {
    for (const { pattern, label, emoji } of LAZY_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({
          file: filePath,
          line: index + 1,
          content: line.trim(),
          label,
          emoji,
        });
        break;
      }
    }
  });

  return findings;
}

module.exports = { scanDir };
