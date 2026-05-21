const makeSolution = (rows, categories, answers) => {
  const cols = categories.flatMap(category => category.items);
  const solution = {};

  rows.forEach(row => {
    solution[row] = {};
    cols.forEach(col => {
      solution[row][col] = Object.values(answers[row]).includes(col) ? "yes" : "no";
    });
  });

  return solution;
};

const makeCategoryBreaks = categories => {
  const breaks = [];
  let total = 0;

  categories.slice(0, -1).forEach(category => {
    total += category.items.length;
    breaks.push(total);
  });

  return breaks;
};

const makeLevel = ({ id, title, type, checkpoint = null, situation, rows, categories, clues, answers }) => {
  const cols = categories.flatMap(category => category.items);
  return {
    id,
    title,
    type,
    checkpoint,
    situation,
    rows,
    cols,
    categoryBreaks: makeCategoryBreaks(categories),
    clues,
    solution: makeSolution(rows, categories, answers)
  };
};

const DETECTIVES_LEVELS = [
  makeLevel({
    id: 1,
    title: "El recreo rápido",
    type: "Aprendiz · 2 x 2",
    checkpoint: "DETECTIVE",
    situation: "Ana y Bruno han traído bocadillos distintos. Uno es de tortilla y otro es de queso.",
    rows: ["Ana", "Bruno"],
    categories: [
      { name: "Bocadillo", items: ["Tortilla", "Queso"] }
    ],
    clues: [
      "Ana no ha traído el bocadillo de queso.",
      "Cada persona tiene un único bocadillo y no se repiten."
    ],
    answers: {
      Ana: { bocadillo: "Tortilla" },
      Bruno: { bocadillo: "Queso" }
    }
  }),
  makeLevel({
    id: 2,
    title: "Meriendas cruzadas",
    type: "Aprendiz · 3 x 3",
    situation: "Ana, Bruno y Carla han traído meriendas distintas: fruta, yogur y bocadillo.",
    rows: ["Ana", "Bruno", "Carla"],
    categories: [
      { name: "Merienda", items: ["Fruta", "Yogur", "Bocadillo"] }
    ],
    clues: [
      "Bruno no ha traído fruta.",
      "Carla ha traído yogur.",
      "Ana no ha traído bocadillo."
    ],
    answers: {
      Ana: { merienda: "Fruta" },
      Bruno: { merienda: "Bocadillo" },
      Carla: { merienda: "Yogur" }
    }
  }),
  makeLevel({
    id: 3,
    title: "Club de lectura",
    type: "Aprendiz · Dos categorías",
    checkpoint: "PISTAS",
    situation: "Tres alumnos han elegido un libro y un lugar de lectura. Primero deduce el libro de cada persona. Después, el lugar.",
    rows: ["Iria", "Mateo", "Noa"],
    categories: [
      { name: "Libro", items: ["Cómic", "Misterio", "Aventura"] },
      { name: "Lugar", items: ["Biblioteca", "Patio", "Aula"] }
    ],
    clues: [
      "Iria no eligió cómic ni leyó en el patio.",
      "Mateo eligió aventura.",
      "Quien eligió misterio leyó en la biblioteca.",
      "Noa leyó en el aula."
    ],
    answers: {
      Iria: { libro: "Misterio", lugar: "Biblioteca" },
      Mateo: { libro: "Aventura", lugar: "Patio" },
      Noa: { libro: "Cómic", lugar: "Aula" }
    }
  }),
  makeLevel({
    id: 4,
    title: "Negativos en cadena",
    type: "Investigador · Descarte múltiple",
    situation: "Tres detectives investigan una desaparición de material. Cada uno revisó una zona distinta y encontró un objeto distinto.",
    rows: ["Lara", "Pablo", "Sara"],
    categories: [
      { name: "Zona", items: ["Gimnasio", "Biblioteca", "Comedor"] },
      { name: "Objeto", items: ["Llaves", "Cuaderno", "Silbato"] }
    ],
    clues: [
      "Lara no revisó el gimnasio ni encontró las llaves.",
      "Pablo revisó la biblioteca.",
      "Quien revisó el comedor encontró el silbato.",
      "Sara no encontró el cuaderno."
    ],
    answers: {
      Lara: { zona: "Comedor", objeto: "Silbato" },
      Pablo: { zona: "Biblioteca", objeto: "Cuaderno" },
      Sara: { zona: "Gimnasio", objeto: "Llaves" }
    }
  }),
  makeLevel({
    id: 5,
    title: "Talleres secretos",
    type: "Investigador · Inferencias encadenadas",
    checkpoint: "DEDUCCION",
    situation: "Cuatro alumnos participaron en talleres distintos y usaron herramientas distintas. Hay que cruzar taller y herramienta.",
    rows: ["Aitor", "Berta", "Celia", "Dani"],
    categories: [
      { name: "Taller", items: ["Robótica", "Cómic", "Radio", "Huerto"] },
      { name: "Herramienta", items: ["Tablet", "Rotulador", "Micrófono", "Regadera"] }
    ],
    clues: [
      "Celia estuvo en radio.",
      "Quien estuvo en radio usó micrófono.",
      "Aitor no usó tablet ni regadera.",
      "Berta estuvo en robótica.",
      "El taller de huerto necesitó la regadera."
    ],
    answers: {
      Aitor: { taller: "Cómic", herramienta: "Rotulador" },
      Berta: { taller: "Robótica", herramienta: "Tablet" },
      Celia: { taller: "Radio", herramienta: "Micrófono" },
      Dani: { taller: "Huerto", herramienta: "Regadera" }
    }
  }),
  makeLevel({
    id: 6,
    title: "El horario imposible",
    type: "Investigador · Tres categorías",
    situation: "Cuatro grupos hicieron una actividad, en una hora y con un material distinto. No todas las pistas son directas.",
    rows: ["Equipo Azul", "Equipo Rojo", "Equipo Verde", "Equipo Lila"],
    categories: [
      { name: "Actividad", items: ["Mapa", "Experimento", "Debate", "Cálculo"] },
      { name: "Hora", items: ["9:00", "10:00", "11:00", "12:00"] },
      { name: "Material", items: ["Brújula", "Probeta", "Tarjetas", "Regla"] }
    ],
    clues: [
      "El Equipo Rojo hizo el experimento y usó la probeta.",
      "El Equipo Azul no empezó a las 9:00 ni usó tarjetas.",
      "Quien hizo cálculo empezó a las 12:00 y usó la regla.",
      "El Equipo Verde hizo el debate.",
      "El mapa se hizo a las 9:00."
    ],
    answers: {
      "Equipo Azul": { actividad: "Cálculo", hora: "12:00", material: "Regla" },
      "Equipo Rojo": { actividad: "Experimento", hora: "10:00", material: "Probeta" },
      "Equipo Verde": { actividad: "Debate", hora: "11:00", material: "Tarjetas" },
      "Equipo Lila": { actividad: "Mapa", hora: "9:00", material: "Brújula" }
    }
  }),
  makeLevel({
    id: 7,
    title: "Pistas que sobran",
    type: "Investigador · Filtrar información",
    situation: "En la feria del colegio, cuatro alumnos llevaron una camiseta de color distinto, eligieron un puesto y vendieron un producto. Algunas frases solo decoran la historia.",
    rows: ["Nora", "Leo", "Mina", "Teo"],
    categories: [
      { name: "Puesto", items: ["Juegos", "Libros", "Música", "Café"] },
      { name: "Producto", items: ["Pulseras", "Marcapáginas", "Chapas", "Bizcocho"] },
      { name: "Color", items: ["Rojo", "Azul", "Verde", "Negro"] }
    ],
    clues: [
      "Nora no estuvo en libros ni vendió bizcocho.",
      "Leo llevó camiseta azul y estuvo en música.",
      "El puesto de café vendió bizcocho.",
      "Mina vendió marcapáginas.",
      "La camiseta negra gustó mucho, pero eso no cambia ninguna pista.",
      "Teo no llevó camiseta verde."
    ],
    answers: {
      Nora: { puesto: "Juegos", producto: "Pulseras", color: "Verde" },
      Leo: { puesto: "Música", producto: "Chapas", color: "Azul" },
      Mina: { puesto: "Libros", producto: "Marcapáginas", color: "Negro" },
      Teo: { puesto: "Café", producto: "Bizcocho", color: "Rojo" }
    }
  }),
  makeLevel({
    id: 8,
    title: "Robo en la biblioteca",
    type: "Investigador · Caso completo",
    checkpoint: "SHERLOCK",
    situation: "Cuatro sospechosos estuvieron en zonas distintas, dejaron una pista distinta y salieron por una puerta distinta.",
    rows: ["Alicia", "Bruno", "Clara", "Diego"],
    categories: [
      { name: "Zona", items: ["Novela", "Ciencia", "Cómic", "Historia"] },
      { name: "Pista", items: ["Huella", "Nota", "Pluma", "Ticket"] },
      { name: "Salida", items: ["Norte", "Sur", "Este", "Oeste"] }
    ],
    clues: [
      "Clara estuvo en la zona de cómic.",
      "Quien estuvo en ciencia dejó una nota y salió por el sur.",
      "Alicia no dejó huella ni salió por el oeste.",
      "Diego salió por el norte.",
      "La pluma apareció en historia.",
      "Bruno no estuvo en novela."
    ],
    answers: {
      Alicia: { zona: "Historia", pista: "Pluma", salida: "Este" },
      Bruno: { zona: "Ciencia", pista: "Nota", salida: "Sur" },
      Clara: { zona: "Cómic", pista: "Ticket", salida: "Oeste" },
      Diego: { zona: "Novela", pista: "Huella", salida: "Norte" }
    }
  }),
  makeLevel({
    id: 9,
    title: "El campeonato de enigmas",
    type: "Sherlock · Relaciones cruzadas",
    situation: "Cuatro participantes resolvieron un tipo de enigma, consiguieron una insignia y quedaron en una posición distinta.",
    rows: ["Gael", "Hugo", "Irene", "Julia"],
    categories: [
      { name: "Enigma", items: ["Cifras", "Sombras", "Mapas", "Patrones"] },
      { name: "Insignia", items: ["Lupa", "Llave", "Brújula", "Reloj"] },
      { name: "Puesto", items: ["1.º", "2.º", "3.º", "4.º"] }
    ],
    clues: [
      "Irene resolvió mapas y consiguió la brújula.",
      "La insignia de reloj fue para quien quedó 4.º.",
      "Gael no resolvió cifras ni quedó 2.º.",
      "Hugo consiguió la llave.",
      "Quien resolvió patrones quedó 1.º.",
      "Julia no quedó 4.º."
    ],
    answers: {
      Gael: { enigma: "Patrones", insignia: "Lupa", puesto: "1.º" },
      Hugo: { enigma: "Sombras", insignia: "Llave", puesto: "4.º" },
      Irene: { enigma: "Mapas", insignia: "Brújula", puesto: "3.º" },
      Julia: { enigma: "Cifras", insignia: "Reloj", puesto: "2.º" }
    }
  }),
  makeLevel({
    id: 10,
    title: "Laboratorio de mezclas",
    type: "Sherlock · Cadena larga",
    checkpoint: "LABORATORIO",
    situation: "En el laboratorio, cada equipo mezcló una sustancia, observó un cambio y registró una temperatura.",
    rows: ["Equipo A", "Equipo B", "Equipo C", "Equipo D"],
    categories: [
      { name: "Sustancia", items: ["Sal", "Azúcar", "Arena", "Vinagre"] },
      { name: "Cambio", items: ["Burbujea", "Se disuelve", "Se deposita", "Cambia color"] },
      { name: "Temperatura", items: ["Fría", "Templada", "Caliente", "Muy caliente"] }
    ],
    clues: [
      "El Equipo C usó arena y observó que se deposita.",
      "El vinagre produjo burbujas.",
      "El Equipo A no trabajó con sal ni con temperatura fría.",
      "El azúcar se disolvió en agua caliente.",
      "El Equipo D registró temperatura templada.",
      "El cambio de color no ocurrió con sal."
    ],
    answers: {
      "Equipo A": { sustancia: "Azúcar", cambio: "Se disuelve", temperatura: "Caliente" },
      "Equipo B": { sustancia: "Vinagre", cambio: "Burbujea", temperatura: "Fría" },
      "Equipo C": { sustancia: "Arena", cambio: "Se deposita", temperatura: "Muy caliente" },
      "Equipo D": { sustancia: "Sal", cambio: "Cambia color", temperatura: "Templada" }
    }
  }),
  makeLevel({
    id: 11,
    title: "El caso de los mensajes",
    type: "Sherlock · Información parcial",
    situation: "Cuatro mensajes anónimos se enviaron desde dispositivos distintos, con temas distintos y a horas distintas.",
    rows: ["Mensaje 1", "Mensaje 2", "Mensaje 3", "Mensaje 4"],
    categories: [
      { name: "Dispositivo", items: ["Tablet", "Portátil", "Móvil", "PC"] },
      { name: "Tema", items: ["Excursión", "Deberes", "Biblioteca", "Comedor"] },
      { name: "Hora", items: ["16:00", "17:00", "18:00", "19:00"] }
    ],
    clues: [
      "El mensaje sobre biblioteca se envió desde el PC.",
      "El Mensaje 2 no trataba de deberes ni se envió a las 18:00.",
      "El móvil se usó a las 19:00.",
      "El Mensaje 4 trataba sobre comedor.",
      "El portátil se usó para hablar de deberes.",
      "El Mensaje 1 se envió a las 17:00."
    ],
    answers: {
      "Mensaje 1": { dispositivo: "Portátil", tema: "Deberes", hora: "17:00" },
      "Mensaje 2": { dispositivo: "Tablet", tema: "Excursión", hora: "16:00" },
      "Mensaje 3": { dispositivo: "PC", tema: "Biblioteca", hora: "18:00" },
      "Mensaje 4": { dispositivo: "Móvil", tema: "Comedor", hora: "19:00" }
    }
  }),
  makeLevel({
    id: 12,
    title: "Excursión con pistas cruzadas",
    type: "Sherlock · Alta carga cognitiva",
    situation: "Cuatro alumnos llevaron una mochila, se sentaron en un autobús y se encargaron de una tarea durante la excursión.",
    rows: ["Alba", "Marcos", "Olivia", "Raúl"],
    categories: [
      { name: "Mochila", items: ["Rayas", "Azul", "Negra", "Verde"] },
      { name: "Asiento", items: ["Ventana", "Pasillo", "Delante", "Atrás"] },
      { name: "Tarea", items: ["Lista", "Fotos", "Botiquín", "Mapa"] }
    ],
    clues: [
      "Raúl se sentó atrás y llevó el mapa.",
      "La mochila negra no era de Olivia.",
      "Quien se sentó junto a la ventana hizo fotos.",
      "Alba no llevó mochila azul ni se sentó en el pasillo.",
      "Marcos se encargó de la lista.",
      "La mochila verde iba con el botiquín."
    ],
    answers: {
      Alba: { mochila: "Negra", asiento: "Ventana", tarea: "Fotos" },
      Marcos: { mochila: "Rayas", asiento: "Delante", tarea: "Lista" },
      Olivia: { mochila: "Verde", asiento: "Pasillo", tarea: "Botiquín" },
      Raúl: { mochila: "Azul", asiento: "Atrás", tarea: "Mapa" }
    }
  }),
  makeLevel({
    id: 13,
    title: "Código en el pasillo",
    type: "Maestro detective · Condicional suave",
    checkpoint: "MAESTRO",
    situation: "Cuatro códigos aparecieron en puertas distintas. Cada código tenía un símbolo y un color. Una pista funciona como condición: si identificas una parte, arrastra la consecuencia.",
    rows: ["Código A", "Código B", "Código C", "Código D"],
    categories: [
      { name: "Puerta", items: ["Aula 1", "Aula 2", "Aula 3", "Aula 4"] },
      { name: "Símbolo", items: ["Estrella", "Triángulo", "Círculo", "Cuadrado"] },
      { name: "Color", items: ["Amarillo", "Rojo", "Azul", "Morado"] }
    ],
    clues: [
      "El Código B estaba en el Aula 3.",
      "Si un código tenía un círculo, entonces era azul.",
      "El Código D tenía un cuadrado y no estaba en el Aula 1.",
      "La estrella apareció en el Aula 1.",
      "El Código A no era amarillo.",
      "El código rojo estaba en el Aula 4."
    ],
    answers: {
      "Código A": { puerta: "Aula 2", símbolo: "Círculo", color: "Azul" },
      "Código B": { puerta: "Aula 3", símbolo: "Triángulo", color: "Amarillo" },
      "Código C": { puerta: "Aula 1", símbolo: "Estrella", color: "Morado" },
      "Código D": { puerta: "Aula 4", símbolo: "Cuadrado", color: "Rojo" }
    }
  }),
  makeLevel({
    id: 14,
    title: "La redacción perdida",
    type: "Maestro detective · Lectura precisa",
    situation: "Cuatro redacciones se perdieron. Cada una tenía un género, una extensión y una corrección pendiente.",
    rows: ["Texto 1", "Texto 2", "Texto 3", "Texto 4"],
    categories: [
      { name: "Género", items: ["Noticia", "Cuento", "Diálogo", "Poema"] },
      { name: "Extensión", items: ["1 página", "2 páginas", "3 páginas", "4 páginas"] },
      { name: "Corrección", items: ["Tildes", "Puntuación", "Conectores", "Márgenes"] }
    ],
    clues: [
      "El poema ocupaba 1 página y necesitaba revisar los márgenes.",
      "El Texto 2 no era cuento ni tenía 4 páginas.",
      "La noticia necesitaba revisar conectores.",
      "El Texto 4 era un diálogo.",
      "El texto de 3 páginas necesitaba revisar puntuación.",
      "El Texto 1 no necesitaba revisar tildes."
    ],
    answers: {
      "Texto 1": { género: "Noticia", extensión: "2 páginas", corrección: "Conectores" },
      "Texto 2": { género: "Poema", extensión: "1 página", corrección: "Márgenes" },
      "Texto 3": { género: "Cuento", extensión: "3 páginas", corrección: "Puntuación" },
      "Texto 4": { género: "Diálogo", extensión: "4 páginas", corrección: "Tildes" }
    }
  }),
  makeLevel({
    id: 15,
    title: "Detectives del error",
    type: "Maestro detective · Depuración lógica",
    situation: "Cuatro programas fallaron por motivos distintos. Cada uno tenía un bloque sospechoso y una consecuencia visible.",
    rows: ["Programa A", "Programa B", "Programa C", "Programa D"],
    categories: [
      { name: "Bloque", items: ["Repetir", "Mover", "Girar", "Decir"] },
      { name: "Error", items: ["Bucle", "Dirección", "Texto", "Distancia"] },
      { name: "Efecto", items: ["No para", "Sale del mapa", "Habla mal", "Se queda corto"] }
    ],
    clues: [
      "El bloque Repetir causó un bucle y el programa no paraba.",
      "El Programa C tenía un problema de dirección.",
      "El bloque Decir produjo un error de texto.",
      "El Programa A no salió del mapa ni hablaba mal.",
      "El Programa D se quedó corto.",
      "El bloque Girar no pertenece al Programa B."
    ],
    answers: {
      "Programa A": { bloque: "Repetir", error: "Bucle", efecto: "No para" },
      "Programa B": { bloque: "Decir", error: "Texto", efecto: "Habla mal" },
      "Programa C": { bloque: "Girar", error: "Dirección", efecto: "Sale del mapa" },
      "Programa D": { bloque: "Mover", error: "Distancia", efecto: "Se queda corto" }
    }
  }),
  makeLevel({
    id: 16,
    title: "La noticia sospechosa",
    type: "Maestro detective · Pensamiento crítico",
    situation: "Cuatro noticias tienen un tema, una fuente y una señal de alerta. El reto es cruzar datos sin dejarse llevar por el titular.",
    rows: ["Noticia A", "Noticia B", "Noticia C", "Noticia D"],
    categories: [
      { name: "Tema", items: ["Deporte", "Ciencia", "Colegio", "Mascotas"] },
      { name: "Fuente", items: ["Periódico", "Blog", "Red social", "Radio"] },
      { name: "Alerta", items: ["Sin fecha", "Exagera", "Sin autor", "Datos claros"] }
    ],
    clues: [
      "La noticia de ciencia venía de un periódico y tenía datos claros.",
      "La noticia de mascotas no venía de radio.",
      "La Noticia C estaba en una red social.",
      "La noticia sin autor era sobre deporte.",
      "La Noticia A no exageraba ni era del colegio.",
      "El blog no tenía fecha."
    ],
    answers: {
      "Noticia A": { tema: "Ciencia", fuente: "Periódico", alerta: "Datos claros" },
      "Noticia B": { tema: "Deporte", fuente: "Radio", alerta: "Sin autor" },
      "Noticia C": { tema: "Colegio", fuente: "Red social", alerta: "Exagera" },
      "Noticia D": { tema: "Mascotas", fuente: "Blog", alerta: "Sin fecha" }
    }
  }),
  makeLevel({
    id: 17,
    title: "El museo de pistas",
    type: "Experto · Cuatro categorías",
    checkpoint: "EXPERTO",
    situation: "Cuatro grupos visitaron salas distintas del museo, guiados por una persona, con una misión y una herramienta concreta.",
    rows: ["Grupo Norte", "Grupo Sur", "Grupo Este", "Grupo Oeste"],
    categories: [
      { name: "Sala", items: ["Romanos", "Minería", "Mar", "Arte"] },
      { name: "Guía", items: ["Eva", "Luis", "Marta", "Óscar"] },
      { name: "Misión", items: ["Dibujar", "Medir", "Comparar", "Fotografiar"] },
      { name: "Herramienta", items: ["Lápiz", "Cinta", "Tabla", "Cámara"] }
    ],
    clues: [
      "El Grupo Este visitó la sala del mar.",
      "Marta guió al grupo que tenía que comparar y usó una tabla.",
      "La sala de minería necesitó medir con cinta.",
      "El Grupo Norte no fue guiado por Eva ni usó cámara.",
      "Óscar estuvo en la sala de arte.",
      "El Grupo Sur tenía que fotografiar."
    ],
    answers: {
      "Grupo Norte": { sala: "Romanos", guía: "Luis", misión: "Dibujar", herramienta: "Lápiz" },
      "Grupo Sur": { sala: "Arte", guía: "Óscar", misión: "Fotografiar", herramienta: "Cámara" },
      "Grupo Este": { sala: "Mar", guía: "Marta", misión: "Comparar", herramienta: "Tabla" },
      "Grupo Oeste": { sala: "Minería", guía: "Eva", misión: "Medir", herramienta: "Cinta" }
    }
  }),
  makeLevel({
    id: 18,
    title: "Escape room escolar",
    type: "Experto · Deducción intensa",
    situation: "Cuatro equipos resolvieron pruebas distintas de un escape room. Cada equipo consiguió una llave, abrió una caja y tardó un tiempo diferente.",
    rows: ["Equipo Sol", "Equipo Luna", "Equipo Rayo", "Equipo Nube"],
    categories: [
      { name: "Prueba", items: ["Números", "Letras", "Sombras", "Sonidos"] },
      { name: "Llave", items: ["Dorada", "Plata", "Bronce", "Negra"] },
      { name: "Caja", items: ["Caja 1", "Caja 2", "Caja 3", "Caja 4"] },
      { name: "Tiempo", items: ["8 min", "10 min", "12 min", "14 min"] }
    ],
    clues: [
      "El Equipo Rayo resolvió sonidos y abrió la Caja 4.",
      "La llave dorada abrió la Caja 1 en 8 minutos.",
      "El Equipo Sol no resolvió letras ni tardó 14 minutos.",
      "La prueba de sombras usó la llave negra.",
      "El Equipo Luna consiguió la llave de plata.",
      "Quien resolvió letras tardó 12 minutos."
    ],
    answers: {
      "Equipo Sol": { prueba: "Números", llave: "Dorada", caja: "Caja 1", tiempo: "8 min" },
      "Equipo Luna": { prueba: "Letras", llave: "Plata", caja: "Caja 2", tiempo: "12 min" },
      "Equipo Rayo": { prueba: "Sonidos", llave: "Bronce", caja: "Caja 4", tiempo: "14 min" },
      "Equipo Nube": { prueba: "Sombras", llave: "Negra", caja: "Caja 3", tiempo: "10 min" }
    }
  }),
  makeLevel({
    id: 19,
    title: "La investigación final",
    type: "Experto · Caso largo",
    situation: "Cuatro detectives siguieron una pista, interrogaron a una persona, visitaron un lugar y descubrieron una clave. Hay muchas relaciones cruzadas.",
    rows: ["Detective A", "Detective B", "Detective C", "Detective D"],
    categories: [
      { name: "Pista", items: ["Mapa roto", "Nota azul", "Llave vieja", "Foto borrosa"] },
      { name: "Persona", items: ["Conserje", "Bibliotecaria", "Entrenador", "Cocinera"] },
      { name: "Lugar", items: ["Patio", "Almacén", "Gimnasio", "Comedor"] },
      { name: "Clave", items: ["Norte", "Sur", "Este", "Oeste"] }
    ],
    clues: [
      "El Detective C interrogó al entrenador en el gimnasio.",
      "La nota azul llevaba a la clave Sur.",
      "Quien habló con la cocinera fue al comedor.",
      "El Detective A no tenía el mapa roto ni fue al almacén.",
      "La llave vieja apareció con la clave Oeste.",
      "El Detective D habló con la bibliotecaria.",
      "La foto borrosa no llevaba al patio."
    ],
    answers: {
      "Detective A": { pista: "Nota azul", persona: "Cocinera", lugar: "Comedor", clave: "Sur" },
      "Detective B": { pista: "Mapa roto", persona: "Conserje", lugar: "Patio", clave: "Norte" },
      "Detective C": { pista: "Foto borrosa", persona: "Entrenador", lugar: "Gimnasio", clave: "Este" },
      "Detective D": { pista: "Llave vieja", persona: "Bibliotecaria", lugar: "Almacén", clave: "Oeste" }
    }
  }),
  makeLevel({
    id: 20,
    title: "Gran caso: la mente algoritmo",
    type: "Experto · Reto final",
    checkpoint: "ALGORITMO",
    situation: "El último reto mezcla lectura literal, descartes, cadenas y relaciones cruzadas. Resolverlo no va de ir rápido: va de ser ordenado.",
    rows: ["Ada", "Biel", "Cloe", "Nico"],
    categories: [
      { name: "Rol", items: ["Analista", "Programador", "Diseñadora", "Portavoz"] },
      { name: "Objeto", items: ["Cuaderno", "Robot", "Plano", "Tarjeta"] },
      { name: "Lugar", items: ["Aula", "Pasillo", "Biblioteca", "Patio"] },
      { name: "Resultado", items: ["Código", "Maqueta", "Informe", "Presentación"] }
    ],
    clues: [
      "La programadora trabajó con el robot y consiguió el código.",
      "Cloe fue la portavoz y preparó la presentación.",
      "Quien usó el plano estuvo en la biblioteca.",
      "Ada no fue analista ni trabajó en el patio.",
      "Biel usó el cuaderno.",
      "El informe se terminó en el aula.",
      "La diseñadora hizo la maqueta."
    ],
    answers: {
      Ada: { rol: "Programador", objeto: "Robot", lugar: "Pasillo", resultado: "Código" },
      Biel: { rol: "Analista", objeto: "Cuaderno", lugar: "Aula", resultado: "Informe" },
      Cloe: { rol: "Portavoz", objeto: "Tarjeta", lugar: "Patio", resultado: "Presentación" },
      Nico: { rol: "Diseñadora", objeto: "Plano", lugar: "Biblioteca", resultado: "Maqueta" }
    }
  })
];

const DETECTIVES_UNLOCK_CODES = {
  DETECTIVE: 1,
  PISTAS: 3,
  DEDUCCION: 5,
  SHERLOCK: 8,
  LABORATORIO: 10,
  MAESTRO: 13,
  EXPERTO: 17,
  ALGORITMO: 20
};
