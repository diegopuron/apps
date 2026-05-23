export const STORAGE_KEYS = {
  bestScore: 'futbol_provincias_best_score'
};

export const state = {
  jugando: false,
  modo: 'clasico',
  rondasObjetivo: 10,
  quedan: 0,
  puntos: 0,
  racha: 0,
  mejor: Number(localStorage.getItem(STORAGE_KEYS.bestScore) || 0),
  equipoActual: null,
  falloPrevio: false,
  timer: null,
  tiempoRestante: 0,
  mapaLibre: false,
  ccaaHint: null
};
