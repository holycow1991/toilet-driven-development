const LAZY_PATTERNS = [
  { pattern: /\/\/\s*fix\b/i, label: "🔧 FIX", emoji: "🪛" },
  { pattern: /\/\/\s*fixme\b/i, label: "🚨 FIXME", emoji: "🆘" },
  { pattern: /\/\/\s*hack\b/i, label: "🩹 HACK", emoji: "🤮" },
  { pattern: /\/\/\s*wtf\b/i, label: "😱 WTF", emoji: "💀" },
  { pattern: /\/\/\s*todo\b/i, label: "📝 TODO", emoji: "🙃" },
  { pattern: /\/\/\s*\?\?\?/i, label: "❓ ???", emoji: "🤷" },
  { pattern: /\/\/\s*idk\b/i, label: "🤔 IDK", emoji: "🫠" },
  { pattern: /\/\/\s*later\b/i, label: "⏰ LATER", emoji: "💩" },
  { pattern: /\/\/\s*temp\b/i, label: "🕰️  TEMP", emoji: "♾️" },
];

module.exports = { LAZY_PATTERNS };
