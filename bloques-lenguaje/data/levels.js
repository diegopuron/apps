window.BLOQUES_LEVELS = [
  {
    id: "bloques-base",
    title: "Piezas que van juntas",
    short: "Agrupar sin etiquetar",
    badge: "Nivel 1",
    goal: "Descubrir grupos de palabras que funcionan como una pieza.",
    type: "grouping",
    challenges: [
      {sentence:"El perro negro duerme en la alfombra.",instruction:"Agrupa palabras que no conviene separar. No preguntes nada al verbo: busca piezas que funcionan juntas.",words:["El","perro","negro","duerme","en","la","alfombra"],groups:[[0,1,2],[3],[4,5,6]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"“El perro negro” es una pieza. “En la alfombra” también mantiene unidas sus palabras."},
      {sentence:"La mochila azul pesa mucho.",instruction:"Forma los bloques naturales de la oración.",words:["La","mochila","azul","pesa","mucho"],groups:[[0,1,2],[3,4]],labels:["Bloque A","Bloque B"],explanation:"“La mochila azul” funciona como una unidad. “Pesa mucho” completa la idea verbal."},
      {sentence:"Mis amigos del equipo entrenan los martes.",instruction:"Algunos bloques tienen más palabras de lo que parece.",words:["Mis","amigos","del","equipo","entrenan","los","martes"],groups:[[0,1,2,3],[4],[5,6]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"“Mis amigos del equipo” es una pieza larga. No conviene romperla por la mitad."},
      {sentence:"Un dragón pequeño vive cerca del castillo.",instruction:"Agrupa piezas completas.",words:["Un","dragón","pequeño","vive","cerca","del","castillo"],groups:[[0,1,2],[3],[4,5,6]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"El bloque inicial nombra una cosa completa: “un dragón pequeño”."},
      {sentence:"La profe de música prepara una canción nueva.",instruction:"Busca las piezas que mantienen sentido juntas.",words:["La","profe","de","música","prepara","una","canción","nueva"],groups:[[0,1,2,3],[4],[5,6,7]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"“La profe de música” y “una canción nueva” son bloques completos."},
      {sentence:"Tres gatos blancos miran por la ventana.",instruction:"Agrupa sin usar preguntas: piensa en piezas.",words:["Tres","gatos","blancos","miran","por","la","ventana"],groups:[[0,1,2],[3],[4,5,6]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"Las palabras que acompañan a “gatos” forman una unidad."},
      {sentence:"El balón rojo rodó hasta la portería.",instruction:"Agrupa cada bloque completo.",words:["El","balón","rojo","rodó","hasta","la","portería"],groups:[[0,1,2],[3],[4,5,6]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"“Hasta la portería” funciona como una pieza que indica dirección."},
      {sentence:"Aquella casa antigua tiene ventanas enormes.",instruction:"Agrupa palabras que se necesitan dentro de cada bloque.",words:["Aquella","casa","antigua","tiene","ventanas","enormes"],groups:[[0,1,2],[3],[4,5]],labels:["Bloque A","Bloque B","Bloque C"],explanation:"“Aquella casa antigua” y “ventanas enormes” son dos bloques nominales sin llamarlos todavía así."}
    ]
  },
  {
    id: "bloques-movibles",
    title: "Bloques que se mueven",
    short: "Mover sin romper",
    badge: "Nivel 2",
    goal: "Comprobar que un bloque puede moverse entero, pero no se debe romper por dentro.",
    type: "choice",
    challenges: [
      {sentence:"Ayer jugamos en el patio.",instruction:"Elige la versión que mueve un bloque entero sin romperlo.",options:["En el patio jugamos ayer.","El patio jugamos en ayer.","Ayer en jugamos el patio."],answer:"En el patio jugamos ayer.",explanation:"“En el patio” se puede mover como pieza completa."},
      {sentence:"El coche de mi tío aparcó junto al colegio.",instruction:"Elige la oración en la que se ha movido una pieza completa.",options:["Junto al colegio aparcó el coche de mi tío.","De mi aparcó el coche tío junto al colegio.","El coche aparcó de mi tío junto al colegio."],answer:"Junto al colegio aparcó el coche de mi tío.",explanation:"“Junto al colegio” y “el coche de mi tío” conservan sus palabras unidas."},
      {sentence:"Por la mañana leen cuentos en clase.",instruction:"Selecciona el movimiento correcto.",options:["En clase leen cuentos por la mañana.","La mañana leen por cuentos en clase.","Cuentos en leen clase por la mañana."],answer:"En clase leen cuentos por la mañana.",explanation:"Los bloques pueden cambiar de lugar si no se rompen."},
      {sentence:"Mi hermana pequeña canta en el coro.",instruction:"Elige la versión que respeta los bloques.",options:["En el coro canta mi hermana pequeña.","Pequeña canta mi hermana en el coro.","El coro canta en mi hermana pequeña."],answer:"En el coro canta mi hermana pequeña.",explanation:"“Mi hermana pequeña” no se rompe; se mueve entero."},
      {sentence:"Durante el recreo los niños juegan al escondite.",instruction:"Busca la versión que mueve una pieza entera.",options:["Los niños juegan al escondite durante el recreo.","El recreo los durante niños juegan al escondite.","Al juegan escondite los niños durante el recreo."],answer:"Los niños juegan al escondite durante el recreo.",explanation:"“Durante el recreo” es una pieza movible."},
      {sentence:"Con mucha paciencia arreglaron la maqueta.",instruction:"Elige la versión correcta.",options:["Arreglaron la maqueta con mucha paciencia.","Mucha arreglaron con paciencia la maqueta.","La arreglaron con maqueta mucha paciencia."],answer:"Arreglaron la maqueta con mucha paciencia.",explanation:"“Con mucha paciencia” se mueve junto."},
      {sentence:"En la biblioteca Clara busca libros de animales.",instruction:"Señala la oración que conserva los bloques completos.",options:["Clara busca libros de animales en la biblioteca.","De animales en la Clara busca biblioteca libros.","Clara de busca libros animales en la biblioteca."],answer:"Clara busca libros de animales en la biblioteca.",explanation:"“Libros de animales” y “en la biblioteca” no se han roto."},
      {sentence:"Después del partido el equipo celebró la victoria.",instruction:"Elige el cambio de orden correcto.",options:["El equipo celebró la victoria después del partido.","Del partido el después equipo celebró la victoria.","La victoria celebró después el equipo del partido."],answer:"El equipo celebró la victoria después del partido.",explanation:"Mover bloques enteros conserva la estructura."}
    ]
  },
  {
    id: "concordancia-visible",
    title: "Cuando cambia una pieza",
    short: "Singular y plural",
    badge: "Nivel 3",
    goal: "Ver que algunas piezas obligan al verbo a cambiar.",
    type: "choice",
    challenges: [
      {sentence:"El gato duerme. → Los gatos ____.",instruction:"Cambia la pieza inicial a plural y elige la forma que encaja.",options:["duerme","duermen","dormimos"],answer:"duermen",explanation:"“Los gatos” es plural; el verbo también debe ir en plural."},
      {sentence:"La niña corre. → Las niñas ____.",instruction:"Elige la forma verbal que conserva la concordancia.",options:["corre","corren","corremos"],answer:"corren",explanation:"La pieza cambió a plural, así que cambia el verbo."},
      {sentence:"Mis primos juegan. → Mi primo ____.",instruction:"Ahora la pieza pasa a singular.",options:["juegan","juega","jugamos"],answer:"juega",explanation:"“Mi primo” es singular; “juega” encaja."},
      {sentence:"El ordenador funciona. → Los ordenadores ____.",instruction:"Elige la forma que acompaña al nuevo bloque.",options:["funciona","funcionan","funcionamos"],answer:"funcionan",explanation:"La concordancia une el bloque nominal con la forma verbal."},
      {sentence:"La puerta se abre. → Las puertas se ____.",instruction:"Elige la opción que respeta el plural.",options:["abre","abren","abrimos"],answer:"abren",explanation:"“Las puertas” exige “se abren”."},
      {sentence:"El caballo salta. → Los caballos ____.",instruction:"Selecciona la forma correcta.",options:["salta","saltan","saltáis"],answer:"saltan",explanation:"Plural con plural: los caballos saltan."},
      {sentence:"Una estrella brilla. → Muchas estrellas ____.",instruction:"Observa el cambio de número.",options:["brilla","brillan","brillamos"],answer:"brillan",explanation:"“Muchas estrellas” cambia la forma verbal a plural."},
      {sentence:"Este problema parece difícil. → Estos problemas ____ difíciles.",instruction:"Elige la forma que concuerda.",options:["parece","parecen","parecemos"],answer:"parecen",explanation:"“Estos problemas” es plural; “parecen” también."}
    ]
  },
  {
    id: "concordancia-no-trampa",
    title: "El bloque que manda al verbo",
    short: "Casos difíciles",
    badge: "Nivel 4",
    goal: "Evitar falsas pistas: no siempre manda la primera persona que aparece en la oración.",
    type: "choice",
    challenges: [
      {sentence:"A Marta le gustan las manzanas.",instruction:"¿Qué cambio rompería la concordancia?",options:["A Marta le gusta las manzanas.","A Marta le gustan las manzanas.","A Marta le gustan las frutas."],answer:"A Marta le gusta las manzanas.",explanation:"El verbo concuerda con “las manzanas”, no con “Marta”."},
      {sentence:"Me encanta el fútbol.",instruction:"Cambia “el fútbol” por “los deportes”. ¿Qué forma encaja?",options:["Me encantan los deportes.","Me encanta los deportes.","Me encantamos los deportes."],answer:"Me encantan los deportes.",explanation:"Al pasar a plural, el verbo también pasa a plural."},
      {sentence:"A los niños les interesa la ciencia.",instruction:"Cambia “la ciencia” por “los experimentos”.",options:["A los niños les interesan los experimentos.","A los niños les interesa los experimentos.","A los niños les interesamos los experimentos."],answer:"A los niños les interesan los experimentos.",explanation:"El verbo concuerda con “los experimentos”."},
      {sentence:"Me preocupa el examen.",instruction:"Cambia “el examen” por “las notas”.",options:["Me preocupan las notas.","Me preocupa las notas.","Me preocupamos las notas."],answer:"Me preocupan las notas.",explanation:"“Las notas” es el bloque que obliga al plural."},
      {sentence:"A Julia le falta un lápiz.",instruction:"Cambia “un lápiz” por “dos lápices”.",options:["A Julia le faltan dos lápices.","A Julia le falta dos lápices.","A Julia les faltan dos lápices."],answer:"A Julia le faltan dos lápices.",explanation:"El cambio de singular a plural afecta al verbo: falta/faltan."},
      {sentence:"Nos gusta esta canción.",instruction:"Cambia “esta canción” por “estas canciones”.",options:["Nos gustan estas canciones.","Nos gusta estas canciones.","Nos gustamos estas canciones."],answer:"Nos gustan estas canciones.",explanation:"La concordancia no depende de “nos”, sino del bloque que cambia a plural."},
      {sentence:"Le molesta el ruido.",instruction:"Cambia “el ruido” por “los gritos”.",options:["Le molestan los gritos.","Le molesta los gritos.","Les molesta los gritos."],answer:"Le molestan los gritos.",explanation:"El verbo cambia porque el bloque pasa a plural."},
      {sentence:"A mi padre le apetece una infusión.",instruction:"Cambia “una infusión” por “unas tostadas”.",options:["A mi padre le apetecen unas tostadas.","A mi padre le apetece unas tostadas.","A mi padre les apetecen unas tostadas."],answer:"A mi padre le apetecen unas tostadas.",explanation:"“Unas tostadas” obliga a “apetecen”."}
    ]
  },
  {
    id: "verbo-informa",
    title: "El verbo da pistas",
    short: "Sujetos escondidos",
    badge: "Nivel 5",
    goal: "Deducir información por la forma verbal sin preguntar quién hace la acción.",
    type: "choice",
    challenges: [
      {sentence:"Comimos en el comedor.",instruction:"¿Qué bloque encaja con la forma verbal?",options:["Nosotros / nosotras","Ellos / ellas","Tú"],answer:"Nosotros / nosotras",explanation:"“Comimos” marca primera persona del plural."},
      {sentence:"Llegaste tarde.",instruction:"El verbo ya trae información. Elige el bloque que encaja.",options:["Tú","Yo","Ellos / ellas"],answer:"Tú",explanation:"“Llegaste” encaja con “tú”."},
      {sentence:"Cantaban muy bajo.",instruction:"¿Qué bloque podría estar escondido?",options:["Ellos / ellas","Yo","Tú"],answer:"Ellos / ellas",explanation:"“Cantaban” marca tercera persona del plural."},
      {sentence:"Preparé la mochila.",instruction:"Elige el bloque que encaja con el verbo.",options:["Yo","Nosotros / nosotras","Vosotros / vosotras"],answer:"Yo",explanation:"“Preparé” marca primera persona del singular."},
      {sentence:"Leíste dos capítulos.",instruction:"¿Qué bloque está escondido en el verbo?",options:["Tú","Ella","Nosotros / nosotras"],answer:"Tú",explanation:"“Leíste” encaja con “tú”."},
      {sentence:"Volvieron pronto.",instruction:"Elige la pieza que puede estar omitida.",options:["Ellos / ellas","Yo","Tú"],answer:"Ellos / ellas",explanation:"“Volvieron” es tercera persona plural."},
      {sentence:"Dormiremos en casa.",instruction:"¿Qué bloque encaja?",options:["Nosotros / nosotras","Ellos / ellas","Yo"],answer:"Nosotros / nosotras",explanation:"“Dormiremos” marca primera persona plural en futuro."},
      {sentence:"Escribió una nota.",instruction:"¿Qué bloque podría estar escondido?",options:["Él / ella","Yo","Vosotros / vosotras"],answer:"Él / ella",explanation:"“Escribió” encaja con tercera persona singular."}
    ]
  },
  {
    id: "reparar-concordancia",
    title: "Repara la oración",
    short: "Errores de encaje",
    badge: "Nivel 6",
    goal: "Detectar y corregir errores de concordancia sin recurrir a preguntas mecánicas.",
    type: "choice",
    challenges: [
      {sentence:"Los perro corre por el parque.",instruction:"Elige la reparación que deja todos los encajes correctos.",options:["Los perros corren por el parque.","Los perro corren por el parque.","El perros corre por el parque."],answer:"Los perros corren por el parque.",explanation:"Dentro del bloque y con el verbo debe haber concordancia."},
      {sentence:"Me gusta las pizzas.",instruction:"Repara la concordancia.",options:["Me gustan las pizzas.","Me gusta la pizzas.","Me gustamos las pizzas."],answer:"Me gustan las pizzas.",explanation:"“Las pizzas” pide verbo en plural."},
      {sentence:"La casas antiguas tienen jardín.",instruction:"Elige la versión bien encajada.",options:["Las casas antiguas tienen jardín.","La casas antigua tiene jardín.","Las casa antiguas tiene jardín."],answer:"Las casas antiguas tienen jardín.",explanation:"El bloque completo va en plural: las casas antiguas."},
      {sentence:"A mis amigos le encanta los videojuegos.",instruction:"Repara la frase con el mínimo cambio necesario.",options:["A mis amigos les encantan los videojuegos.","A mis amigos le encantan los videojuegos.","A mis amigos les encanta los videojuegos."],answer:"A mis amigos les encantan los videojuegos.",explanation:"“A mis amigos” pide “les”, y “los videojuegos” pide “encantan”."},
      {sentence:"Este alumnos trabaja muy bien.",instruction:"Elige la opción correcta.",options:["Este alumno trabaja muy bien.","Estos alumno trabaja muy bien.","Este alumnos trabajan muy bien."],answer:"Este alumno trabaja muy bien.",explanation:"Si mantenemos singular, el bloque debe quedar singular completo."},
      {sentence:"Las ventanas está abiertas.",instruction:"Repara la concordancia.",options:["Las ventanas están abiertas.","La ventanas está abiertas.","Las ventana están abierta."],answer:"Las ventanas están abiertas.",explanation:"“Las ventanas” necesita “están” y “abiertas”."},
      {sentence:"Nos interesa estos proyectos.",instruction:"Elige la versión correcta.",options:["Nos interesan estos proyectos.","Nos interesa este proyectos.","Nos interesamos estos proyectos."],answer:"Nos interesan estos proyectos.",explanation:"“Estos proyectos” es plural, por eso “interesan”."},
      {sentence:"Aquellos libro nuevos cuestan poco.",instruction:"Repara el bloque roto.",options:["Aquellos libros nuevos cuestan poco.","Aquellos libro nuevo cuestan poco.","Aquel libros nuevos cuesta poco."],answer:"Aquellos libros nuevos cuestan poco.",explanation:"El bloque nominal completo debe concordar en plural."}
    ]
  },
  {
    id: "sustitucion-pruebas",
    title: "Prueba de sustitución",
    short: "Cambiar piezas",
    badge: "Nivel 7",
    goal: "Usar cambios controlados para comprobar qué piezas están relacionadas.",
    type: "choice",
    challenges: [
      {sentence:"El gato duerme en el sofá. Cambia “el gato” por “los gatos”.",instruction:"Elige la transformación correcta.",options:["Los gatos duermen en el sofá.","Los gatos duerme en el sofá.","El gatos duermen en el sofá."],answer:"Los gatos duermen en el sofá.",explanation:"Al cambiar la pieza principal a plural, cambia también el verbo."},
      {sentence:"Me gusta este libro. Cambia “este libro” por “estos libros”.",instruction:"Elige la versión que conserva la concordancia.",options:["Me gustan estos libros.","Me gusta estos libros.","Me gustamos estos libros."],answer:"Me gustan estos libros.",explanation:"La prueba muestra qué bloque controla la forma del verbo."},
      {sentence:"La flor blanca crece junto al muro. Cambia a plural.",instruction:"Elige la opción correcta.",options:["Las flores blancas crecen junto al muro.","Las flor blancas crece junto al muro.","La flores blanca crecen junto al muro."],answer:"Las flores blancas crecen junto al muro.",explanation:"Todo el bloque cambia: las flores blancas; y el verbo: crecen."},
      {sentence:"A Carla le preocupa la nota. Cambia “la nota” por “las notas”.",instruction:"Elige la transformación correcta.",options:["A Carla le preocupan las notas.","A Carla le preocupa las notas.","A Carla les preocupan las notas."],answer:"A Carla le preocupan las notas.",explanation:"La pieza cambiada obliga a cambiar el verbo, no el “le”."},
      {sentence:"Este jugador marca un gol. Cambia “este jugador” por “estos jugadores”.",instruction:"Selecciona la versión correcta.",options:["Estos jugadores marcan un gol.","Estos jugadores marca un gol.","Este jugadores marcan un gol."],answer:"Estos jugadores marcan un gol.",explanation:"El bloque inicial y el verbo cambian juntos."},
      {sentence:"Nos falta una ficha. Cambia “una ficha” por “tres fichas”.",instruction:"Elige la opción bien encajada.",options:["Nos faltan tres fichas.","Nos falta tres fichas.","Nos faltamos tres fichas."],answer:"Nos faltan tres fichas.",explanation:"“Tres fichas” pide plural: faltan."},
      {sentence:"El camino estrecho sube hasta la ermita. Cambia a plural.",instruction:"Elige la transformación correcta.",options:["Los caminos estrechos suben hasta la ermita.","Los camino estrechos sube hasta la ermita.","El caminos estrecho suben hasta la ermita."],answer:"Los caminos estrechos suben hasta la ermita.",explanation:"La sustitución obliga a ajustar todo el bloque y el verbo."},
      {sentence:"Le apetece una manzana. Cambia “una manzana” por “dos manzanas”.",instruction:"Elige la forma correcta.",options:["Le apetecen dos manzanas.","Le apetece dos manzanas.","Les apetecen dos manzanas."],answer:"Le apetecen dos manzanas.",explanation:"La forma verbal cambia por la pieza plural."}
    ]
  },
  {
    id: "reto-final",
    title: "Reto final de bloques",
    short: "Mezcla de todo",
    badge: "Nivel 8",
    goal: "Aplicar bloques, movimiento, sustitución y concordancia en retos combinados.",
    type: "choice",
    challenges: [
      {sentence:"A mis primos les encantan las películas de aventuras.",instruction:"Cambia “las películas de aventuras” por “el cine de aventuras”.",options:["A mis primos les encanta el cine de aventuras.","A mis primos les encantan el cine de aventuras.","A mis primos le encanta el cine de aventuras."],answer:"A mis primos les encanta el cine de aventuras.",explanation:"Al cambiar a singular, el verbo pasa a “encanta”. “Les” se mantiene por “mis primos”."},
      {sentence:"Durante la tormenta los barcos pequeños volvieron al puerto.",instruction:"Elige el movimiento que no rompe bloques.",options:["Los barcos pequeños volvieron al puerto durante la tormenta.","La tormenta durante los barcos pequeños volvieron al puerto.","Los pequeños volvieron barcos al puerto durante la tormenta."],answer:"Los barcos pequeños volvieron al puerto durante la tormenta.",explanation:"“Durante la tormenta” y “los barcos pequeños” se conservan como piezas."},
      {sentence:"Me molestan esos ruidos fuertes.",instruction:"Cambia “esos ruidos fuertes” por “ese ruido fuerte”.",options:["Me molesta ese ruido fuerte.","Me molestan ese ruido fuerte.","Me molestamos ese ruido fuerte."],answer:"Me molesta ese ruido fuerte.",explanation:"El bloque pasa a singular y arrastra el verbo a singular."},
      {sentence:"Las alumnas de sexto preparan una exposición.",instruction:"Cambia “las alumnas de sexto” por “la alumna de sexto”.",options:["La alumna de sexto prepara una exposición.","La alumna de sexto preparan una exposición.","Las alumna de sexto prepara una exposición."],answer:"La alumna de sexto prepara una exposición.",explanation:"La prueba de sustitución ajusta el bloque y el verbo."},
      {sentence:"Encontramos una pista junto a la fuente.",instruction:"¿Qué bloque escondido encaja con el verbo?",options:["Nosotros / nosotras","Ellos / ellas","Tú"],answer:"Nosotros / nosotras",explanation:"“Encontramos” marca primera persona plural."},
      {sentence:"A la clase le faltan dos materiales importantes.",instruction:"Cambia “dos materiales importantes” por “un material importante”.",options:["A la clase le falta un material importante.","A la clase le faltan un material importante.","A la clase les falta un material importante."],answer:"A la clase le falta un material importante.",explanation:"Al pasar a singular, cambia “faltan” por “falta”."},
      {sentence:"Los árboles del patio pierden hojas en otoño.",instruction:"Elige la versión que mueve una pieza completa.",options:["En otoño los árboles del patio pierden hojas.","Del patio los árboles pierden en hojas otoño.","Los árboles pierden del patio hojas en otoño."],answer:"En otoño los árboles del patio pierden hojas.",explanation:"“En otoño” se mueve entero y el resto de bloques se conserva."},
      {sentence:"Aquella historia antigua interesa a muchas personas.",instruction:"Cambia “aquella historia antigua” por “aquellas historias antiguas”.",options:["Aquellas historias antiguas interesan a muchas personas.","Aquellas historia antiguas interesa a muchas personas.","Aquellas historias antiguas interesa a muchas personas."],answer:"Aquellas historias antiguas interesan a muchas personas.",explanation:"El bloque completo pasa a plural y el verbo también."}
    ]
  }
];
