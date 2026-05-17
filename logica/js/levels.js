const DETECTIVES_LEVELS = [
  {
    id: 1,
    title: "El recreo rápido",
    type: "Una categoría",
    checkpoint: "DETECTIVE",
    situation: "Ana y Bruno han traído bocadillos distintos. Uno es de tortilla y otro es de queso.",
    rows: ["Ana", "Bruno"],
    cols: ["Tortilla", "Queso"],
    clues: [
      "Ana no ha traído el bocadillo de queso.",
      "Cada persona tiene un único bocadillo y no se repiten."
    ],
    solution: {
      Ana: { Tortilla: "yes", Queso: "no" },
      Bruno: { Tortilla: "no", Queso: "yes" }
    }
  },
  {
    id: 2,
    title: "Meriendas cruzadas",
    type: "3 x 3",
    checkpoint: null,
    situation: "Ana, Bruno y Carla han traído meriendas distintas: fruta, yogur y bocadillo.",
    rows: ["Ana", "Bruno", "Carla"],
    cols: ["Fruta", "Yogur", "Bocadillo"],
    clues: [
      "Bruno no ha traído fruta.",
      "Carla ha traído yogur.",
      "Ana no ha traído bocadillo."
    ],
    solution: {
      Ana: { Fruta: "yes", Yogur: "no", Bocadillo: "no" },
      Bruno: { Fruta: "no", Yogur: "no", Bocadillo: "yes" },
      Carla: { Fruta: "no", Yogur: "yes", Bocadillo: "no" }
    }
  },
  {
    id: 3,
    title: "Club de lectura",
    type: "Dos categorías",
    checkpoint: "PISTAS",
    situation: "Tres alumnos han elegido un libro y un lugar de lectura. Primero deduce el libro de cada persona. Después, el lugar.",
    rows: ["Iria", "Mateo", "Noa"],
    cols: ["Cómic", "Misterio", "Aventura", "Biblioteca", "Patio", "Aula"],
    categoryBreaks: [3],
    clues: [
      "Iria no eligió cómic ni leyó en el patio.",
      "Mateo eligió aventura.",
      "Quien eligió misterio leyó en la biblioteca.",
      "Noa leyó en el aula."
    ],
    solution: {
      Iria: { Cómic: "no", Misterio: "yes", Aventura: "no", Biblioteca: "yes", Patio: "no", Aula: "no" },
      Mateo: { Cómic: "no", Misterio: "no", Aventura: "yes", Biblioteca: "no", Patio: "yes", Aula: "no" },
      Noa: { Cómic: "yes", Misterio: "no", Aventura: "no", Biblioteca: "no", Patio: "no", Aula: "yes" }
    }
  },
  { id: 4, title: "Negativos en cadena", type: "Diseñado para crecer", lockedPlaceholder: true },
  { id: 5, title: "Inferencias encadenadas", type: "Diseñado para crecer", lockedPlaceholder: true, checkpoint: "DEDUCCION" },
  { id: 6, title: "Tabla completa", type: "Diseñado para crecer", lockedPlaceholder: true },
  { id: 7, title: "Pistas ambiguas", type: "Diseñado para crecer", lockedPlaceholder: true },
  { id: 8, title: "Reto final", type: "Diseñado para crecer", lockedPlaceholder: true, checkpoint: "SHERLOCK" }
];

const DETECTIVES_UNLOCK_CODES = {
  DETECTIVE: 1,
  PISTAS: 3,
  DEDUCCION: 5,
  SHERLOCK: 8
};
