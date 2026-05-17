const DetectivesStorage = {
  key: "detectivesMaxUnlocked",

  getMaxUnlocked(defaultValue = 1) {
    const storedValue = Number(localStorage.getItem(this.key));
    if (!Number.isFinite(storedValue)) return defaultValue;
    return storedValue;
  },

  setMaxUnlocked(value) {
    localStorage.setItem(this.key, String(value));
  },

  reset() {
    localStorage.removeItem(this.key);
  }
};
