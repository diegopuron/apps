const STORAGE_KEY = "detectivesDelErrorProgress_v3";

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { completed: {}, lastBlock: 0, lastLevel: 0 };
  try {
    const parsed = JSON.parse(saved);
    if (!parsed.completed) parsed.completed = {};
    if (!Number.isInteger(parsed.lastBlock)) parsed.lastBlock = 0;
    if (!Number.isInteger(parsed.lastLevel)) parsed.lastLevel = 0;
    return parsed;
  } catch (error) {
    return { completed: {}, lastBlock: 0, lastLevel: 0 };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getLevelKey(blockIndex, levelIndex) {
  return BLOCKS[blockIndex].id + "_" + levelIndex;
}

function isLevelDone(progress, blockIndex, levelIndex) {
  return Boolean(progress.completed[getLevelKey(blockIndex, levelIndex)]);
}

function countDoneInBlock(progress, blockIndex) {
  return BLOCKS[blockIndex].levels.filter(function(_, i) {
    return isLevelDone(progress, blockIndex, i);
  }).length;
}

function isBlockUnlocked(progress, blockIndex) {
  if (blockIndex === 0) return true;
  return countDoneInBlock(progress, blockIndex - 1) >= 6;
}

function totalCompleted(progress) {
  return Object.values(progress.completed).filter(Boolean).length;
}

function totalLevelCount() {
  return BLOCKS.reduce(function(sum, block) {
    return sum + block.levels.length;
  }, 0);
}

function generateProgressCode(progress) {
  let codeNumber = 0n;

  BLOCKS.forEach(function(block, blockIndex) {
    block.levels.forEach(function(_, levelIndex) {
      if (isLevelDone(progress, blockIndex, levelIndex)) {
        const bitPosition = BigInt(blockIndex * 8 + levelIndex);
        codeNumber = codeNumber | (1n << bitPosition);
      }
    });
  });

  const progressPart = bigIntToBase36(codeNumber);
  const lastBlock = (progress.lastBlock || 0) + 1;
  const lastLevel = (progress.lastLevel || 0) + 1;
  return "DE-" + progressPart + "-" + lastBlock + lastLevel;
}

function decodeProgressCode(code) {
  const cleaned = String(code || "").trim().toUpperCase().split(" ").join("");
  const parts = cleaned.split("-");
  if (parts.length !== 3 || parts[0] !== "DE") throw new Error("Formato no válido");

  const progressPart = parts[1];
  const positionPart = parts[2];
  if (!progressPart || positionPart.length !== 2) throw new Error("Código no válido");

  let codeNumber = base36ToBigInt(progressPart);
  const completed = {};

  for (let blockIndex = 0; blockIndex < BLOCKS.length; blockIndex++) {
    for (let levelIndex = 0; levelIndex < BLOCKS[blockIndex].levels.length; levelIndex++) {
      const bitPosition = BigInt(blockIndex * 8 + levelIndex);
      const isDone = (codeNumber & (1n << bitPosition)) !== 0n;
      if (isDone) completed[getLevelKey(blockIndex, levelIndex)] = true;
    }
  }

  return {
    completed,
    lastBlock: clampNumber(Number(positionPart.charAt(0)) - 1, 0, BLOCKS.length - 1),
    lastLevel: clampNumber(Number(positionPart.charAt(1)) - 1, 0, 7)
  };
}

function bigIntToBase36(number) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (number === 0n) return "0";
  let result = "";
  let value = number;
  while (value > 0n) {
    const remainder = Number(value % 36n);
    result = chars[remainder] + result;
    value = value / 36n;
  }
  return result;
}

function base36ToBigInt(text) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = 0n;
  for (let i = 0; i < text.length; i++) {
    const value = chars.indexOf(text.charAt(i));
    if (value < 0) throw new Error("Carácter no válido");
    result = result * 36n + BigInt(value);
  }
  return result;
}

function clampNumber(value, min, max) {
  return Number.isInteger(value) ? Math.max(min, Math.min(value, max)) : min;
}
