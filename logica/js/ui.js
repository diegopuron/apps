const DetectivesUI = {
  nodes: {
    levelsList: document.querySelector("#levelsList"),
    gameArea: document.querySelector("#gameArea"),
    progressText: document.querySelector("#progressText"),
    progressFill: document.querySelector("#progressFill"),
    codeInput: document.querySelector("#codeInput"),
    codeButton: document.querySelector("#codeButton")
  },

  renderLevels({ levels, currentLevel, maxUnlocked, onLevelSelect }) {
    this.nodes.levelsList.innerHTML = "";

    levels.forEach(level => {
      const unlocked = level.id <= maxUnlocked;
      const card = document.createElement("article");

      card.className = `level-card ${level.id === currentLevel ? "active" : ""} ${unlocked ? "" : "locked"}`;
      card.innerHTML = `
        <div class="level-title">
          <span>Nivel ${level.id}</span>
          <span>${unlocked ? "🔓" : "🔒"}</span>
        </div>
        <div class="level-meta"><strong>${level.title}</strong><br>${level.type}</div>
      `;

      card.addEventListener("click", () => {
        if (!unlocked) return;
        onLevelSelect(level.id);
      });

      this.nodes.levelsList.appendChild(card);
    });

    this.nodes.progressText.textContent = `Nivel ${maxUnlocked} de ${levels.length} desbloqueado`;
    this.nodes.progressFill.style.width = `${(maxUnlocked / levels.length) * 100}%`;
  },

  renderPlaceholder(level) {
    this.nodes.gameArea.innerHTML = `
      <div class="mission-header">
        <div>
          <span class="badge">🚧 Próximamente</span>
          <h2>Nivel ${level.id}: ${level.title}</h2>
          <p class="situation">
            La arquitectura ya está preparada para añadir este caso al archivo
            <strong>js/levels.js</strong>. Solo faltan pistas, filas, columnas y solución.
          </p>
        </div>
      </div>
      <div class="feedback warning">
        Este nivel está desbloqueado como checkpoint, pero todavía no tiene caso jugable en esta primera versión.
      </div>
    `;
  },

  renderGame({ level, board, onCellClick, onCheck, onLogicCheck, onReset }) {
    const clueItems = level.clues.map((clue, index) => `
      <li><span class="clue-number">${index + 1}</span><span>${clue}</span></li>
    `).join("");

    const headerCells = level.cols.map((col, index) => {
      const extraStyle = level.categoryBreaks?.includes(index) ? "style='border-left: 4px solid #c7d2fe;'" : "";
      return `<th ${extraStyle}>${col}</th>`;
    }).join("");

    const bodyRows = level.rows.map(row => {
      const cells = level.cols.map((col, index) => {
        const extraStyle = level.categoryBreaks?.includes(index) ? "style='border-left: 4px solid #c7d2fe;'" : "";
        return `
          <td ${extraStyle}>
            <button class="cell-btn" data-row="${row}" data-col="${col}" aria-label="${row} - ${col}">
              ${DetectivesLogic.cellSymbols[board[row][col]]}
            </button>
          </td>
        `;
      }).join("");

      return `<tr><td>${row}</td>${cells}</tr>`;
    }).join("");

    this.nodes.gameArea.innerHTML = `
      <div class="mission-header">
        <div>
          <span class="badge">Caso ${level.id} · ${level.type}</span>
          <h2>${level.title}</h2>
          <p class="situation">${level.situation}</p>
        </div>
      </div>

      <ul class="clues">${clueItems}</ul>

      <div class="thinking-help" aria-label="Estrategia de resolución">
        <div class="hint-card"><strong>1. Lee literal</strong>Primero marca solo lo que dicen las pistas de forma directa.</div>
        <div class="hint-card"><strong>2. Descarta</strong>Si una persona ya tiene una opción segura, las demás de esa categoría suelen ser imposibles.</div>
        <div class="hint-card"><strong>3. Comprueba</strong>Antes de validar, revisa si alguna fila o columna tiene dos ✅ donde solo debería haber una.</div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Detectives</th>${headerCells}</tr>
          </thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>

      <div class="actions">
        <button class="btn-primary" id="checkButton" type="button">Comprobar hipótesis</button>
        <button class="btn-ghost" id="logicButton" type="button">Buscar incoherencias</button>
        <button class="btn-danger-soft" id="resetButton" type="button">Reiniciar caso</button>
      </div>

      <div class="feedback" id="feedback">
        Marca cada casilla: pendiente ·, seguro ✅ o imposible ❌. Después comprueba tu hipótesis.
      </div>
      <div class="checkpoint" id="checkpointBox"></div>
    `;

    this.nodes.gameArea.querySelectorAll(".cell-btn").forEach(button => {
      button.addEventListener("click", () => onCellClick(button));
    });

    this.nodes.gameArea.querySelector("#checkButton")?.addEventListener("click", onCheck);
    this.nodes.gameArea.querySelector("#logicButton")?.addEventListener("click", onLogicCheck);
    this.nodes.gameArea.querySelector("#resetButton")?.addEventListener("click", onReset);
  },

  updateCell(button, value) {
    button.textContent = DetectivesLogic.cellSymbols[value];
    button.classList.remove("yes", "no", "error");

    if (value === "yes") button.classList.add("yes");
    if (value === "no") button.classList.add("no");
  },

  setFeedback(kind, message) {
    const feedback = this.nodes.gameArea.querySelector("#feedback");
    if (!feedback) return;

    feedback.className = `feedback ${kind || ""}`;
    feedback.innerHTML = message;
  },

  clearErrors() {
    this.nodes.gameArea.querySelectorAll(".cell-btn").forEach(button => button.classList.remove("error"));
  },

  markErrors(errors) {
    this.clearErrors();

    errors.forEach(error => {
      const selector = `.cell-btn[data-row="${this.cssEscape(error.row)}"][data-col="${this.cssEscape(error.col)}"]`;
      const button = this.nodes.gameArea.querySelector(selector);
      if (button) button.classList.add("error");
    });
  },

  showCheckpoint(level) {
    const checkpointBox = this.nodes.gameArea.querySelector("#checkpointBox");
    if (!checkpointBox || !level.checkpoint) return;

    checkpointBox.style.display = "block";
    checkpointBox.innerHTML = `Código de progreso desbloqueado: <code>${level.checkpoint}</code>`;
  },

  cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return CSS.escape(value);
    return String(value).replace(/"/g, '\"');
  }
};
