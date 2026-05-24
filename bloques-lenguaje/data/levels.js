window.BLOQUES_LEVELS = [
  {
    id: "bloques-juntos",
    title: "Palabras que van juntas",
    short: "Agrupar bloques",
    badge: "Nivel 1",
    goal: "Detectar grupos de palabras que funcionan como una pieza, sin usar preguntas al verbo.",
    type: "grouping",
    challenges: [
      {
        sentence: "El perro negro corre por el parque.",
        instruction: "Agrupa las palabras que se necesitan entre sí. No pienses en preguntas; piensa en piezas que no conviene romper.",
        words: ["El", "perro", "negro", "corre", "por", "el", "parque"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["Bloque A", "Bloque B", "Bloque C"],
        explanation: "“El perro negro” funciona como una pieza completa. “Por el parque” también va unido porque sus palabras forman una misma unidad."
      },
      {
        sentence: "La niña pequeña lee un cuento divertido.",
        instruction: "Construye bloques de sentido. Cada bloque debe poder moverse o cambiarse sin romper sus palabras internas.",
        words: ["La", "niña", "pequeña", "lee", "un", "cuento", "divertido"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["Bloque A", "Bloque B", "Bloque C"],
        explanation: "“La niña pequeña” y “un cuento divertido” son piezas internas: determinante, nombre y palabras que lo acompañan funcionan juntas."
      },
      {
        sentence: "Mis amigos del equipo entrenan los martes.",
        instruction: "Busca bloques completos. Algunas piezas pueden ser más largas de lo que parecen.",
        words: ["Mis", "amigos", "del", "equipo", "entrenan", "los", "martes"],
        groups: [[0,1,2,3],[4],[5,6]],
        labels: ["Bloque A", "Bloque B", "Bloque C"],
        explanation: "“Mis amigos del equipo” es un bloque grande. Si lo partes mal, pierdes información que pertenece al mismo grupo."
      },
      {
        sentence: "Un dragón verde duerme en la cueva.",
        instruction: "Agrupa sin preguntar nada al verbo. Solo mira qué palabras forman una unidad estable.",
        words: ["Un", "dragón", "verde", "duerme", "en", "la", "cueva"],
        groups: [[0,1,2],[3],[4,5,6]],
        labels: ["Bloque A", "Bloque B", "Bloque C"],
        explanation: "“Un dragón verde” es una pieza; “verde” acompaña a “dragón”. “En la cueva” también funciona como grupo."
      },
      {
        sentence: "Aquellos libros antiguos pesan mucho.",
        instruction: "Agrupa las palabras que actúan juntas. Después fíjate en si algún bloque afecta al verbo.",
        words: ["Aquellos", "libros", "antiguos", "pesan", "mucho"],
        groups: [[0,1,2],[3,4]],
        labels: ["Bloque A", "Bloque B"],
        explanation: "El bloque “Aquellos libros antiguos” funciona unido y además concuerda con “pesan”."
      },
      {
        sentence: "La bicicleta roja está junto a la puerta.",
        instruction: "Agrupa en piezas grandes cuando tenga sentido. No todo bloque tiene que tener tres palabras.",
        words: ["La", "bicicleta", "roja", "está", "junto", "a", "la", "puerta"],
        groups: [[0,1,2],[3,4,5,6,7]],
        labels: ["Bloque A", "Bloque B"],
        explanation: "“La bicicleta roja” forma una pieza. El resto construye otra información completa alrededor del verbo."
      }
    ]
  },
  {
    id: "concordancia",
    title: "El bloque que controla el verbo",
    short: "Concordancia",
    badge: "Nivel 2",
    goal: "Comprender que el sujeto se reconoce por concordancia, no por preguntas mecánicas.",
    type: "concordance",
    challenges: [
      {
        sentence: "Me gustan las pizzas.",
        instruction: "Elige el bloque que controla la forma del verbo. Pista: cambia singular/plural y observa qué verbo encaja.",
        options: ["Me", "gustan", "las pizzas"],
        answer: "las pizzas",
        explanation: "El verbo está en plural porque concuerda con “las pizzas”. Por eso “me” no puede ser el bloque que controla el verbo."
      },
      {
        sentence: "A Leo le encanta el fútbol.",
        instruction: "Elige el bloque que controla la forma del verbo.",
        options: ["A Leo", "le", "el fútbol"],
        answer: "el fútbol",
        explanation: "“El fútbol” está en singular y el verbo también: encanta. Si fuera “los deportes”, sería “encantan”."
      },
      {
        sentence: "Los cromos antiguos valen mucho.",
        instruction: "Elige el bloque que obliga al verbo a ir en plural.",
        options: ["Los cromos antiguos", "valen", "mucho"],
        answer: "Los cromos antiguos",
        explanation: "Si cambias a “El cromo antiguo”, el verbo cambia a “vale”. Esa prueba muestra qué bloque controla la concordancia."
      },
      {
        sentence: "Nos faltan dos entradas.",
        instruction: "Elige el bloque que controla el plural del verbo.",
        options: ["Nos", "faltan", "dos entradas"],
        answer: "dos entradas",
        explanation: "El verbo va en plural porque concuerda con “dos entradas”. No necesitamos preguntar nada: basta comprobar la concordancia."
      },
      {
        sentence: "En la mochila caben tres cuadernos.",
        instruction: "Elige el bloque que controla la forma verbal.",
        options: ["En la mochila", "caben", "tres cuadernos"],
        answer: "tres cuadernos",
        explanation: "“Tres cuadernos” obliga a “caben”. Si fuera “un cuaderno”, sería “cabe”."
      },
      {
        sentence: "A mis amigos les interesan los videojuegos.",
        instruction: "Elige el bloque que controla el plural del verbo.",
        options: ["A mis amigos", "les", "los videojuegos"],
        answer: "los videojuegos",
        explanation: "La forma plural “interesan” concuerda con “los videojuegos”, no con “A mis amigos”."
      }
    ]
  },
  {
    id: "sustitucion",
    title: "Cambia una pieza y observa",
    short: "Manipulación",
    badge: "Nivel 3",
    goal: "Usar la sustitución para comprobar qué bloque controla el verbo.",
    type: "concordance",
    challenges: [
      {
        sentence: "La tortuga camina despacio. → Las tortugas ______ despacio.",
        instruction: "Cambia el verbo para que encaje con el nuevo bloque.",
        options: ["camina", "caminan", "caminamos"],
        answer: "caminan",
        explanation: "Al cambiar “La tortuga” por “Las tortugas”, el verbo también debe pasar a plural: caminan."
      },
      {
        sentence: "Me falta un lápiz. → Me ______ tres lápices.",
        instruction: "Elige la forma verbal que encaja tras cambiar el bloque.",
        options: ["falta", "faltan", "faltamos"],
        answer: "faltan",
        explanation: "“Tres lápices” es plural, por eso el verbo correcto es “faltan”."
      },
      {
        sentence: "El libro está en la mesa. → Los libros ______ en la mesa.",
        instruction: "Elige la forma verbal que conserva la concordancia.",
        options: ["está", "están", "estamos"],
        answer: "están",
        explanation: "“Los libros” es plural, así que el verbo debe ser “están”."
      },
      {
        sentence: "A Marta le gusta la película. → A Marta le ______ las películas.",
        instruction: "Observa qué bloque ha cambiado y ajusta el verbo.",
        options: ["gusta", "gustan", "gustamos"],
        answer: "gustan",
        explanation: "El bloque que controla el verbo pasa a plural: “las películas”. Por eso necesitamos “gustan”."
      },
      {
        sentence: "Queda una silla libre. → ______ dos sillas libres.",
        instruction: "Elige la forma verbal adecuada.",
        options: ["Queda", "Quedan", "Quedo"],
        answer: "Quedan",
        explanation: "“Dos sillas libres” es plural, por eso el verbo también va en plural."
      },
      {
        sentence: "El equipo juega hoy. → Los equipos ______ hoy.",
        instruction: "Cambia la forma verbal al modificar el bloque inicial.",
        options: ["juega", "juegan", "jugamos"],
        answer: "juegan",
        explanation: "“Los equipos” es plural y controla la forma “juegan”."
      }
    ]
  },
  {
    id: "sujeto-escondido",
    title: "Información escondida en el verbo",
    short: "Sujeto omitido",
    badge: "Nivel 4",
    goal: "Deducir la persona y el número a partir de la forma verbal.",
    type: "hiddenSubject",
    challenges: [
      {
        sentence: "Llegamos tarde al entrenamiento.",
        instruction: "El bloque no aparece escrito, pero el verbo deja pistas. Elige la persona que encaja.",
        options: ["yo", "nosotros / nosotras", "ellos / ellas"],
        answer: "nosotros / nosotras",
        explanation: "“Llegamos” indica primera persona del plural: nosotros o nosotras."
      },
      {
        sentence: "Comiste demasiado rápido.",
        instruction: "Elige la persona que encaja con la forma verbal.",
        options: ["tú", "yo", "ellos / ellas"],
        answer: "tú",
        explanation: "“Comiste” señala segunda persona del singular: tú."
      },
      {
        sentence: "Saltaron la valla con cuidado.",
        instruction: "Elige la persona y número que deja ver el verbo.",
        options: ["él / ella", "ellos / ellas", "nosotros / nosotras"],
        answer: "ellos / ellas",
        explanation: "“Saltaron” está en tercera persona del plural."
      },
      {
        sentence: "Estudio en silencio.",
        instruction: "Elige la persona que ya está marcada dentro del verbo.",
        options: ["yo", "tú", "nosotros / nosotras"],
        answer: "yo",
        explanation: "“Estudio” indica primera persona del singular."
      },
      {
        sentence: "Volveréis mañana.",
        instruction: "Elige la persona y número que corresponden a la forma verbal.",
        options: ["vosotros / vosotras", "ellos / ellas", "tú"],
        answer: "vosotros / vosotras",
        explanation: "“Volveréis” indica segunda persona del plural."
      },
      {
        sentence: "Tiene muchas ganas.",
        instruction: "Elige la persona que encaja con el verbo.",
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
    badge: "Nivel 5",
    goal: "Corregir errores de concordancia justificando qué bloque controla el cambio.",
    type: "errorFix",
    challenges: [
      {
        sentence: "Me gusta las patatas.",
        instruction: "Elige la corrección correcta. Comprueba qué bloque controla el verbo.",
        options: ["Me gustan las patatas.", "Me gusta la patatas.", "Yo gusta las patatas."],
        answer: "Me gustan las patatas.",
        explanation: "“Las patatas” es plural, así que el verbo debe ir en plural: gustan."
      },
      {
        sentence: "Los niños juega en el patio.",
        instruction: "Elige la corrección que respeta la concordancia.",
        options: ["Los niños juegan en el patio.", "El niños juega en el patio.", "Los niño juega en el patio."],
        answer: "Los niños juegan en el patio.",
        explanation: "El bloque “Los niños” es plural y exige “juegan”."
      },
      {
        sentence: "A Marta le encantan el chocolate.",
        instruction: "Elige la corrección correcta.",
        options: ["A Marta le encanta el chocolate.", "A Marta le encantan los chocolate.", "A Marta les encanta el chocolate."],
        answer: "A Marta le encanta el chocolate.",
        explanation: "“El chocolate” es singular, por eso el verbo debe ser “encanta”."
      },
      {
        sentence: "En la caja queda tres lápices.",
        instruction: "Elige la opción que ajusta el verbo al bloque que lo controla.",
        options: ["En la caja quedan tres lápices.", "En la caja queda tres lápices.", "En la cajas quedan tres lápices."],
        answer: "En la caja quedan tres lápices.",
        explanation: "El verbo concuerda con “tres lápices”, que es plural."
      },
      {
        sentence: "La pandilla de amigos salen pronto.",
        instruction: "Elige la corrección correcta. Cuidado: no todas las palabras en plural controlan el verbo.",
        options: ["La pandilla de amigos sale pronto.", "La pandilla de amigos salen pronto.", "Las pandilla de amigos sale pronto."],
        answer: "La pandilla de amigos sale pronto.",
        explanation: "El núcleo del bloque es “pandilla”, singular. Por eso el verbo va en singular: sale."
      },
      {
        sentence: "Tus mochila pesan demasiado.",
        instruction: "Elige la opción que arregla la concordancia dentro del bloque y con el verbo.",
        options: ["Tus mochilas pesan demasiado.", "Tu mochila pesan demasiado.", "Tus mochila pesa demasiado."],
        answer: "Tus mochilas pesan demasiado.",
        explanation: "La opción correcta mantiene la concordancia interna del bloque y con el verbo: tus mochilas pesan."
      }
    ]
  }
];
