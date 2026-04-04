function parseLimit(args) {
  return parseInt(
    args.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? "999",
    10,
  );
}

function parseTargetDir(args) {
  return args.find((a) => !a.startsWith("--")) ?? null;
}

function exceedsLimit(total, limit) {
  return total > limit;
}

module.exports = { parseLimit, parseTargetDir, exceedsLimit };
