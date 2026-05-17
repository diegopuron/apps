const DETECTIVES_LEVELS = [
  {
    id: 1,
    title: "El recreo rápido",
    type: "2 x 2 · lectura literal",
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
    type: "3 x 3 · dato seguro",
    checkpoint: null,
    situation: "Ana, Bruno y Carla han traído meriendas distintas: fruta, yogur y bocadillo.",
    rows: ["Ana", "Bruno", "Carla"],
    cols: ["Fruta", "Yogur", "Bocadillo"],
    clues: [
      "Carla ha traído yogur.",
      "Bruno no ha traído fruta.",
      "Ana no ha traído bocadillo.",
      "Cada merienda pertenece a una sola persona."
    ],
    solution: {
      Ana: { Fruta: "yes", Yogur: "no", Bocadillo: "no" },
      Bruno: { Fruta: "no", Yogur: "no", Bocadillo: "yes" },
      Carla: { Fruta: "no", Yogur: "yes", Bocadillo: "no" }
    }
  },
  {
    id: 3,
    title: "Los libros prestados",
    type: "3 x 3 · descarte por eliminación",
    checkpoint: "PISTAS",
    situation: "Iria, Mateo y Noa han cogido un libro distinto de la biblioteca: cómic, misterio y aventura.",
    rows: ["Iria", "Mateo", "Noa"],
    cols: ["Cómic", "Misterio", "Aventura"],
    clues: [
      "Iria no cogió el cómic.",
      "Mateo no cogió el cómic ni el libro de aventura.",
      "Noa no cogió el libro de misterio.",
      "Cada libro fue elegido por una sola persona."
    ],
    solution: {
      Iria: { Cómic: "no", Misterio: "no", Aventura: "yes" },
      Mateo: { Cómic: "no", Misterio: "yes", Aventura: "no" },
      Noa: { Cómic: "yes", Misterio: "no", Aventura: "no" }
    }
  },
  {
    id: 4,
    title: "El material desaparecido",
    type: "3 x 3 · sin pista positiva directa",
    checkpoint: null,
    situation: "Lara, Nico y Vera han usado materiales distintos en clase: regla, compás y tijeras. Ninguna pista dice directamente quién tiene qué.",
    rows: ["Lara", "Nico", "Vera"],
    cols: ["Regla", "Compás", "Tijeras"],
    clues: [
      "Lara no usó la regla.",
      "Nico no usó la regla ni las tijeras.",
      "Vera no usó el compás.",
      "Cada material fue usado por una sola persona."
    ],
    solution: {
      Lara: { Regla: "no", Compás: "no", Tijeras: "yes" },
      Nico: { Regla: "no", Compás: "yes", Tijeras: "no" },
      Vera: { Regla: "yes", Compás: "no", Tijeras: "no" }
    }
  },
  {
    id: 5,
    title: "Club de lectura",
    type: "2 categorías · objeto y lugar",
    checkpoint: "DEDUCCION",
    situation: "Tres alumnos eligieron un tipo de libro y un lugar para leer. Hay que deducir ambas cosas.",
    rows: ["Iria", "Mateo", "Noa"],
    cols: ["Cómic", "Misterio", "Aventura", "Biblioteca", "Patio", "Aula"],
    categoryBreaks: [3],
    clues: [
      "Mateo eligió aventura.",
      "Quien eligió misterio leyó en la biblioteca.",
      "Noa leyó en el aula.",
      "Iria no eligió cómic ni leyó en el patio.",
      "Cada libro y cada lugar corresponden a una sola persona."
    ],
    solution: {
      Iria: { Cómic: "no", Misterio: "yes", Aventura: "no", Biblioteca: "yes", Patio: "no", Aula: "no" },
      Mateo: { Cómic: "no", Misterio: "no", Aventura: "yes", Biblioteca: "no", Patio: "yes", Aula: "no" },
      Noa: { Cómic: "yes", Misterio: "no", Aventura: "no", Biblioteca: "no", Patio: "no", Aula: "yes" }
    }
  },
  {
    id: 6,
    title: "Excursión al museo",
    type: "2 categorías · relación cruzada",
    checkpoint: null,
    situation: "Álex, Blanca y Diego llevaron una mochila de color distinto y visitaron una sala diferente del museo.",
    rows: ["Álex", "Blanca", "Diego"],
    cols: ["Roja", "Azul", "Verde", "Historia", "Ciencia", "Arte"],
    categoryBreaks: [3],
    clues: [
      "La persona de la mochila verde visitó la sala de Arte.",
      "Blanca no llevaba mochila azul.",
      "Diego visitó la sala de Ciencia.",
      "Álex no visitó la sala de Historia.",
      "Blanca no visitó la sala de Arte.",
      "Cada color y cada sala corresponden a una sola persona."
    ],
    solution: {
      Álex: { Roja: "no", Azul: "no", Verde: "yes", Historia: "no", Ciencia: "no", Arte: "yes" },
      Blanca: { Roja: "yes", Azul: "no", Verde: "no", Historia: "yes", Ciencia: "no", Arte: "no" },
      Diego: { Roja: "no", Azul: "yes", Verde: "no", Historia: "no", Ciencia: "yes", Arte: "no" }
    }
  },
  {
    id: 7,
    title: "El torneo de juegos",
    type: "3 x 3 · pista ambigua controlada",
    checkpoint: null,
    situation: "Sara, Leo y Hugo participaron en juegos distintos: ajedrez, cartas y tangram. Una pista deja dos posibilidades abiertas hasta combinarla con las demás.",
    rows: ["Sara", "Leo", "Hugo"],
    cols: ["Ajedrez", "Cartas", "Tangram"],
    clues: [
      "Sara no jugó al ajedrez.",
      "Entre Sara y Leo, uno jugó a las cartas.",
      "Hugo no jugó al tangram.",
      "Leo no jugó al ajedrez.",
      "Cada juego fue elegido por una sola persona."
    ],
    solution: {
      Sara: { Ajedrez: "no", Cartas: "no", Tangram: "yes" },
      Leo: { Ajedrez: "no", Cartas: "yes", Tangram: "no" },
      Hugo: { Ajedrez: "yes", Cartas: "no", Tangram: "no" }
    }
  },
  {
    id: 8,
    title: "El caso final del laboratorio",
    type: "reto final · 2 categorías e inferencia encadenada",
    checkpoint: "SHERLOCK",
    situation: "Tres equipos resolvieron un reto de laboratorio. Cada equipo usó una herramienta y trabajó en una zona diferente.",
    rows: ["Equipo Alfa", "Equipo Beta", "Equipo Gamma"],
    cols: ["Lupa", "Imán", "Linterna", "Mesa 1", "Mesa 2", "Mesa 3"],
    categoryBreaks: [3],
    clues: [
      "El equipo que usó la linterna trabajó en la Mesa 3.",
      "El Equipo Alfa no usó la lupa.",
      "El Equipo Beta no trabajó en la Mesa 1.",
      "El Equipo Gamma usó el imán.",
      "El equipo de la Mesa 2 no usó la lupa.",
      "El Equipo Alfa no trabajó en la Mesa 3.",
      "Cada herramienta y cada mesa corresponden a un solo equipo."
    ],
    solution: {
      "Equipo Alfa": { Lupa: "no", Imán: "no", Linterna: "yes", "Mesa 1": "no", "Mesa 2": "no", "Mesa 3": "yes" },
      "Equipo Beta": { Lupa: "yes", Imán: "no", Linterna: "no", "Mesa 1": "yes", "Mesa 2": "no", "Mesa 3": "no" },
      "Equipo Gamma": { Lupa: "no", Imán: "yes", Linterna: "no", "Mesa 1": "no", "Mesa 2": "yes", "Mesa 3": "no" }
    }
  }
];

const DETECTIVES_UNLOCK_CODES = {
  DETECTIVE: 1,
  PISTAS: 3,
  DEDUCCION: 5,
  SHERLOCK: 8
};
