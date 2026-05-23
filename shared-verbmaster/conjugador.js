/* Núcleo común de VerbMaster. Cargar después de datos.js */

function rand(arr){ return arr[Math.floor(Math.random() * arr.length)] }

function verbosSegun(filtro){
  const claves = Object.keys(VERBOS);
  if(filtro === 'todos')       return claves;
  if(filtro === 'regulares')   return claves.filter(k => VERBOS[k].tipo === 'regular');
  if(filtro === 'irregulares') return claves.filter(k => VERBOS[k].tipo === 'irregular');
  return claves.filter(k => VERBOS[k].conjugacion === filtro);
}

function toEse(forms){
  return forms.map(f => f
    .replace(/áramos$/, 'ásemos')
    .replace(/iéramos$/, 'iésemos')
    .replace(/éramos$/, 'ésemos')
    .replace(/arais$/,  'aseis')
    .replace(/ierais$/, 'ieseis')
    .replace(/erais$/,  'eseis')
    .replace(/aran$/,   'asen')
    .replace(/ieran$/,  'iesen')
    .replace(/eran$/,   'esen')
    .replace(/iera$/,   'iese')
    .replace(/ieras$/,  'ieses')
    .replace(/era$/,    'ese')
    .replace(/eras$/,   'eses')
    .replace(/ara$/,    'ase')
    .replace(/aras$/,   'ases')
  );
}

function getForma(verboKey, tiempoObj, personaIdx){
  const v = VERBOS[verboKey];
  if(!v) return '—';
  if(tiempoObj.haberKey){
    /* Forma compuesta */
    return HABER[tiempoObj.haberKey][personaIdx] + ' ' + v.participio;
  }
  if(tiempoObj.id === 'subjImpEse'){
    /* Imperfecto de subjuntivo -se: se deriva dinámicamente de subjImp */
    return toEse(v.formas['subjImp'])[personaIdx];
  }
  /* Forma simple almacenada */
  const arr = v.formas[tiempoObj.id];
  return arr ? arr[personaIdx] : '—';
}

function formaAmbigua13(verboKey, tiempoObj){
  return getForma(verboKey, tiempoObj, 0) === getForma(verboKey, tiempoObj, 2);
}

window.VerbMasterCore = { rand, verbosSegun, toEse, getForma, formaAmbigua13 };
