const EXCUSES = [
  "You've been saying this since the Obama administration.",
  "Future you will handle it. Future you hates you.",
  "This is fine. Everything is fine.",
  "Ah yes, a 'temporary' solution in its natural habitat.",
  "The 5-minute fix that turned 3 years old.",
  "Ship it. It's a feature, not a bug.",
  "This comment has been here longer than some employees.",
  "I'll refactor this after the deadline. Classic.",
  "Your future self just shed a tear.",
  "At least you left a comment. A true hero.",
  "This is why we drink.",
  "Here lies good intentions. RIP.",
  "Schrödinger's fix: both fixed and unfixed until someone looks.",
  "Strong 'we'll cross that bridge when we come to it' energy.",
  "The road to technical debt is paved with these.",
];

const FLUSH_MESSAGES = [
  "Your codebase is clogged. 🚽",
  "Time to call a plumber. 🪠",
  "The pipes are... concerning. 💧",
  "This is a health code violation. 🚨",
  "Flushing your dignity... done. ✅",
  "The stench of laziness is overwhelming. 🤢",
  "Your code is backed up worse than rush hour traffic. 🚗💨",
  "This is the code equivalent of a clogged toilet. 🚽❌",
  "Flush it and forget it. 🧻",
  "The only thing flowing here is regret. 🌊",
  "This is why we can't have nice things. 🚫",
  "Your code smells like a public restroom. 🚻",
  "This is something even a Roomba wouldn't want to clean. 🤖",
  "Time to call a janitor. 🧹",
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { EXCUSES, FLUSH_MESSAGES, randomFrom };
