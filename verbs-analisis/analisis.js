/* ============================================================
   PANTALLA 2 – ANÁLISIS MORFOLÓGICO
============================================================ */

function setDificultad(btn){
  document.querySelectorAll('.diff-btn').forEach(b => b.className = 'diff-btn');
  const d = btn.dataset.d;
  btn.classList.add('on-'+d[0]);
  ST.dificultad = d;
  nuevaFormaAna();
}

function setModoAna(modo, btn){
  document.querySelectorAll('.atab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ST.modoAna = modo;
  el('panelRef').classList.toggle('hidden', modo !== 'ref');
  el('panelInt').classList.toggle('hidden', modo !== 'int');
  el('revelado').classList.add('hidden');
  el('feedbackInt').classList.add('hidden');
  el('solucionInt').classList.add('hidden');
  nuevaFormaAna();
}

/* Genera una nueva forma verbal para el análisis */
function nuevaFormaAna(){
  const cfg = DIFCONF[ST.dificultad];

  /* 1. Seleccionar modo */
  const modo = rand(cfg.modos);

  /* 2. Seleccionar tiempo */
  let tiempos = [...TIEMPOS[modo].simples];
  if(cfg.tipos === 'solocomp') tiempos = [...TIEMPOS[modo].compuestos];
  if(cfg.tipos === 'ambas')    tiempos = tiempos.concat(TIEMPOS[modo].compuestos);

  /* Para dificultad fácil, filtrar tiempos permitidos */
  if(cfg.tiemposPermitidos){
    tiempos = tiempos.filter(t => cfg.tiemposPermitidos.includes(t.id));
  }
  if(!tiempos.length) tiempos = [...TIEMPOS[modo].simples]; // fallback
  const tiempoObj = rand(tiempos);

  /* 3. Seleccionar verbo */
  let claves = cfg.verbosPermitidos ? cfg.verbosPermitidos : Object.keys(VERBOS);
  const verboKey = rand(claves);
  const verboDato = VERBOS[verboKey];

  /* 4. Seleccionar persona */
  const personaObj = rand(PERSONAS);

  /* 5. Construir forma */
  const forma    = getForma(verboKey, tiempoObj, personaObj.idx);
  const esSimple = !tiempoObj.haberKey;

  ST.anaActual = { personaObj, modo, tiempoObj, verboKey, verboDato, forma, esSimple };

  /* Mostrar forma en grande */
  el('anaForma').textContent = forma;

  /* Limpiar áreas de feedback/revelado */
  el('revelado').classList.add('hidden');
  el('feedbackInt').classList.add('hidden');
  el('solucionInt').classList.add('hidden');

  /* Si estamos en modo interactivo, construir los selectores */
  if(ST.modoAna === 'int') buildInteractivo();
}

/* ── MODO REFLEXIÓN: revelar análisis completo ── */
function revelarAnalisis(){
  const r = ST.anaActual;
  if(!r) return;

  const esSingular  = r.personaObj.numero === 'singular';
  const esPrimOTerc = r.personaObj.idx === 0 || r.personaObj.idx === 2;
  const ambigua     = esSingular && esPrimOTerc && formaAmbigua13(r.verboKey, r.tiempoObj);

  const notaPersona = ambigua
    ? r.personaObj.persona + ' <small style="opacity:.75">(o ' + (r.personaObj.idx===0?'3.ª':'1.ª') + ' persona: forma idéntica en este tiempo)</small>'
    : r.personaObj.persona;

  let html = '<div class="reveal-grid">';
  if(el('chkInf').checked) html += revItem('📝 Infinitivo',   r.verboKey);
  if(el('chkPer').checked) html += revItem('👤 Persona',       notaPersona);
  if(el('chkNum').checked) html += revItem('🔢 Número',        r.personaObj.numero);
  if(el('chkMod').checked) html += revItem('📚 Modo',          r.modo);
  if(el('chkTie').checked) html += revItem('⏱️ Tiempo verbal', r.tiempoObj.label);
  if(el('chkTip').checked) html += revItem('📋 Tipo de forma', r.esSimple ? 'simple' : 'compuesta');
  if(r.verboDato)           html += revItem('📌 Tipo de verbo', r.verboDato.tipo + ' (-' + r.verboDato.conjugacion + ')');
  html += '</div>';

  el('revelado').innerHTML = html;
  el('revelado').classList.remove('hidden');
}

function revItem(lbl, val){
  return `<div class="rev-item"><div class="rev-lbl">${lbl}</div><div class="rev-val">${val}</div></div>`;
}

/* ── MODO INTERACTIVO: construir selectores ── */
function buildInteractivo(){
  const grid = el('interactivoGrid');
  grid.innerHTML = '';
  const show = {
    inf: el('chkInf').checked,
    per: el('chkPer').checked,
    num: el('chkNum').checked,
    mod: el('chkMod').checked,
    tie: el('chkTie').checked,
    tip: el('chkTip').checked
  };

  /* Opciones de persona */
  const optsPersona = PERSONAS.map(p => p.persona).filter((v,i,a) => a.indexOf(v) === i);
  /* Opciones de número */
  const optsNumero  = ['singular','plural'];
  /* Opciones de modo */
  const optsModo    = ['indicativo','subjuntivo'];
  /* Opciones de tiempo (todos) */
  const optsTiempos = [
    ...TIEMPOS.indicativo.simples,
    ...TIEMPOS.indicativo.compuestos,
    ...TIEMPOS.subjuntivo.simples,
    ...TIEMPOS.subjuntivo.compuestos
  ].map(t => t.label);
  /* Opciones tipo */
  const optsTipo    = ['simple','compuesta'];

  if(show.inf) grid.innerHTML += iField('iInf', '📝 Infinitivo', Object.keys(VERBOS));
  if(show.per) grid.innerHTML += iField('iPer', '👤 Persona',    optsPersona);
  if(show.num) grid.innerHTML += iField('iNum', '🔢 Número',     optsNumero);
  if(show.mod) grid.innerHTML += iField('iMod', '📚 Modo',       optsModo);
  if(show.tie) grid.innerHTML += iField('iTie', '⏱️ Tiempo',     [...new Set(optsTiempos)]);
  if(show.tip) grid.innerHTML += iField('iTip', '📋 Tipo',       optsTipo);
}

function iField(id, lbl, opciones){
  const opts = opciones.map(o => `<option value="${o}">${o}</option>`).join('');
  return `
    <div class="ifield">
      <label for="${id}">${lbl}</label>
      <select class="iselect" id="${id}">
        <option value="">– elige –</option>
        ${opts}
      </select>
    </div>`;
}

/* ── CORREGIR RESPUESTAS INTERACTIVAS ── */
function corregirInteractivo(){
  const r = ST.anaActual;
  if(!r){ nuevaFormaAna(); return; }
  const show = {
    inf: el('chkInf').checked,
    per: el('chkPer').checked,
    num: el('chkNum').checked,
    mod: el('chkMod').checked,
    tie: el('chkTie').checked,
    tip: el('chkTip').checked
  };

  let correctas = 0, total = 0;
  // Detectar ambigüedad 1.ª/3.ª singular para este ejercicio concreto
  const esSingular = r.personaObj.numero === 'singular';
  const esPrimOTerc = r.personaObj.idx === 0 || r.personaObj.idx === 2;
  const ambigua = esSingular && esPrimOTerc && formaAmbigua13(r.verboKey, r.tiempoObj);

  function chk(chkKey, selectId, valorCorrecto){
    if(!show[chkKey]) return;
    const sel = el(selectId);
    if(!sel) return;
    total++;
    const resp = sel.value.trim().toLowerCase();
    const ok = resp === valorCorrecto.toLowerCase();
    sel.className = 'iselect ' + (ok ? 'sel-ok' : 'sel-err');
    if(ok) correctas++;
  }

  // Persona: tratamiento especial cuando la forma es ambigua
  if(show.per){
    const sel = el('iPer');
    if(sel){
      total++;
      const resp = sel.value.trim().toLowerCase();
      const correcto = r.personaObj.persona.toLowerCase();
      let ok = resp === correcto;
      // Si la forma es morfológicamente idéntica para 1.ª y 3.ª del singular,
      // aceptar cualquiera de las dos como correcta
      if(!ok && ambigua && (resp === '1.ª persona' || resp === '3.ª persona')){
        ok = true;
      }
      sel.className = 'iselect ' + (ok ? 'sel-ok' : 'sel-err');
      if(ok) correctas++;
    }
  }

  chk('inf', 'iInf', r.verboKey);
  chk('num', 'iNum', r.personaObj.numero);
  chk('mod', 'iMod', r.modo);
  chk('tie', 'iTie', r.tiempoObj.label);
  chk('tip', 'iTip', r.esSimple ? 'simple' : 'compuesta');

  if(total === 0){ alert('Activa al menos un aspecto a analizar.'); return; }

  /* Actualizar marcador */
  if(correctas === total){
    ST.scoreOk++;
    el('sOk').textContent = ST.scoreOk;
  } else {
    ST.scoreErr++;
    el('sErr').textContent = ST.scoreErr;
  }

  /* Feedback visual */
  const fb = el('feedbackInt');
  fb.classList.remove('hidden','fb-ok','fb-par','fb-err');
  let fbClass, fbText;
  if(correctas === total){
    fbClass = 'fb-ok';
    fbText  = ambigua && show.per
      ? '✅ ¡Correcto! (Nota: la forma es idéntica para la 1.ª y la 3.ª persona del singular)'
      : '✅ ¡Perfecto! Todas las respuestas son correctas.';
  } else if(correctas > 0){
    fbClass = 'fb-par';
    fbText  = `⚠️ ${correctas} de ${total} correctas. Revisa las marcadas en rojo.`;
    if(ambigua && show.per) fbText += ' Recuerda que persona 1.ª y 3.ª del singular tienen la misma forma en este tiempo.';
  } else {
    fbClass = 'fb-err';
    fbText  = '❌ Ninguna correcta. ¡No te rindas, vuelve a intentarlo!';
  }
  fb.className = 'feedback ' + fbClass;
  fb.textContent = fbText;

  /* Mostrar solución debajo */
  const sol = el('solucionInt');
  sol.classList.remove('hidden');
  let sHTML = '<div class="reveal-grid">';
  if(show.inf) sHTML += revItem('📝 Infinitivo', r.verboKey);
  if(show.per){
    const notaPersona = ambigua
      ? r.personaObj.persona + ' <small style="opacity:.75">(o '+(r.personaObj.idx===0?'3.ª':'1.ª')+' persona: forma idéntica)</small>'
      : r.personaObj.persona;
    sHTML += revItem('👤 Persona', notaPersona);
  }
  if(show.num) sHTML += revItem('🔢 Número',     r.personaObj.numero);
  if(show.mod) sHTML += revItem('📚 Modo',        r.modo);
  if(show.tie) sHTML += revItem('⏱️ Tiempo',      r.tiempoObj.label);
  if(show.tip) sHTML += revItem('📋 Tipo',        r.esSimple ? 'simple' : 'compuesta');
  sHTML += '</div>';
  sol.innerHTML = sHTML;
}

function resetScore(){
  ST.scoreOk = ST.scoreErr = 0;
  el('sOk').textContent = '0';
  el('sErr').textContent = '0';
}

window.addEventListener('DOMContentLoaded', () => {
  nuevaFormaAna();
});
