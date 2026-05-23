export const STORAGE_KEYS = {
  bestScore: 'provincias_espana_best_score'
};

export const state = {
  jugando: false,
  modo: 'clasico',
  rondasObjetivo: 10,
  quedan: 0,
  puntos: 0,
  racha: 0,
  mejor: Number(localStorage.getItem(STORAGE_KEYS.bestScore) || 0),
  provinciaActual: null,
  falloPrevio: false,
  timer: null,
  tiempoRestante: 0,
  mapaLibre: false,
  ccaaHint: null
};
