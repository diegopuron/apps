let progress = loadProgress();
let currentBlockIndex = 0;
let currentLevelIndex = 0;
let selectedOption = null;

const homeScreen = document.getElementById("homeScreen");
const blockScreen = document.getElementById("blockScreen");
const blocksGrid = document.getElementById("blocksGrid");
const totalDone = document.getElementById("totalDone");
const totalLevels = document.getElementById("totalLevels");
const blockTitle = document.getElementById("blockTitle");
const blockDescription = document.getElementById("blockDescription");
const levelList = document.getElementById("levelList");
const caseKicker = document.getElementById("caseKicker");
const caseTitle = document.getElementById("caseTitle");
const caseType = document.getElementById("caseType");
const caseInstruction = document.getElementById("caseInstruction");
const caseText = document.getElementById("caseText");
const optionsContainer = document.getElementById("options");
const typeSelect = document.getElementById("typeSelect");
const explanationInput = document.getElementById("explanationInput");
const feedbackBox = document.getElementById("feedbackBox");
const hintBox = document.getElementById("hintBox");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const progressCodeOutput = document.getElementById("progressCodeOutput");
const progressCodeInput = document.getElementById("progressCodeInput");
const codeMessage = document.getElementById("codeMessage");

init();

function init() {
  document.getElementById("homeBtn").addEventListener("click", showHome);
  document.getElementById("backToBlocksBtn").addEventListener("click", showHome);
  document.getElementById("continueBtn").addEventListener("click", continueGame);
  document.getElementById("resetBtn").addEventListener("click", resetProgress);
  document.getElementById("copyCodeBtn").addEventListener("click", copyProgressCode);
  document.getElementById("loadCodeBtn").addEventListener("click", loadProgressFromCode);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  checkBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", goNextLevel);
  renderHome();
}

function persist() {
  saveProgress(progress);
  updateProgressCode();
}

function updateProgressCode() {
  if (progressCodeOutput) progressCodeOutput.value = generateProgressCode(progress);
}

function copyProgressCode() {
  const code = generateProgressCode(progress);
  progressCodeOutput.value = code;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(function() {
      showCodeMessage("Código copiado. Guárdalo para la próxima sesión.", "good");
    }).catch(function() {
      progressCodeOutput.select();
      showCodeMessage("No se pudo copiar automáticamente. Selecciona el código y cópialo manualmente.", "bad");
    });
  } else {
    progressCodeOutput.select();
    showCodeMessage("Selecciona el código y cópialo manualmente.", "bad");
  }
}

function loadProgressFromCode() {
  try {
    progress = decodeProgressCode(progressCodeInput.value);
    persist();
    renderHome();
    showCodeMessage("Progreso cargado correctamente.", "good");
  } catch (error) {
    showCodeMessage("El código no se reconoce. Revisa que esté completo y sin espacios extraños.", "bad");
  }
}

function showCodeMessage(message, type) {
  codeMessage.textContent = message;
  codeMessage.className = "code-message " + (type || "");
}

function renderHome() {
  totalDone.textContent = totalCompleted(progress);
  totalLevels.textContent = totalLevelCount();
  updateProgressCode();
  blocksGrid.innerHTML = "";

  BLOCKS.forEach(function(block, index) {
    const unlocked = isBlockUnlocked(progress, index);
    const done = countDoneInBlock(progress, index);
    const total = block.levels.length;
    const card = document.createElement("button");
    card.className = "block-card " + (unlocked ? "" : "locked");
    card.disabled = !unlocked;
    card.innerHTML = "<div>" +
      "<div class='block-kicker'>Bloque " + (index + 1) + "</div>" +
      "<div class='block-title'>" + block.title + "</div>" +
      "<p class='muted' style='margin-top:8px; line-height:1.4'>" + block.description + "</p>" +
      "</div>" +
      "<div>" +
      "<p class='muted' style='margin-bottom:8px'>" + (unlocked ? done + "/" + total + " niveles" : "Bloque bloqueado") + "</p>" +
      "<div class='progress-bar'><div class='progress-fill' style='width:" + ((done / total) * 100) + "%'></div></div>" +
      "</div>";
    card.addEventListener("click", function() { openBlock(index); });
    blocksGrid.appendChild(card);
  });

  const badge = document.querySelector(".section-title .badge");
  if (badge) badge.textContent = BLOCKS.length + " bloques · " + totalLevelCount() + " niveles";
}

function showHome() {
  setScreen(homeScreen, blockScreen, "home");
  renderHome();
}

