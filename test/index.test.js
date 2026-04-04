const { test } = require('node:test');
const assert   = require('node:assert/strict');
const fs       = require('node:fs');
const os       = require('node:os');
const path     = require('node:path');
const { scanDir }          = require('../src/scanner');
const { LAZY_PATTERNS }    = require('../src/patterns');
const { EXCUSES, FLUSH_MESSAGES, randomFrom } = require('../src/quotes');
const { parseLimit, parseTargetDir, exceedsLimit } = require('../src/limit');

// ── scanner ───────────────────────────────────────────────────────────────────

test('scanDir finds lazy comments in js files', () => {
  const dir  = fs.mkdtempSync(path.join(os.tmpdir(), 'tdd-'));
  const file = path.join(dir, 'index.js');
  fs.writeFileSync(file, [
    '// TODO: fix this',
    'const x = 1;',
    '// hack: works on my machine',
    '// wtf',
  ].join('\n'));

  const findings = scanDir(dir);
  assert.equal(findings.length, 3);
  assert.ok(findings.every(f => f.file === file));
  assert.deepEqual(findings.map(f => f.line), [1, 3, 4]);
  fs.rmSync(dir, { recursive: true });
});

test('scanDir skips node_modules and dist', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tdd-'));
  for (const ignored of ['node_modules', 'dist', '.git']) {
    const sub = path.join(dir, ignored);
    fs.mkdirSync(sub);
    fs.writeFileSync(path.join(sub, 'dirty.js'), '// hack: ignore me');
  }
  const findings = scanDir(dir);
  assert.equal(findings.length, 0);
  fs.rmSync(dir, { recursive: true });
});

test('scanDir ignores non-code files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tdd-'));
  fs.writeFileSync(path.join(dir, 'notes.md'),  '// TODO: ignored');
  fs.writeFileSync(path.join(dir, 'data.json'), '// hack: ignored');
  const findings = scanDir(dir);
  assert.equal(findings.length, 0);
  fs.rmSync(dir, { recursive: true });
});

test('scanDir returns empty array for clean codebase', () => {
  const dir  = fs.mkdtempSync(path.join(os.tmpdir(), 'tdd-'));
  const file = path.join(dir, 'clean.ts');
  fs.writeFileSync(file, 'const answer = 42;\nexport default answer;\n');
  const findings = scanDir(dir);
  assert.equal(findings.length, 0);
  fs.rmSync(dir, { recursive: true });
});

// ── patterns ──────────────────────────────────────────────────────────────────

test('every pattern has label and emoji', () => {
  for (const p of LAZY_PATTERNS) {
    assert.ok(p.pattern instanceof RegExp, `pattern missing regex`);
    assert.ok(typeof p.label   === 'string' && p.label.length > 0,  `pattern missing label`);
    assert.ok(typeof p.emoji   === 'string' && p.emoji.length > 0,  `pattern missing emoji`);
  }
});

test('patterns are case-insensitive', () => {
  const todoPattern = LAZY_PATTERNS.find(p => p.label.includes('TODO'));
  assert.ok(todoPattern.pattern.test('// todo: something'));
  assert.ok(todoPattern.pattern.test('// TODO: something'));
  assert.ok(todoPattern.pattern.test('// Todo: something'));
});

// ── quotes ────────────────────────────────────────────────────────────────────

test('randomFrom returns an item from the array', () => {
  const items = ['a', 'b', 'c'];
  for (let i = 0; i < 20; i++) {
    assert.ok(items.includes(randomFrom(items)));
  }
});

test('EXCUSES and FLUSH_MESSAGES are non-empty arrays of strings', () => {
  for (const list of [EXCUSES, FLUSH_MESSAGES]) {
    assert.ok(Array.isArray(list) && list.length > 0);
    assert.ok(list.every(s => typeof s === 'string' && s.length > 0));
  }
});

// ── limit ─────────────────────────────────────────────────────────────────────

test('parseLimit defaults to 999 when no --limit flag is provided', () => {
  assert.equal(parseLimit([]), 999);
  assert.equal(parseLimit(['./src']), 999);
  assert.equal(parseLimit(['--other=5']), 999);
});

test('parseLimit extracts the numeric value from --limit=<n>', () => {
  assert.equal(parseLimit(['--limit=10']), 10);
  assert.equal(parseLimit(['./src', '--limit=50']), 50);
  assert.equal(parseLimit(['--limit=0']), 0);
  assert.equal(parseLimit(['--limit=1']), 1);
});

test('exceedsLimit returns true only when total is strictly greater than limit', () => {
  assert.equal(exceedsLimit(11, 10), true);
  assert.equal(exceedsLimit(10, 10), false);
  assert.equal(exceedsLimit(9, 10), false);
  assert.equal(exceedsLimit(0, 0), false);
  assert.equal(exceedsLimit(1, 0), true);
});

test('exceedsLimit works with the default limit of 999', () => {
  assert.equal(exceedsLimit(999, 999), false);
  assert.equal(exceedsLimit(1000, 999), true);
});

test('parseTargetDir returns the first non-flag argument', () => {
  assert.equal(parseTargetDir(['./src']), './src');
  assert.equal(parseTargetDir(['./src', '--limit=10']), './src');
  assert.equal(parseTargetDir(['--limit=10', './src']), './src');
});

test('parseTargetDir returns null when only flags are provided', () => {
  assert.equal(parseTargetDir([]), null);
  assert.equal(parseTargetDir(['--limit=10']), null);
});
