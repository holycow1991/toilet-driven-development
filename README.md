# 🚽 Toilet-Driven Development

> _You'll fix it later. You won't._

`tdd` scans your codebase for all those lazy comments you left behind and judges you for them. Lovingly.

---

## Install

```bash
npm install -g toilet-driven-development
```

Or just run it straight from your project:

```bash
npx toilet-driven-development
```

---

## Usage

```bash
# scan the current directory
tdd

# scan a specific path
tdd ./src

# exit with code 1 if you've let things get too out of hand
tdd --limit=10
```

---

## What it catches

| Comment    | Vibe                          |
| ---------- | ----------------------------- |
| `// TODO`  | classic procrastination       |
| `// FIXME` | known bug, zero urgency       |
| `// HACK`  | it works, don't touch it      |
| `// WTF`   | past you was having a moment  |
| `// FIX`   | a softer FIXME, still a lie   |
| `// LATER` | "later" was 2 years ago       |
| `// TEMP`  | permanent since day one       |
| `// IDK`   | bold of you to commit this    |
| `// ???`   | you had questions, no answers |

Scans `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs`, `.py`, `.go`, `.java`, `.cs`, `.php`, `.rb`, and `.rs` files. Skips `node_modules`, `.git`, `dist`, `build`, `coverage`, and `.next`.

---

## Output

```
🚽  TOILET-DRIVEN DEVELOPMENT  🚽
   Scanning: /your/project

  📁 src/auth.js
     🙃  📝 TODO  line 42
        // TODO: validate token expiry
        💬 "Future you will handle it. Future you hates you."

──────────────────────────────────────────────────
  🚽 Flush Report
  Total bathroom breaks needed : 7
  Files affected               : 3
  Codebase health              : 🟡 Concerning

  Time to call a plumber. 🪠
──────────────────────────────────────────────────
```

Severity scale: `🟢 Manageable` → `🟡 Concerning` → `🔴 Yikes` → `💀 ABANDON SHIP`

---

## CI usage

Use `--limit` to fail your pipeline when the rot gets too deep:

```yaml
- run: npx toilet-driven-development --limit=20
```

Nothing motivates a cleanup sprint like a broken build.

---

## License

MIT
