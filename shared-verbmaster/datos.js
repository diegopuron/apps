const PERSONAS = [
  { idx:0, pronombre:'yo',                   persona:'1.ª persona', numero:'singular' },
  { idx:1, pronombre:'tú',                   persona:'2.ª persona', numero:'singular' },
  { idx:2, pronombre:'él / ella',            persona:'3.ª persona', numero:'singular' },
  { idx:3, pronombre:'nosotros / nosotras',  persona:'1.ª persona', numero:'plural'   },
  { idx:4, pronombre:'vosotros / vosotras',  persona:'2.ª persona', numero:'plural'   },
  { idx:5, pronombre:'ellos / ellas',        persona:'3.ª persona', numero:'plural'   }
];

/* ============================================================
   DATOS: AUXILIAR HABER conjugado (para formas compuestas)
   Orden: yo, tú, él/ella, nosotros, vosotros, ellos/ellas
============================================================ */
const HABER = {
  /* Indicativo presente → pretérito perfecto compuesto (ind.) */
  indPres:      ['he','has','ha','hemos','habéis','han'],
  /* Indicativo imperfecto → pretérito pluscuamperfecto (ind.) */
  indImp:       ['había','habías','había','habíamos','habíais','habían'],
  /* Indicativo pretérito perfecto simple → pretérito anterior (ind.) */
  indPS:        ['hube','hubiste','hubo','hubimos','hubisteis','hubieron'],
  /* Indicativo futuro simple → futuro compuesto (ind.) */
  indFut:       ['habré','habrás','habrá','habremos','habréis','habrán'],
  /* Indicativo condicional simple → condicional compuesto (ind.) */
  indCond:      ['habría','habrías','habría','habríamos','habríais','habrían'],
  /* Subjuntivo presente → pretérito perfecto compuesto (subj.) */
  subjPres:     ['haya','hayas','haya','hayamos','hayáis','hayan'],
  /* Subjuntivo imperfecto -ra → pretérito pluscuamperfecto -ra (subj.) */
  subjImp:      ['hubiera','hubieras','hubiera','hubiéramos','hubierais','hubieran'],
  /* Subjuntivo imperfecto -se → pretérito pluscuamperfecto -se (subj.) */
  subjImpEse:   ['hubiese','hubieses','hubiese','hubiésemos','hubieseis','hubiesen']
};

/* ============================================================
   DATOS: DEFINICIÓN DE TIEMPOS POR MODO
   haberKey: null → forma simple (usar verbo.formas[tiempoId][personaIdx])
   haberKey: 'xxx' → forma compuesta (HABER[xxx][personaIdx] + participio)
============================================================ */
const TIEMPOS = {
  indicativo: {
    simples: [
      { id:'indPres',  label:'presente',                  haberKey:null  },
      { id:'indImp',   label:'pretérito imperfecto',      haberKey:null  },
      { id:'indPS',    label:'pretérito perfecto simple', haberKey:null  },
      { id:'indFut',   label:'futuro simple',             haberKey:null  },
      { id:'indCond',  label:'condicional simple',        haberKey:null  }
    ],
    compuestos: [
      { id:'indPerfComp',  label:'pretérito perfecto compuesto', haberKey:'indPres'  },
      { id:'indPluscuamp', label:'pretérito pluscuamperfecto',   haberKey:'indImp'   },
      { id:'indPretAnt',   label:'pretérito anterior',           haberKey:'indPS'    },
      { id:'indFutComp',   label:'futuro compuesto',             haberKey:'indFut'   },
      { id:'indCondComp',  label:'condicional compuesto',        haberKey:'indCond'  }
    ]
  },
  subjuntivo: {
    simples: [
      { id:'subjPres',   label:'presente',              haberKey:null       },
      { id:'subjImp',    label:'pretérito imperfecto (-ra)', haberKey:null       },
      { id:'subjImpEse', label:'pretérito imperfecto (-se)', haberKey:null       }
    ],
    compuestos: [
      { id:'subjPerfComp',      label:'pretérito perfecto compuesto',        haberKey:'subjPres'   },
      { id:'subjPluscuamp',     label:'pretérito pluscuamperfecto (-ra)',    haberKey:'subjImp'    },
      { id:'subjPluscuampEse',  label:'pretérito pluscuamperfecto (-se)',    haberKey:'subjImpEse' }
    ]
  }
};

