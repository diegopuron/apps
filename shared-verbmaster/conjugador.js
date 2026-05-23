/* ============================================================
   ESTADO GLOBAL
============================================================ */
var ST = {
  /* Generador */
  filtroGen: 'todos',
  girando:   false,
  tiradas:   0,
  resultadoActual: null,
  /* Análisis */
  modoAna:     'ref',     // 'ref' | 'int'
  dificultad:  'facil',
  anaActual:   null,
  scoreOk:     0,
  scoreErr:    0
};

/* ============================================================
   UTILIDADES
============================================================ */
function rand(arr){ return arr[Math.floor(Math.random() * arr.length)] }
function el(id)   { return document.getElementById(id) }

/* ============================================================
   OBTENER LISTA DE TIEMPOS DISPONIBLES
   Tres modos: 'simples' | 'solocomp' | 'ambas'
   Delegamos en tiemposDispPara (definida junto a girarUna)
   para no duplicar la lógica.
============================================================ */
function tiemposDisp(modo){ return tiemposDispPara(modo); }

/* ============================================================
   toEse(): convierte formas en -ra/-ara/-iera a sus equivalentes en -se
   Sufijos más largos primero para evitar solapamientos.
   Cubre -ara→-ase, -iera→-iese, -era→-ese y sus plurales,
   incluidas formas de nosotros con tilde: -áramos→-ásemos, etc.
============================================================ */
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

/* ============================================================
   CONSTRUIR FORMA VERBAL
   - Forma compuesta: HABER[haberKey][idx] + participio
   - subjImpEse: calcula la forma -se a partir de subjImp con toEse()
   - Forma simple: verbo.formas[tiempoId][idx]
============================================================ */
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

/* ============================================================
   AMBIGÜEDAD PERSONA 1.ª / 3.ª SINGULAR
   Compara directamente las formas generadas para los índices 0 (yo) y 2 (él/ella).
   Si son idénticas, la persona es morfológicamente indeterminada entre ambas.
   Esto cubre: pretérito imperfecto de indicativo, condicional simple,
   presente y pretérito imperfecto de subjuntivo, y todas las formas compuestas
   construidas sobre auxiliares que también coinciden (había, habría, haya, hubiera).
============================================================ */
function formaAmbigua13(verboKey, tiempoObj){
  return getForma(verboKey, tiempoObj, 0) === getForma(verboKey, tiempoObj, 2);
}

/* ============================================================
   SÍNTESIS DE VOZ
============================================================ */
function hablar(texto){
  if(!('speechSynthesis' in window)){ alert('Tu navegador no soporta síntesis de voz.'); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'es-ES'; u.rate = 0.88; u.pitch = 1;
  window.speechSynthesis.speak(u);
}
function escucharGen(){
  if(ST.resultadoActual) hablar(ST.resultadoActual.forma);
}
function escucharAna(){
  if(ST.anaActual) hablar(ST.anaActual.forma);
}

/* Tema claro/oscuro: inicialización compartida */
function initTheme(){
  const btn = el('themeBtn');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    btn.textContent = dark ? '🌙' : '☀️';
  });
}
window.addEventListener('DOMContentLoaded', initTheme);