function openBlock(blockIndex, levelIndex) {
  if (!isBlockUnlocked(progress, blockIndex)) return;
  currentBlockIndex = blockIndex;
  currentLevelIndex = Number.isInteger(levelIndex) ? levelIndex : 0;
  progress.lastBlock = blockIndex;
  progress.lastLevel = currentLevelIndex;
  persist();
  setScreen(homeScreen, blockScreen, "block");
  renderBlock();
  renderLevel();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function continueGame() {
  const blockIndex = Math.min(progress.lastBlock || 0, BLOCKS.length - 1);
  const levelIndex = Math.min(progress.lastLevel || 0, BLOCKS[blockIndex].levels.length - 1);
  if (isBlockUnlocked(progress, blockIndex)) openBlock(blockIndex, levelIndex);
  else openBlock(0, 0);
}

function renderBlock() {
  const block = BLOCKS[currentBlockIndex];
  blockTitle.textContent = "Bloque " + (currentBlockIndex + 1) + ": " + block.title;
  blockDescription.textContent = block.description;
  levelList.innerHTML = "";

  block.levels.forEach(function(level, index) {
    const btn = document.createElement("button");
    btn.className = "level-btn " + (isLevelDone(progress, currentBlockIndex, index) ? "done " : "") + (index === currentLevelIndex ? "current" : "");
    btn.textContent = (isLevelDone(progress, currentBlockIndex, index) ? "✓" : "○") + " Nivel " + (index + 1) + ": " + level.title;
    btn.addEventListener("click", function() {
      currentLevelIndex = index;
      progress.lastBlock = currentBlockIndex;
      progress.lastLevel = currentLevelIndex;
      persist();
      renderBlock();
      renderLevel();
    });
    levelList.appendChild(btn);
  });
}

function renderLevel() {
  const level = BLOCKS[currentBlockIndex].levels[currentLevelIndex];
  selectedOption = null;
  caseKicker.textContent = "Bloque " + (currentBlockIndex + 1) + " · Nivel " + (currentLevelIndex + 1);
  caseTitle.textContent = level.title;
  caseType.textContent = readableType(level.type);
  caseInstruction.textContent = level.instruction;
  caseText.textContent = level.text;
  typeSelect.value = "";
  explanationInput.value = "";
  feedbackBox.className = "feedback";
  feedbackBox.innerHTML = "";
  hintBox.className = "hint-box";
  hintBox.textContent = level.hint;
  nextBtn.disabled = true;

  optionsContainer.innerHTML = "";
  level.options.forEach(function(option, index) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option;
    btn.addEventListener("click", function() { selectOption(index); });
    optionsContainer.appendChild(btn);
  });
}

function selectOption(index) {
  selectedOption = index;
  Array.from(optionsContainer.children).forEach(function(btn, i) {
    btn.classList.toggle("selected", i === index);
  });
}

function showHint() {
  hintBox.classList.add("show");
}

function checkAnswer() {
  const level = BLOCKS[currentBlockIndex].levels[currentLevelIndex];
  const typeIsCorrect = typeSelect.value === level.type;
  const optionIsCorrect = selectedOption === level.answerIndex;
  const explanation = explanationInput.value.trim();
  const hasExplanation = explanation.length >= 12;
  const isCorrect = optionIsCorrect && typeIsCorrect && hasExplanation;

  Array.from(optionsContainer.children).forEach(function(btn, i) {
    btn.classList.remove("correct", "incorrect");
    if (i === level.answerIndex) btn.classList.add("correct");
    if (selectedOption === i && i !== level.answerIndex) btn.classList.add("incorrect");
  });

  if (isCorrect) {
    progress.completed[getLevelKey(currentBlockIndex, currentLevelIndex)] = true;
    progress.lastBlock = currentBlockIndex;
    progress.lastLevel = currentLevelIndex;
    persist();
    feedbackBox.className = "feedback good show";
    feedbackBox.innerHTML = "<strong>Buen trabajo.</strong><br>" + level.explanation;
    nextBtn.disabled = false;
    renderBlock();
  } else {
    const missing = [];
    if (!optionIsCorrect) missing.push("no has localizado bien el error");
    if (!typeIsCorrect) missing.push("la categoría no encaja");
    if (!hasExplanation) missing.push("falta una explicación un poco más completa");
    feedbackBox.className = "feedback bad show";
    feedbackBox.innerHTML = "<strong>Revisa antes de cerrar el caso.</strong><br>Problema detectado: " + missing.join(", ") + ".<br><br><strong>Pista de corrección:</strong> " + level.explanation;
    nextBtn.disabled = false;
  }
}

function goNextLevel() {
  const block = BLOCKS[currentBlockIndex];
  if (currentLevelIndex < block.levels.length - 1) {
    currentLevelIndex += 1;
    progress.lastLevel = currentLevelIndex;
    persist();
    renderBlock();
    renderLevel();
  } else if (currentBlockIndex < BLOCKS.length - 1 && isBlockUnlocked(progress, currentBlockIndex + 1)) {
    openBlock(currentBlockIndex + 1, 0);
  } else {
    showHome();
  }
}

function resetProgress() {
  const sure = confirm("¿Seguro que quieres borrar el progreso guardado en este navegador?");
  if (!sure) return;
  progress = { completed: {}, lastBlock: 0, lastLevel: 0 };
  persist();
  renderHome();
  showCodeMessage("Progreso reiniciado.", "bad");
}
