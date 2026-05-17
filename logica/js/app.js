const DetectivesApp = {
  levels: DETECTIVES_LEVELS,
  unlockCodes: DETECTIVES_UNLOCK_CODES,

  state: {
    currentLevel: 1,
    maxUnlocked: 1,
    board: {}
  },

  init() {
    this.state.maxUnlocked = DetectivesLogic.clampUnlockedLevel(
      DetectivesStorage.getMaxUnlocked(1),
      this.levels.length
    );

    this.bindCodeEvents();
    this.loadLevel(this.state.currentLevel);
    this.runSmokeTests();
  },

  bindCodeEvents() {
    DetectivesUI.nodes.codeButton.addEventListener("click", () => this.unlockWithCode());

    DetectivesUI.nodes.codeInput.addEventListener("keydown", event => {
      if (event.key === "Enter") this.unlockWithCode();
    });
  },

  unlockWithCode() {
    const input = DetectivesUI.nodes.codeInput;
    const code = input.value.trim().toUpperCase();
    const unlockLevel = this.unlockCodes[code];

    if (!unlockLevel) {
      input.value = "";
      alert("Ese código no está activo. Revisa mayúsculas o pide una pista al profe.");
      return;
    }

    this.state.maxUnlocked = Math.max(this.state.maxUnlocked, unlockLevel);
    this.state.currentLevel = unlockLevel;

    DetectivesStorage.setMaxUnlocked(this.state.maxUnlocked);
    input.value = "";

    this.loadLevel(unlockLevel);
  },

  loadLevel(id) {
    const level = DetectivesLogic.getLevel(this.levels, id);
    this.state.currentLevel = level.id;

    DetectivesUI.renderLevels({
      levels: this.levels,
      currentLevel: this.state.currentLevel,
      maxUnlocked: this.state.maxUnlocked,
      onLevelSelect: levelId => this.loadLevel(levelId)
    });

    if (level.lockedPlaceholder) {
      DetectivesUI.renderPlaceholder(level);
      return;
    }

    this.state.board = DetectivesLogic.emptyBoard(level);

    DetectivesUI.renderGame({
      level,
      board: this.state.board,
      onCellClick: button => this.cycleCell(button),
      onCheck: () => this.checkCurrentLevel(),
      onLogicCheck: () => this.checkCurrentInconsistencies(),
      onReset: () => this.loadLevel(level.id)
    });
  },

  cycleCell(button) {
    const row = button.dataset.row;
    const col = button.dataset.col;
    const current = this.state.board[row][col];
    const next = DetectivesLogic.getNextCellState(current);

    this.state.board[row][col] = next;
    DetectivesUI.updateCell(button, next);
  },

  checkCurrentLevel() {
    const level = DetectivesLogic.getLevel(this.levels, this.state.currentLevel);
    const result = DetectivesLogic.checkSolution(level, this.state.board);

    DetectivesUI.markErrors(result.errors);

    if (result.errors.length) {
      DetectivesUI.setFeedback(
        "danger",
        `Hay ${result.errors.length} marca${result.errors.length === 1 ? "" : "s"} que no encaja${result.errors.length === 1 ? "" : "n"} con las pistas. No cambio la respuesta: revisa las casillas destacadas.`
      );
      return false;
    }

    if (result.pending.length) {
      DetectivesUI.setFeedback(
        "warning",
        `No hay errores en lo marcado, pero todavía quedan ${result.pending.length} casillas pendientes. Sigue descartando antes de cerrar el caso.`
      );
      return false;
    }

    const nextLevel = Math.min(level.id + 1, this.levels.length);

    if (nextLevel > this.state.maxUnlocked) {
      this.state.maxUnlocked = nextLevel;
      DetectivesStorage.setMaxUnlocked(this.state.maxUnlocked);
    }

    DetectivesUI.renderLevels({
      levels: this.levels,
      currentLevel: this.state.currentLevel,
      maxUnlocked: this.state.maxUnlocked,
      onLevelSelect: levelId => this.loadLevel(levelId)
    });

    DetectivesUI.setFeedback(
      "success",
      "Caso resuelto. Has usado las pistas de forma coherente y la tabla está completa."
    );

    DetectivesUI.showCheckpoint(level);
    return true;
  },

  checkCurrentInconsistencies() {
    const level = DetectivesLogic.getLevel(this.levels, this.state.currentLevel);
    const errors = DetectivesLogic.findInconsistencies(level, this.state.board);

    DetectivesUI.markErrors(errors);

    if (errors.length) {
      DetectivesUI.setFeedback(
        "warning",
        "Hay una incoherencia interna: alguna fila o columna tiene demasiadas opciones seguras dentro de una categoría."
      );
      return false;
    }

    DetectivesUI.setFeedback(
      "success",
      "No detecto incoherencias internas en tu hipótesis. Ahora comprueba si coincide con todas las pistas."
    );
    return true;
  },

  runSmokeTests() {
    const nodes = DetectivesUI.nodes;
    console.assert(
      [nodes.levelsList, nodes.gameArea, nodes.progressText, nodes.progressFill, nodes.codeInput, nodes.codeButton].every(Boolean),
      "Test DOM inicial: faltan nodos base de la app."
    );

    console.assert(
      Array.isArray(this.levels) && this.levels.length >= 8,
      "Test niveles: deberían existir al menos 8 niveles."
    );

    console.assert(
      this.levels[0].rows.length === 2 && this.levels[0].cols.length === 2,
      "Test nivel 1: debería ser 2x2."
    );

    console.assert(
      Object.keys(this.unlockCodes).includes("DETECTIVE"),
      "Test códigos: falta el código DETECTIVE."
    );

    this.loadLevel(1);

    console.assert(Boolean(nodes.gameArea.querySelector("#checkButton")), "Test render: falta #checkButton.");
    console.assert(Boolean(nodes.gameArea.querySelector("#logicButton")), "Test render: falta #logicButton.");
    console.assert(Boolean(nodes.gameArea.querySelector("#resetButton")), "Test render: falta #resetButton.");
    console.assert(nodes.gameArea.querySelectorAll(".cell-btn").length === 4, "Test render: el nivel 1 debería tener 4 casillas interactivas.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  DetectivesApp.init();
});
