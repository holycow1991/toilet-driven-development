const path = require("path");
const { EXCUSES, FLUSH_MESSAGES, randomFrom } = require("./quotes");

// ansi escape codes - see https://en.wikipedia.org/wiki/ANSI_escape_code
const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
};

const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

function printReport(findings, targetDir) {
  console.log("\n" + c("bold", c("cyan", "🚽  TOILET-DRIVEN DEVELOPMENT  🚽")));
  console.log(c("dim", `   Scanning: ${targetDir}\n`));

  if (findings.length === 0) {
    console.log(
      c(
        "green",
        "  ✨ Wow. No lazy comments found. You're either very clean or very good at hiding them.\n",
      ),
    );
    return 0;
  }

  // Group by file
  const byFile = findings.reduce((acc, f) => {
    acc[f.file] = acc[f.file] || [];
    acc[f.file].push(f);
    return acc;
  }, {});

  for (const [file, items] of Object.entries(byFile)) {
    const rel = path.relative(targetDir, file);
    console.log(c("bold", c("yellow", `  📁 ${rel}`)));

    for (const item of items) {
      const location = c("gray", `line ${item.line}`);
      const label = c("magenta", item.label);
      const content = c("dim", item.content.slice(0, 80));
      console.log(`     ${item.emoji}  ${label} ${location}`);
      console.log(`        ${content}`);
      console.log(c("dim", c("gray", `        💬 "${randomFrom(EXCUSES)}"`)));
      console.log();
    }
  }

  // Summary
  const total = findings.length;
  const fileCount = Object.keys(byFile).length;
  const flushMsg = randomFrom(FLUSH_MESSAGES);

  const severity =
    total <= 5
      ? c("green", "🟢 Manageable")
      : total <= 15
        ? c("yellow", "🟡 Concerning")
        : total <= 30
          ? c("red", "🔴 Yikes")
          : c("red", c("bold", "💀 ABANDON SHIP"));

  console.log("─".repeat(50));
  console.log(c("bold", `  🚽 Flush Report`));
  console.log(`  Total bathroom breaks needed : ${c("bold", String(total))}`);
  console.log(
    `  Files affected               : ${c("bold", String(fileCount))}`,
  );
  console.log(`  Codebase health              : ${severity}`);
  console.log(`\n  ${flushMsg}`);
  console.log("─".repeat(50) + "\n");

  return total;
}

module.exports = { printReport };