/* ============================================================
   BASE DE DATOS DE VERBOS
   Cada verbo incluye TODAS sus formas simples ya conjugadas,
   más el participio para construir formas compuestas.
   tipo: 'regular' | 'irregular'
   conjugacion: 'ar' | 'er' | 'ir'
   participio: string
   formas: {
     indPres:  [yo, tú, él, nosotros, vosotros, ellos],
     indImp:   [...],
     indPS:    [...],
     indFut:   [...],
     indCond:  [...],
     subjPres: [...],
     subjImp:  [...]
   }
============================================================ */
const VERBOS = {

  /* ── REGULARES -AR ─────────────────────────────── */

  cantar: {
    tipo:'regular', conjugacion:'ar', participio:'cantado',
    formas:{
      indPres:  ['canto','cantas','canta','cantamos','cantáis','cantan'],
      indImp:   ['cantaba','cantabas','cantaba','cantábamos','cantabais','cantaban'],
      indPS:    ['canté','cantaste','cantó','cantamos','cantasteis','cantaron'],
      indFut:   ['cantaré','cantarás','cantará','cantaremos','cantaréis','cantarán'],
      indCond:  ['cantaría','cantarías','cantaría','cantaríamos','cantaríais','cantarían'],
      subjPres: ['cante','cantes','cante','cantemos','cantéis','canten'],
      subjImp:  ['cantara','cantaras','cantara','cantáramos','cantarais','cantaran']
    }
  },
  bailar: {
    tipo:'regular', conjugacion:'ar', participio:'bailado',
    formas:{
      indPres:  ['bailo','bailas','baila','bailamos','bailáis','bailan'],
      indImp:   ['bailaba','bailabas','bailaba','bailábamos','bailabais','bailaban'],
      indPS:    ['bailé','bailaste','bailó','bailamos','bailasteis','bailaron'],
      indFut:   ['bailaré','bailarás','bailará','bailaremos','bailaréis','bailarán'],
      indCond:  ['bailaría','bailarías','bailaría','bailaríamos','bailaríais','bailarían'],
      subjPres: ['baile','bailes','baile','bailemos','bailéis','bailen'],
      subjImp:  ['bailara','bailaras','bailara','bailáramos','bailarais','bailaran']
    }
  },
  saltar: {
    tipo:'regular', conjugacion:'ar', participio:'saltado',
    formas:{
      indPres:  ['salto','saltas','salta','saltamos','saltáis','saltan'],
      indImp:   ['saltaba','saltabas','saltaba','saltábamos','saltabais','saltaban'],
      indPS:    ['salté','saltaste','saltó','saltamos','saltasteis','saltaron'],
      indFut:   ['saltaré','saltarás','saltará','saltaremos','saltaréis','saltarán'],
      indCond:  ['saltaría','saltarías','saltaría','saltaríamos','saltaríais','saltarían'],
      subjPres: ['salte','saltes','salte','saltemos','saltéis','salten'],
      subjImp:  ['saltara','saltaras','saltara','saltáramos','saltarais','saltaran']
    }
  },
  estudiar: {
    tipo:'regular', conjugacion:'ar', participio:'estudiado',
    formas:{
      indPres:  ['estudio','estudias','estudia','estudiamos','estudiáis','estudian'],
      indImp:   ['estudiaba','estudiabas','estudiaba','estudiábamos','estudiabais','estudiaban'],
      indPS:    ['estudié','estudiaste','estudió','estudiamos','estudiasteis','estudiaron'],
      indFut:   ['estudiaré','estudiarás','estudiará','estudiaremos','estudiaréis','estudiarán'],
      indCond:  ['estudiaría','estudiarías','estudiaría','estudiaríamos','estudiaríais','estudiarían'],
      subjPres: ['estudie','estudies','estudie','estudiemos','estudiéis','estudien'],
      subjImp:  ['estudiara','estudiaras','estudiara','estudiáramos','estudiarais','estudiaran']
    }
  },
  trabajar: {
    tipo:'regular', conjugacion:'ar', participio:'trabajado',
    formas:{
      indPres:  ['trabajo','trabajas','trabaja','trabajamos','trabajáis','trabajan'],
      indImp:   ['trabajaba','trabajabas','trabajaba','trabajábamos','trabajabais','trabajaban'],
      indPS:    ['trabajé','trabajaste','trabajó','trabajamos','trabajasteis','trabajaron'],
      indFut:   ['trabajaré','trabajarás','trabajará','trabajaremos','trabajaréis','trabajarán'],
      indCond:  ['trabajaría','trabajarías','trabajaría','trabajaríamos','trabajaríais','trabajarían'],
      subjPres: ['trabaje','trabajes','trabaje','trabajemos','trabajéis','trabajen'],
      subjImp:  ['trabajara','trabajaras','trabajara','trabajáramos','trabajarais','trabajaran']
    }
  },
  hablar: {
    tipo:'regular', conjugacion:'ar', participio:'hablado',
    formas:{
      indPres:  ['hablo','hablas','habla','hablamos','habláis','hablan'],
      indImp:   ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'],
      indPS:    ['hablé','hablaste','habló','hablamos','hablasteis','hablaron'],
      indFut:   ['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán'],
      indCond:  ['hablaría','hablarías','hablaría','hablaríamos','hablaríais','hablarían'],
      subjPres: ['hable','hables','hable','hablemos','habléis','hablen'],
      subjImp:  ['hablara','hablaras','hablara','habláramos','hablarais','hablaran']
    }
  },
  amar: {
    tipo:'regular', conjugacion:'ar', participio:'amado',
    formas:{
      indPres:  ['amo','amas','ama','amamos','amáis','aman'],
      indImp:   ['amaba','amabas','amaba','amábamos','amabais','amaban'],
      indPS:    ['amé','amaste','amó','amamos','amasteis','amaron'],
      indFut:   ['amaré','amarás','amará','amaremos','amaréis','amarán'],
      indCond:  ['amaría','amarías','amaría','amaríamos','amaríais','amarían'],
      subjPres: ['ame','ames','ame','amemos','améis','amen'],
      subjImp:  ['amara','amaras','amara','amáramos','amarais','amaran']
    }
  },
  llamar: {
    tipo:'regular', conjugacion:'ar', participio:'llamado',
    formas:{
      indPres:  ['llamo','llamas','llama','llamamos','llamáis','llaman'],
      indImp:   ['llamaba','llamabas','llamaba','llamábamos','llamabais','llamaban'],
      indPS:    ['llamé','llamaste','llamó','llamamos','llamasteis','llamaron'],
      indFut:   ['llamaré','llamarás','llamará','llamaremos','llamaréis','llamarán'],
      indCond:  ['llamaría','llamarías','llamaría','llamaríamos','llamaríais','llamarían'],
      subjPres: ['llame','llames','llame','llamemos','llaméis','llamen'],
      subjImp:  ['llamara','llamaras','llamara','llamáramos','llamarais','llamaran']
    }
  },
  mirar: {
    tipo:'regular', conjugacion:'ar', participio:'mirado',
    formas:{
      indPres:  ['miro','miras','mira','miramos','miráis','miran'],
      indImp:   ['miraba','mirabas','miraba','mirábamos','mirabais','miraban'],
      indPS:    ['miré','miraste','miró','miramos','mirasteis','miraron'],
      indFut:   ['miraré','mirarás','mirará','miraremos','miraréis','mirarán'],
      indCond:  ['miraría','mirarías','miraría','miraríamos','miraríais','mirarían'],
      subjPres: ['mire','mires','mire','miremos','miréis','miren'],
      subjImp:  ['mirara','miraras','mirara','miráramos','mirarais','miraran']
    }
  },

  /* ── REGULARES -ER ─────────────────────────────── */

  temer: {
    tipo:'regular', conjugacion:'er', participio:'temido',
    formas:{
      indPres:  ['temo','temes','teme','tememos','teméis','temen'],
      indImp:   ['temía','temías','temía','temíamos','temíais','temían'],
      indPS:    ['temí','temiste','temió','temimos','temisteis','temieron'],
      indFut:   ['temeré','temerás','temerá','temeremos','temeréis','temerán'],
      indCond:  ['temería','temerías','temería','temeríamos','temeríais','temerían'],
      subjPres: ['tema','temas','tema','temamos','temáis','teman'],
      subjImp:  ['temiera','temieras','temiera','temiéramos','temierais','temieran']
    }
  },
  beber: {
    tipo:'regular', conjugacion:'er', participio:'bebido',
    formas:{
      indPres:  ['bebo','bebes','bebe','bebemos','bebéis','beben'],
      indImp:   ['bebía','bebías','bebía','bebíamos','bebíais','bebían'],
      indPS:    ['bebí','bebiste','bebió','bebimos','bebisteis','bebieron'],
      indFut:   ['beberé','beberás','beberá','beberemos','beberéis','beberán'],
      indCond:  ['bebería','beberías','bebería','beberíamos','beberíais','beberían'],
      subjPres: ['beba','bebas','beba','bebamos','bebáis','beban'],
      subjImp:  ['bebiera','bebieras','bebiera','bebiéramos','bebierais','bebieran']
    }
  },
  aprender: {
    tipo:'regular', conjugacion:'er', participio:'aprendido',
    formas:{
      indPres:  ['aprendo','aprendes','aprende','aprendemos','aprendéis','aprenden'],
      indImp:   ['aprendía','aprendías','aprendía','aprendíamos','aprendíais','aprendían'],
      indPS:    ['aprendí','aprendiste','aprendió','aprendimos','aprendisteis','aprendieron'],
      indFut:   ['aprenderé','aprenderás','aprenderá','aprenderemos','aprenderéis','aprenderán'],
      indCond:  ['aprendería','aprenderías','aprendería','aprenderíamos','aprenderíais','aprenderían'],
      subjPres: ['aprenda','aprendas','aprenda','aprendamos','aprendáis','aprendan'],
      subjImp:  ['aprendiera','aprendieras','aprendiera','aprendiéramos','aprendierais','aprendieran']
    }
  },
  comer: {
    tipo:'regular', conjugacion:'er', participio:'comido',
    formas:{
      indPres:  ['como','comes','come','comemos','coméis','comen'],
      indImp:   ['comía','comías','comía','comíamos','comíais','comían'],
      indPS:    ['comí','comiste','comió','comimos','comisteis','comieron'],
      indFut:   ['comeré','comerás','comerá','comeremos','comeréis','comerán'],
      indCond:  ['comería','comerías','comería','comeríamos','comeríais','comerían'],
      subjPres: ['coma','comas','coma','comamos','comáis','coman'],
      subjImp:  ['comiera','comieras','comiera','comiéramos','comierais','comieran']
    }
  },
  vender: {
    tipo:'regular', conjugacion:'er', participio:'vendido',
    formas:{
      indPres:  ['vendo','vendes','vende','vendemos','vendéis','venden'],
      indImp:   ['vendía','vendías','vendía','vendíamos','vendíais','vendían'],
      indPS:    ['vendí','vendiste','vendió','vendimos','vendisteis','vendieron'],
      indFut:   ['venderé','venderás','venderá','venderemos','venderéis','venderán'],
      indCond:  ['vendería','venderías','vendería','venderíamos','venderíais','venderían'],
      subjPres: ['venda','vendas','venda','vendamos','vendáis','vendan'],
      subjImp:  ['vendiera','vendieras','vendiera','vendiéramos','vendierais','vendieran']
    }
  },
  correr: {
    tipo:'regular', conjugacion:'er', participio:'corrido',
    formas:{
      indPres:  ['corro','corres','corre','corremos','corréis','corren'],
      indImp:   ['corría','corrías','corría','corríamos','corríais','corrían'],
      indPS:    ['corrí','corriste','corrió','corrimos','corristeis','corrieron'],
      indFut:   ['correré','correrás','correrá','correremos','correréis','correrán'],
      indCond:  ['correría','correrías','correría','correríamos','correríais','correrían'],
      subjPres: ['corra','corras','corra','corramos','corráis','corran'],
      subjImp:  ['corriera','corrieras','corriera','corriéramos','corrierais','corrieran']
    }
  },

  /* ── REGULARES -IR ─────────────────────────────── */

  vivir: {
    tipo:'regular', conjugacion:'ir', participio:'vivido',
    formas:{
      indPres:  ['vivo','vives','vive','vivimos','vivís','viven'],
      indImp:   ['vivía','vivías','vivía','vivíamos','vivíais','vivían'],
      indPS:    ['viví','viviste','vivió','vivimos','vivisteis','vivieron'],
      indFut:   ['viviré','vivirás','vivirá','viviremos','viviréis','vivirán'],
      indCond:  ['viviría','vivirías','viviría','viviríamos','viviríais','vivirían'],
      subjPres: ['viva','vivas','viva','vivamos','viváis','vivan'],
      subjImp:  ['viviera','vivieras','viviera','viviéramos','vivierais','vivieran']
    }
  },
  partir: {
    tipo:'regular', conjugacion:'ir', participio:'partido',
    formas:{
      indPres:  ['parto','partes','parte','partimos','partís','parten'],
      indImp:   ['partía','partías','partía','partíamos','partíais','partían'],
      indPS:    ['partí','partiste','partió','partimos','partisteis','partieron'],
      indFut:   ['partiré','partirás','partirá','partiremos','partiréis','partirán'],
      indCond:  ['partiría','partirías','partiría','partiríamos','partiríais','partirían'],
      subjPres: ['parta','partas','parta','partamos','partáis','partan'],
      subjImp:  ['partiera','partieras','partiera','partiéramos','partierais','partieran']
    }
  },
  abrir: {
    /* formas simples regulares; participio irregular: abierto */
    tipo:'regular', conjugacion:'ir', participio:'abierto',
    formas:{
      indPres:  ['abro','abres','abre','abrimos','abrís','abren'],
      indImp:   ['abría','abrías','abría','abríamos','abríais','abrían'],
      indPS:    ['abrí','abriste','abrió','abrimos','abristeis','abrieron'],
      indFut:   ['abriré','abrirás','abrirá','abriremos','abriréis','abrirán'],
      indCond:  ['abriría','abrirías','abriría','abriríamos','abriríais','abrirían'],
      subjPres: ['abra','abras','abra','abramos','abráis','abran'],
      subjImp:  ['abriera','abrieras','abriera','abriéramos','abrierais','abrieran']
    }
  },
  escribir: {
    /* formas simples regulares; participio irregular: escrito */
    tipo:'regular', conjugacion:'ir', participio:'escrito',
    formas:{
      indPres:  ['escribo','escribes','escribe','escribimos','escribís','escriben'],
      indImp:   ['escribía','escribías','escribía','escribíamos','escribíais','escribían'],
      indPS:    ['escribí','escribiste','escribió','escribimos','escribisteis','escribieron'],
      indFut:   ['escribiré','escribirás','escribirá','escribiremos','escribiréis','escribirán'],
      indCond:  ['escribiría','escribirías','escribiría','escribiríamos','escribiríais','escribirían'],
      subjPres: ['escriba','escribas','escriba','escribamos','escribáis','escriban'],
      subjImp:  ['escribiera','escribieras','escribiera','escribiéramos','escribierais','escribieran']
    }
  },
  subir: {
    tipo:'regular', conjugacion:'ir', participio:'subido',
    formas:{
      indPres:  ['subo','subes','sube','subimos','subís','suben'],
      indImp:   ['subía','subías','subía','subíamos','subíais','subían'],
      indPS:    ['subí','subiste','subió','subimos','subisteis','subieron'],
      indFut:   ['subiré','subirás','subirá','subiremos','subiréis','subirán'],
      indCond:  ['subiría','subirías','subiría','subiríamos','subiríais','subirían'],
      subjPres: ['suba','subas','suba','subamos','subáis','suban'],
      subjImp:  ['subiera','subieras','subiera','subiéramos','subierais','subieran']
    }
  },

  /* ── IRREGULARES ───────────────────────────────── */

  ser: {
    tipo:'irregular', conjugacion:'er', participio:'sido',
    formas:{
      indPres:  ['soy','eres','es','somos','sois','son'],
      indImp:   ['era','eras','era','éramos','erais','eran'],
      indPS:    ['fui','fuiste','fue','fuimos','fuisteis','fueron'],
      indFut:   ['seré','serás','será','seremos','seréis','serán'],
      indCond:  ['sería','serías','sería','seríamos','seríais','serían'],
      subjPres: ['sea','seas','sea','seamos','seáis','sean'],
      subjImp:  ['fuera','fueras','fuera','fuéramos','fuerais','fueran']
    }
  },
  estar: {
    tipo:'irregular', conjugacion:'ar', participio:'estado',
    formas:{
      indPres:  ['estoy','estás','está','estamos','estáis','están'],
      indImp:   ['estaba','estabas','estaba','estábamos','estabais','estaban'],
      indPS:    ['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'],
      indFut:   ['estaré','estarás','estará','estaremos','estaréis','estarán'],
      indCond:  ['estaría','estarías','estaría','estaríamos','estaríais','estarían'],
      subjPres: ['esté','estés','esté','estemos','estéis','estén'],
      subjImp:  ['estuviera','estuvieras','estuviera','estuviéramos','estuvierais','estuvieran']
    }
  },
  ir: {
    tipo:'irregular', conjugacion:'ir', participio:'ido',
    formas:{
      indPres:  ['voy','vas','va','vamos','vais','van'],
      indImp:   ['iba','ibas','iba','íbamos','ibais','iban'],
      indPS:    ['fui','fuiste','fue','fuimos','fuisteis','fueron'],
      indFut:   ['iré','irás','irá','iremos','iréis','irán'],
      indCond:  ['iría','irías','iría','iríamos','iríais','irían'],
      subjPres: ['vaya','vayas','vaya','vayamos','vayáis','vayan'],
      subjImp:  ['fuera','fueras','fuera','fuéramos','fuerais','fueran']
    }
  },
  haber: {
    tipo:'irregular', conjugacion:'er', participio:'habido',
    formas:{
      indPres:  ['he','has','ha','hemos','habéis','han'],
      indImp:   ['había','habías','había','habíamos','habíais','habían'],
      indPS:    ['hube','hubiste','hubo','hubimos','hubisteis','hubieron'],
      indFut:   ['habré','habrás','habrá','habremos','habréis','habrán'],
      indCond:  ['habría','habrías','habría','habríamos','habríais','habrían'],
      subjPres: ['haya','hayas','haya','hayamos','hayáis','hayan'],
      subjImp:  ['hubiera','hubieras','hubiera','hubiéramos','hubierais','hubieran']
    }
  },
  tener: {
    tipo:'irregular', conjugacion:'er', participio:'tenido',
    formas:{
      indPres:  ['tengo','tienes','tiene','tenemos','tenéis','tienen'],
      indImp:   ['tenía','tenías','tenía','teníamos','teníais','tenían'],
      indPS:    ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'],
      indFut:   ['tendré','tendrás','tendrá','tendremos','tendréis','tendrán'],
      indCond:  ['tendría','tendrías','tendría','tendríamos','tendríais','tendrían'],
      subjPres: ['tenga','tengas','tenga','tengamos','tengáis','tengan'],
      subjImp:  ['tuviera','tuvieras','tuviera','tuviéramos','tuvierais','tuvieran']
    }
  },
  venir: {
    tipo:'irregular', conjugacion:'ir', participio:'venido',
    formas:{
      indPres:  ['vengo','vienes','viene','venimos','venís','vienen'],
      indImp:   ['venía','venías','venía','veníamos','veníais','venían'],
      indPS:    ['vine','viniste','vino','vinimos','vinisteis','vinieron'],
      indFut:   ['vendré','vendrás','vendrá','vendremos','vendréis','vendrán'],
      indCond:  ['vendría','vendrías','vendría','vendríamos','vendríais','vendrían'],
      subjPres: ['venga','vengas','venga','vengamos','vengáis','vengan'],
      subjImp:  ['viniera','vinieras','viniera','viniéramos','vinierais','vinieran']
    }
  },
  decir: {
    tipo:'irregular', conjugacion:'ir', participio:'dicho',
    formas:{
      indPres:  ['digo','dices','dice','decimos','decís','dicen'],
      indImp:   ['decía','decías','decía','decíamos','decíais','decían'],
      indPS:    ['dije','dijiste','dijo','dijimos','dijisteis','dijeron'],
      indFut:   ['diré','dirás','dirá','diremos','diréis','dirán'],
      indCond:  ['diría','dirías','diría','diríamos','diríais','dirían'],
      subjPres: ['diga','digas','diga','digamos','digáis','digan'],
      subjImp:  ['dijera','dijeras','dijera','dijéramos','dijerais','dijeran']
    }
  },
  poder: {
    tipo:'irregular', conjugacion:'er', participio:'podido',
    formas:{
      indPres:  ['puedo','puedes','puede','podemos','podéis','pueden'],
      indImp:   ['podía','podías','podía','podíamos','podíais','podían'],
      indPS:    ['pude','pudiste','pudo','pudimos','pudisteis','pudieron'],
      indFut:   ['podré','podrás','podrá','podremos','podréis','podrán'],
      indCond:  ['podría','podrías','podría','podríamos','podríais','podrían'],
      subjPres: ['pueda','puedas','pueda','podamos','podáis','puedan'],
      subjImp:  ['pudiera','pudieras','pudiera','pudiéramos','pudierais','pudieran']
    }
  },
  poner: {
    tipo:'irregular', conjugacion:'er', participio:'puesto',
    formas:{
      indPres:  ['pongo','pones','pone','ponemos','ponéis','ponen'],
      indImp:   ['ponía','ponías','ponía','poníamos','poníais','ponían'],
      indPS:    ['puse','pusiste','puso','pusimos','pusisteis','pusieron'],
      indFut:   ['pondré','pondrás','pondrá','pondremos','pondréis','pondrán'],
      indCond:  ['pondría','pondrías','pondría','pondríamos','pondríais','pondrían'],
      subjPres: ['ponga','pongas','ponga','pongamos','pongáis','pongan'],
      subjImp:  ['pusiera','pusieras','pusiera','pusiéramos','pusierais','pusieran']
    }
  },
  hacer: {
    tipo:'irregular', conjugacion:'er', participio:'hecho',
    formas:{
      indPres:  ['hago','haces','hace','hacemos','hacéis','hacen'],
      indImp:   ['hacía','hacías','hacía','hacíamos','hacíais','hacían'],
      indPS:    ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'],
      indFut:   ['haré','harás','hará','haremos','haréis','harán'],
      indCond:  ['haría','harías','haría','haríamos','haríais','harían'],
      subjPres: ['haga','hagas','haga','hagamos','hagáis','hagan'],
      subjImp:  ['hiciera','hicieras','hiciera','hiciéramos','hicierais','hicieran']
    }
  },
  ver: {
    tipo:'irregular', conjugacion:'er', participio:'visto',
    formas:{
      indPres:  ['veo','ves','ve','vemos','veis','ven'],
      indImp:   ['veía','veías','veía','veíamos','veíais','veían'],
      indPS:    ['vi','viste','vio','vimos','visteis','vieron'],
      indFut:   ['veré','verás','verá','veremos','veréis','verán'],
      indCond:  ['vería','verías','vería','veríamos','veríais','verían'],
      subjPres: ['vea','veas','vea','veamos','veáis','vean'],
      subjImp:  ['viera','vieras','viera','viéramos','vierais','vieran']
    }
  },
  dar: {
    tipo:'irregular', conjugacion:'ar', participio:'dado',
    formas:{
      indPres:  ['doy','das','da','damos','dais','dan'],
      indImp:   ['daba','dabas','daba','dábamos','dabais','daban'],
      indPS:    ['di','diste','dio','dimos','disteis','dieron'],
      indFut:   ['daré','darás','dará','daremos','daréis','darán'],
      indCond:  ['daría','darías','daría','daríamos','daríais','darían'],
      subjPres: ['dé','des','dé','demos','deis','den'],
      subjImp:  ['diera','dieras','diera','diéramos','dierais','dieran']
    }
  },
  saber: {
    tipo:'irregular', conjugacion:'er', participio:'sabido',
    formas:{
      indPres:  ['sé','sabes','sabe','sabemos','sabéis','saben'],
      indImp:   ['sabía','sabías','sabía','sabíamos','sabíais','sabían'],
      indPS:    ['supe','supiste','supo','supimos','supisteis','supieron'],
      indFut:   ['sabré','sabrás','sabrá','sabremos','sabréis','sabrán'],
      indCond:  ['sabría','sabrías','sabría','sabríamos','sabríais','sabrían'],
      subjPres: ['sepa','sepas','sepa','sepamos','sepáis','sepan'],
      subjImp:  ['supiera','supieras','supiera','supiéramos','supierais','supieran']
    }
  },
  querer: {
    tipo:'irregular', conjugacion:'er', participio:'querido',
    formas:{
      indPres:  ['quiero','quieres','quiere','queremos','queréis','quieren'],
      indImp:   ['quería','querías','quería','queríamos','queríais','querían'],
      indPS:    ['quise','quisiste','quiso','quisimos','quisisteis','quisieron'],
      indFut:   ['querré','querrás','querrá','querremos','querréis','querrán'],
      indCond:  ['querría','querrías','querría','querríamos','querríais','querrían'],
      subjPres: ['quiera','quieras','quiera','queramos','queráis','quieran'],
      subjImp:  ['quisiera','quisieras','quisiera','quisiéramos','quisierais','quisieran']
    }
  },
  traer: {
    tipo:'irregular', conjugacion:'er', participio:'traído',
    formas:{
      indPres:  ['traigo','traes','trae','traemos','traéis','traen'],
      indImp:   ['traía','traías','traía','traíamos','traíais','traían'],
      indPS:    ['traje','trajiste','trajo','trajimos','trajisteis','trajeron'],
      indFut:   ['traeré','traerás','traerá','traeremos','traeréis','traerán'],
      indCond:  ['traería','traerías','traería','traeríamos','traeríais','traerían'],
      subjPres: ['traiga','traigas','traiga','traigamos','traigáis','traigan'],
      subjImp:  ['trajera','trajeras','trajera','trajéramos','trajerais','trajeran']
    }
  },
  conducir: {
    tipo:'irregular', conjugacion:'ir', participio:'conducido',
    formas:{
      indPres:  ['conduzco','conduces','conduce','conducimos','conducís','conducen'],
      indImp:   ['conducía','conducías','conducía','conducíamos','conducíais','conducían'],
      indPS:    ['conduje','condujiste','condujo','condujimos','condujisteis','condujeron'],
      indFut:   ['conduciré','conducirás','conducirá','conduciremos','conduciréis','conducirán'],
      indCond:  ['conduciría','conducirías','conduciría','conduciríamos','conduciríais','conducirían'],
      subjPres: ['conduzca','conduzcas','conduzca','conduzcamos','conduzcáis','conduzcan'],
      subjImp:  ['condujera','condujeras','condujera','condujéramos','condujerais','condujeran']
    }
  },
  dormir: {
    tipo:'irregular', conjugacion:'ir', participio:'dormido',
    formas:{
      indPres:  ['duermo','duermes','duerme','dormimos','dormís','duermen'],
      indImp:   ['dormía','dormías','dormía','dormíamos','dormíais','dormían'],
      indPS:    ['dormí','dormiste','durmió','dormimos','dormisteis','durmieron'],
      indFut:   ['dormiré','dormirás','dormirá','dormiremos','dormiréis','dormirán'],
      indCond:  ['dormiría','dormirías','dormiría','dormiríamos','dormiríais','dormirían'],
      subjPres: ['duerma','duermas','duerma','durmamos','durmáis','duerman'],
      subjImp:  ['durmiera','durmieras','durmiera','durmiéramos','durmierais','durmieran']
    }
  },
  pedir: {
    tipo:'irregular', conjugacion:'ir', participio:'pedido',
    formas:{
      indPres:  ['pido','pides','pide','pedimos','pedís','piden'],
      indImp:   ['pedía','pedías','pedía','pedíamos','pedíais','pedían'],
      indPS:    ['pedí','pediste','pidió','pedimos','pedisteis','pidieron'],
      indFut:   ['pediré','pedirás','pedirá','pediremos','pediréis','pedirán'],
      indCond:  ['pediría','pedirías','pediría','pediríamos','pediríais','pedirían'],
      subjPres: ['pida','pidas','pida','pidamos','pidáis','pidan'],
      subjImp:  ['pidiera','pidieras','pidiera','pidiéramos','pidierais','pidieran']
    }
  },
  sentir: {
    tipo:'irregular', conjugacion:'ir', participio:'sentido',
    formas:{
      indPres:  ['siento','sientes','siente','sentimos','sentís','sienten'],
      indImp:   ['sentía','sentías','sentía','sentíamos','sentíais','sentían'],
      indPS:    ['sentí','sentiste','sintió','sentimos','sentisteis','sintieron'],
      indFut:   ['sentiré','sentirás','sentirá','sentiremos','sentiréis','sentirán'],
      indCond:  ['sentiría','sentirías','sentiría','sentiríamos','sentiríais','sentirían'],
      subjPres: ['sienta','sientas','sienta','sintamos','sintáis','sientan'],
      subjImp:  ['sintiera','sintieras','sintiera','sintiéramos','sintierais','sintieran']
    }
  },
  oír: {
    tipo:'irregular', conjugacion:'ir', participio:'oído',
    formas:{
      indPres:  ['oigo','oyes','oye','oímos','oís','oyen'],
      indImp:   ['oía','oías','oía','oíamos','oíais','oían'],
      indPS:    ['oí','oíste','oyó','oímos','oísteis','oyeron'],
      indFut:   ['oiré','oirás','oirá','oiremos','oiréis','oirán'],
      indCond:  ['oiría','oirías','oiría','oiríamos','oiríais','oirían'],
      subjPres: ['oiga','oigas','oiga','oigamos','oigáis','oigan'],
      subjImp:  ['oyera','oyeras','oyera','oyéramos','oyerais','oyeran']
    }
  },
  andar: {
    tipo:'irregular', conjugacion:'ar', participio:'andado',
    formas:{
      indPres:  ['ando','andas','anda','andamos','andáis','andan'],
      indImp:   ['andaba','andabas','andaba','andábamos','andabais','andaban'],
      indPS:    ['anduve','anduviste','anduvo','anduvimos','anduvisteis','anduvieron'],
      indFut:   ['andaré','andarás','andará','andaremos','andaréis','andarán'],
      indCond:  ['andaría','andarías','andaría','andaríamos','andaríais','andarían'],
      subjPres: ['ande','andes','ande','andemos','andéis','anden'],
      subjImp:  ['anduviera','anduvieras','anduviera','anduviéramos','anduvierais','anduvieran']
    }
  },
  caber: {
    tipo:'irregular', conjugacion:'er', participio:'cabido',
    formas:{
      indPres:  ['quepo','cabes','cabe','cabemos','cabéis','caben'],
      indImp:   ['cabía','cabías','cabía','cabíamos','cabíais','cabían'],
      indPS:    ['cupe','cupiste','cupo','cupimos','cupisteis','cupieron'],
      indFut:   ['cabré','cabrás','cabrá','cabremos','cabréis','cabrán'],
      indCond:  ['cabría','cabrías','cabría','cabríamos','cabríais','cabrían'],
      subjPres: ['quepa','quepas','quepa','quepamos','quepáis','quepan'],
      subjImp:  ['cupiera','cupieras','cupiera','cupiéramos','cupierais','cupieran']
    }
  },
  salir: {
    tipo:'irregular', conjugacion:'ir', participio:'salido',
    formas:{
      indPres:  ['salgo','sales','sale','salimos','salís','salen'],
      indImp:   ['salía','salías','salía','salíamos','salíais','salían'],
      indPS:    ['salí','saliste','salió','salimos','salisteis','salieron'],
      indFut:   ['saldré','saldrás','saldrá','saldremos','saldréis','saldrán'],
      indCond:  ['saldría','saldrías','saldría','saldríamos','saldríais','saldrían'],
      subjPres: ['salga','salgas','salga','salgamos','salgáis','salgan'],
      subjImp:  ['saliera','salieras','saliera','saliéramos','salierais','salieran']
    }
  },
  caer: {
    tipo:'irregular', conjugacion:'er', participio:'caído',
    formas:{
      indPres:  ['caigo','caes','cae','caemos','caéis','caen'],
      indImp:   ['caía','caías','caía','caíamos','caíais','caían'],
      indPS:    ['caí','caíste','cayó','caímos','caísteis','cayeron'],
      indFut:   ['caeré','caerás','caerá','caeremos','caeréis','caerán'],
      indCond:  ['caería','caerías','caería','caeríamos','caeríais','caerían'],
      subjPres: ['caiga','caigas','caiga','caigamos','caigáis','caigan'],
      subjImp:  ['cayera','cayeras','cayera','cayéramos','cayerais','cayeran']
    }
  },
  valer: {
    tipo:'irregular', conjugacion:'er', participio:'valido',
    formas:{
      indPres:  ['valgo','vales','vale','valemos','valéis','valen'],
      indImp:   ['valía','valías','valía','valíamos','valíais','valían'],
      indPS:    ['valí','valiste','valió','valimos','valisteis','valieron'],
      indFut:   ['valdré','valdrás','valdrá','valdremos','valdréis','valdrán'],
      indCond:  ['valdría','valdrías','valdría','valdríamos','valdríais','valdrían'],
      subjPres: ['valga','valgas','valga','valgamos','valgáis','valgan'],
      subjImp:  ['valiera','valieras','valiera','valiéramos','valierais','valieran']
    }
  }
};

window.VerbMasterData = { PERSONAS, HABER, TIEMPOS, VERBOS };
