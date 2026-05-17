const DetectivesLogic = {
  cellSymbols: {
    unknown: "·",
    yes: "✅",
    no: "❌"
  },

  clampUnlockedLevel(value, totalLevels) {
    if (!Number.isFinite(value)) return 1;
    return Math.min(Math.max(Math.trunc(value), 1), totalLevels);
  },

  getLevel(levels, id) {
    return levels.find(level => level.id === id) || levels[0];
  },

  emptyBoard(level) {
    const board = {};

    level.rows.forEach(row => {
      board[row] = {};
      level.cols.forEach(col => {
        board[row][col] = "unknown";
      });
    });

    return board;
  },

  getNextCellState(current) {
    if (current === "unknown") return "yes";
    if (current === "yes") return "no";
    return "unknown";
  },

  getCategoryGroups(level) {
    if (!level.categoryBreaks || level.categoryBreaks.length === 0) {
      return [level.cols];
    }

    const points = [0, ...level.categoryBreaks, level.cols.length];
    const groups = [];

    for (let index = 0; index < points.length - 1; index++) {
      groups.push(level.cols.slice(points[index], points[index + 1]));
    }

    return groups;
  },

  checkSolution(level, board) {
    const errors = [];
    const pending = [];

    level.rows.forEach(row => {
      level.cols.forEach(col => {
        const userValue = board[row][col];
        const correctValue = level.solution[row][col];

        if (userValue === "unknown") pending.push({ row, col });
        else if (userValue !== correctValue) errors.push({ row, col });
      });
    });

    return {
      isSolved: errors.length === 0 && pending.length === 0,
      errors,
      pending
    };
  },

  findInconsistencies(level, board) {
    const errors = [];
    const groups = this.getCategoryGroups(level);

    level.rows.forEach(row => {
      groups.forEach(group => {
        const yesCells = group.filter(col => board[row][col] === "yes");
        if (yesCells.length > 1) {
          yesCells.forEach(col => errors.push({ row, col }));
        }
      });
    });

    groups.forEach(group => {
      group.forEach(col => {
        const yesRows = level.rows.filter(row => board[row][col] === "yes");
        if (yesRows.length > 1) {
          yesRows.forEach(row => errors.push({ row, col }));
        }
      });
    });

    return errors;
  }
};
