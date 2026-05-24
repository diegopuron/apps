window.BLOQUES_LEVELS = [
  {
    id: "bloques-juntos",
    title: "Palabras que van juntas",
    short: "Agrupar bloques",
    badge: "Nivel 1",
    goal: "Detectar grupos de palabras que funcionan como una pieza.",
    type: "grouping",
    challenges: [
      {
        sentence: "El perro negro corre por el parque.",
        instruction: "Agrupa las palabras que van juntas. No hace falta poner nombres técnicos todavía.",
        words: ["El", "perro", "negro", "corre", "por", "el", "parque"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["bloque de quién", "bloque de lo que hace", "bloque de lugar"],
        explanation: "“El perro negro” funciona como un bloque; “por el parque” también va unido porque completa una idea de lugar."
      },
      {
        sentence: "La niña pequeña lee un cuento divertido.",
        words: ["La", "niña", "pequeña", "lee", "un", "cuento", "divertido"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["bloque de quién", "bloque de acción", "bloque de qué"],
        explanation: "“La niña pequeña” y “un cuento divertido” son grupos que no conviene romper porque sus palabras se necesitan entre sí."
      },
      {
        sentence: "Mis amigos del equipo entrenan los martes.",
        words: ["Mis", "amigos", "del", "equipo", "entrenan", "los", "martes"],
        groups: [[0,1,2,3],[4],[5,6]],
        labels: ["bloque de quién", "bloque de acción", "bloque de cuándo"],
        explanation: "“Mis amigos del equipo” es un bloque grande: todo junto nos dice de quién hablamos."
      },
      {
        sentence: "Un dragón verde duerme en la cueva.",
        words: ["Un", "dragón", "verde", "duerme", "en", "la", "cueva"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["bloque de quién", "bloque de acción", "bloque de lugar"],
        explanation: "El bloque principal es “Un dragón verde”. La descripción “verde” va con “dragón”."
      },
      {
        sentence: "Aquellos libros antiguos pesan mucho.",
        words: ["Aquellos", "libros", "antiguos", "pesan", "mucho"],
        groups: [[0,1,2],[3,4]],
        labels: ["bloque de quién o qué", "bloque de lo que ocurre"],
        explanation: "El grupo “Aquellos libros antiguos” funciona unido y obliga al verbo a ir en plural."
      },
      {
        sentence: "La bicicleta roja está junto a la puerta.",
        words: ["La", "bicicleta", "roja", "está", "junto", "a", "la", "puerta"],
        groups: [[0,1,2],[3,4,5,6,7]],
        labels: ["bloque de quién o qué", "bloque de información"],
        explanation: "“La bicicleta roja” forma un bloque. El resto indica dónde está."
      }
    ]
  },
  {
    id: "concordancia",
    title: "El bloque que manda",
    short: "Concordancia",
    badge: "Nivel 2",
    goal: "Comprender que el sujeto se localiza por concordancia, no por preguntas mecánicas al verbo.",
    type: "concordance",
    challenges: [
      {
        sentence: "Me gustan las pizzas.",
        instruction: "Elige el bloque que obliga al verbo a estar en plural.",
        options: ["Me", "gustan", "las pizzas"],
        answer: "las pizzas",
        explanation: "El verbo está en plural porque concuerda con “las pizzas”. Por eso el sujeto no es “me”."
      },
      {
        sentence: "A Leo le encanta el fútbol.",
        options: ["A Leo", "le", "el fútbol"],
        answer: "el fútbol",
        explanation: "“El fútbol” está en singular y el verbo también: encanta. El bloque “A Leo” no manda sobre el verbo."
      },
      {
        sentence: "Los cromos antiguos valen mucho.",
        options: ["Los cromos antiguos", "valen", "mucho"],
        answer: "Los cromos antiguos",
        explanation: "Si cambias a “El cromo antiguo”, el verbo cambia: vale. Esa prueba muestra la concordancia."
      },
      {
        sentence: "Nos faltan dos entradas.",
        options: ["Nos", "faltan", "dos entradas"],
        answer: "dos entradas",
        explanation: "El verbo va en plural porque concuerda con “dos entradas”. No localizamos el sujeto preguntando “¿quién falta?”."
      },
      {
        sentence: "En la mochila caben tres cuadernos.",
        options: ["En la mochila", "caben", "tres cuadernos"],
        answer: "tres cuadernos",
        explanation: "“Tres cuadernos” obliga a “caben”. Si fuera “un cuaderno”, sería “cabe”."
      },
      {
        sentence: "A mis amigos les interesan los videojuegos.",
        options: ["A mis amigos", "les", "los videojuegos"],
        answer: "los videojuegos",
        explanation: "La forma plural “interesan” concuerda con “los videojuegos”."
      }
    ]
  },
  {
    id: "sujeto-escondido",
    title: "Sujetos escondidos",
    short: "Sujeto omitido",
    badge: "Nivel 3",
    goal: "Deducir el sujeto omitido a partir de la forma verbal.",
    type: "hiddenSubject",
    challenges: [
      {
        sentence: "Llegamos tarde al entrenamiento.",
        instruction: "El sujeto no aparece escrito. ¿Quién está escondido en el verbo?",
        options: ["yo", "nosotros / nosotras", "ellos / ellas"],
        answer: "nosotros / nosotras",
        explanation: "“Llegamos” indica primera persona del plural: nosotros o nosotras."
      },
      {
        sentence: "Comiste demasiado rápido.",
        options: ["tú", "yo", "ellos / ellas"],
        answer: "tú",
        explanation: "“Comiste” señala segunda persona del singular: tú."
      },
      {
        sentence: "Saltaron la valla con cuidado.",
        options: ["él / ella", "ellos / ellas", "nosotros / nosotras"],
        answer: "ellos / ellas",
        explanation: "“Saltaron” está en tercera persona del plural."
      },
      {
        sentence: "Estudio en silencio.",
        options: ["yo", "tú", "nosotros / nosotras"],
        answer: "yo",
        explanation: "“Estudio” indica primera persona del singular."
      },
      {
        sentence: "Volveréis mañana.",
        options: ["vosotros / vosotras", "ellos / ellas", "tú"],
        answer: "vosotros / vosotras",
        explanation: "“Volveréis” indica segunda persona del plural."
      },
      {
        sentence: "Tiene muchas ganas.",
        options: ["yo", "él / ella", "nosotros / nosotras"],
        answer: "él / ella",
        explanation: "“Tiene” está en tercera persona del singular."
      }
    ]
  },
  {
    id: "errores-concordancia",
    title: "Detectives de concordancia",
    short: "Detectar errores",
    badge: "Nivel 4",
    goal: "Corregir errores de concordancia justificando qué bloque obliga al cambio.",
    type: "errorFix",
    challenges: [
      {
        sentence: "Me gusta las patatas.",
        instruction: "Elige la corrección correcta.",
        options: ["Me gustan las patatas.", "Me gusta la patatas.", "Yo gusta las patatas."],
        answer: "Me gustan las patatas.",
        explanation: "“Las patatas” es plural, así que el verbo debe ir en plural: gustan."
      },
      {
        sentence: "Los niños juega en el patio.",
        options: ["Los niños juegan en el patio.", "El niños juega en el patio.", "Los niño juega en el patio."],
        answer: "Los niños juegan en el patio.",
        explanation: "El bloque “Los niños” es plural y exige “juegan”."
      },
      {
        sentence: "A Marta le encantan el chocolate.",
        options: ["A Marta le encanta el chocolate.", "A Marta le encantan los chocolate.", "A Marta les encanta el chocolate."],
        answer: "A Marta le encanta el chocolate.",
        explanation: "“El chocolate” es singular, por eso el verbo debe ser “encanta”."
      },
      {
        sentence: "En la caja queda tres lápices.",
        options: ["En la caja quedan tres lápices.", "En la caja queda tres lápices.", "En la cajas quedan tres lápices."],
        answer: "En la caja quedan tres lápices.",
        explanation: "El verbo concuerda con “tres lápices”, que es plural."
      },
      {
        sentence: "La pandilla de amigos salen pronto.",
        options: ["La pandilla de amigos sale pronto.", "La pandilla de amigos salen pronto.", "Las pandilla de amigos sale pronto."],
        answer: "La pandilla de amigos sale pronto.",
        explanation: "El núcleo del bloque es “pandilla”, singular. Por eso el verbo va en singular: sale."
      },
      {
        sentence: "Tus mochila pesan demasiado.",
        options: ["Tus mochilas pesan demasiado.", "Tu mochila pesan demasiado.", "Tus mochila pesa demasiado."],
        answer: "Tus mochilas pesan demasiado.",
        explanation: "La opción correcta mantiene la concordancia interna del bloque y con el verbo: tus mochilas pesan."
      }
    ]
  }
];
