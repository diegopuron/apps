/* ============================================================
   FILTRO DE VERBOS
============================================================ */
function setFiltro(btn, scope){
  document.querySelectorAll('#fchipsGen .fchip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on');
  ST.filtroGen = btn.dataset.f;
}

function verbosSegun(filtro){
  const claves = Object.keys(VERBOS);
  if(filtro === 'todos')       return claves;
  if(filtro === 'regulares')   return claves.filter(k => VERBOS[k].tipo === 'regular');
  if(filtro === 'irregulares') return claves.filter(k => VERBOS[k].tipo === 'irregular');
  return claves.filter(k => VERBOS[k].conjugacion === filtro);
}

/* ============================================================
   ANIMACIÓN RULETA
   Cicla por valores con velocidad decreciente y termina en valorFinal.
============================================================ */
function animarRuleta(tapeId, reelId, valores, valorFinal, delay, pasos){
  return new Promise(resolve => {
    const tape = el(tapeId);
    const reel = el(reelId);
    reel.classList.add('spinning');
    let paso = 0;
    function ciclo(){
      if(paso < pasos){
        tape.innerHTML = `<div class="reel-item">${valores[paso % valores.length]}</div>`;
        paso++;
        /* Acelera al principio, frena al final */
        const f = paso / pasos;
        const ms = f < 0.5 ? 60 : 60 + Math.pow((f - 0.5) / 0.5, 2.5) * 500;
        setTimeout(ciclo, ms);
      } else {
        tape.innerHTML = `<div class="reel-item">${valorFinal}</div>`;
        reel.classList.remove('spinning');
        resolve();
      }
    }
    setTimeout(ciclo, delay);
  });
}

/* ============================================================
   LUCES DECORATIVAS
============================================================ */
let _lightInt = null;
function startLights(){
  const classes = ['on-r','on-y','on-g','on-b'];
  let i = 0;
  _lightInt = setInterval(() => {
    document.querySelectorAll('.mlight').forEach((l,n) => {
      l.className = 'mlight';
      if(Math.random() > 0.4) l.classList.add(classes[(n+i)%4]);
    });
    i++;
  }, 200);
}
function stopLights(){
  clearInterval(_lightInt);
  document.querySelectorAll('.mlight').forEach(l => {
    l.className = 'mlight on-g';
  });
  setTimeout(() => {
    document.querySelectorAll('.mlight').forEach(l => l.className = 'mlight');
  }, 800);
}

/* ============================================================
   getModos(): lee el triple radio y devuelve el array de modos activos
============================================================ */
function getModos(){
  const v = document.querySelector('input[name="rModo"]:checked').value;
  if(v === 'indicativo') return ['indicativo'];
  if(v === 'subjuntivo') return ['subjuntivo'];
  return ['indicativo','subjuntivo'];
}

/* ============================================================
   GIRAR RULETAS (Pantalla 1)
============================================================ */
async function girarRuletas(){
  if(ST.girando) return;

  const disponibles = verbosSegun(ST.filtroGen);
  if(!disponibles.length){
    alert('No hay verbos con ese filtro. Por favor selecciona otro.');
    return;
  }

  ST.girando = true;
  ST.tiradas++;
  el('counterPill').textContent = 'Tiradas: ' + ST.tiradas;
  el('btnGirar').disabled = true;
  el('resArea').classList.add('hidden');

  /* ── Selección aleatoria ── */
  const personaObj = rand(PERSONAS);
  const modos      = getModos();
  const modo       = rand(modos);
  const tiempoObj  = rand(tiemposDisp(modo));
  const verboKey   = rand(disponibles);
  const verboDato  = VERBOS[verboKey];
  const forma      = getForma(verboKey, tiempoObj, personaObj.idx);
  const esSimple   = !tiempoObj.haberKey;

  ST.resultadoActual = { personaObj, modo, tiempoObj, verboKey, verboDato, forma, esSimple };

  /* ── Listas para animar ── */
  const vPers = PERSONAS.map(p => p.pronombre);
  const vMod  = ['indicativo','subjuntivo'];
  const vTiem = [
    ...TIEMPOS.indicativo.simples, ...TIEMPOS.indicativo.compuestos,
    ...TIEMPOS.subjuntivo.simples, ...TIEMPOS.subjuntivo.compuestos
  ].map(t => t.label);
  const vVerb = disponibles;

  startLights();
  const N = 24;
  await Promise.all([
    animarRuleta('rtPersona','rwPersona', vPers, personaObj.pronombre,     0, N),
    animarRuleta('rtModo',   'rwModo',    vMod,  modo,                   200, N+4),
    animarRuleta('rtTiempo', 'rwTiempo',  vTiem, tiempoObj.label,        400, N+8),
    animarRuleta('rtVerbo',  'rwVerbo',   vVerb, verboKey+' (-'+verboDato.conjugacion+')', 600, N+12)
  ]);
  stopLights();

  mostrarResultadoGen();
  ST.girando = false;
  el('btnGirar').disabled = false;
}

/* ============================================================
   MOSTRAR RESULTADO (Pantalla 1)
============================================================ */
function mostrarResultadoGen(){
  const r = ST.resultadoActual;
  if(!r) return;
  const area = el('resArea');
  area.classList.remove('hidden');

  const tagClass = r.verboDato.tipo === 'regular' ? 'tag-reg' : 'tag-irr';
  const tagIcon  = r.verboDato.tipo === 'regular' ? '✓' : '★';

  /* La solución (forma conjugada) SIEMPRE empieza oculta.
     Se revela únicamente al pulsar "Mostrar solución". */
  const html = `
    <div class="result-card highlight">
      <span class="tipo-tag ${tagClass}">${tagIcon} ${r.verboDato.tipo} · -${r.verboDato.conjugacion}</span>

      <!-- Datos de la tirada: siempre visibles -->
      <div class="details-grid" style="margin-bottom:20px">
        ${det('👤 Persona',  r.personaObj.pronombre)}
        ${det('📚 Modo',     r.modo)}
        ${det('⏱️ Tiempo',   r.tiempoObj.label)}
        ${det('📝 Verbo',    r.verboKey)}
        ${det('📋 Forma',    r.esSimple ? 'simple' : 'compuesta')}
      </div>

      <!-- Zona de solución: oculta hasta que el usuario pulse el botón -->
      <div id="zonaBotonSol" style="text-align:center;margin-bottom:6px">
        <button class="btn btn-primary" onclick="revelarFormaGen()">
          👁️ Mostrar solución
        </button>
      </div>
      <div id="zonaSolucion" class="hidden">
        <div class="forma-display">${r.forma}</div>
        <div class="details-grid" style="margin-top:10px">
          ${(()=>{
            const ambigua = formaAmbigua13(r.verboKey, r.tiempoObj) && (r.personaObj.idx===0||r.personaObj.idx===2);
            const nota = ambigua
              ? r.personaObj.persona + ' del singular <span style="color:var(--accent2);font-size:.8em">⚠️ forma idéntica a la ' + (r.personaObj.idx===0?'3.ª':'1.ª') + ' persona</span>'
              : r.personaObj.persona + ' del ' + r.personaObj.numero;
            return `<div class="det-item"><div class="det-lbl">👤 Persona</div><div class="det-val">${nota}</div></div>`;
          })()}
        </div>
      </div>

      <div class="res-footer">
        <button class="btn btn-audio btn-sm" onclick="escucharGen()">🔊 Escuchar</button>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="girarRuletas()">🎲 Nueva tirada</button>
          <button class="btn btn-secondary btn-sm" onclick="reiniciarGen()">🔄 Reiniciar</button>
        </div>
      </div>
    </div>`;

  area.innerHTML = html;
}

function det(lbl, val){
  return `<div class="det-item"><div class="det-lbl">${lbl}</div><div class="det-val">${val}</div></div>`;
}

function revelarFormaGen(){
  const zona = el('zonaSolucion');
  const boton = el('zonaBotonSol');
  if(zona)  zona.classList.remove('hidden');
  if(boton) boton.classList.add('hidden');
  /* Leer la forma en voz alta automáticamente al revelar */
  if(ST.resultadoActual) hablar(ST.resultadoActual.forma);
}

function reiniciarGen(){
  ST.resultadoActual = null;
  el('resArea').classList.add('hidden');
  ['rtPersona','rtModo','rtTiempo','rtVerbo'].forEach(id => {
    el(id).innerHTML = '<div class="reel-item">—</div>';
  });
  ST.tiradas = 0;
  el('counterPill').textContent = 'Tiradas: 0';
}

/* ============================================================
   GIRAR UNA SOLA RULETA
   Permite al usuario cambiar únicamente el elemento que no le
   gusta sin alterar los demás. Si aún no hay tirada inicial,
   lanza la tirada completa.
   ruleta: 'persona' | 'modo' | 'tiempo' | 'verbo'
============================================================ */
async function girarUna(ruleta){
  if(ST.girando) return;
  /* Si todavía no hay resultado, hacer tirada completa */
  if(!ST.resultadoActual){ girarRuletas(); return; }

  ST.girando = true;
  el('btnGirar').disabled = true;
  /* Ocultar resultado mientras giramos */
  el('resArea').classList.add('hidden');

  const r   = ST.resultadoActual;
  const disp = verbosSegun(ST.filtroGen);

  let nuevaPersona  = r.personaObj;
  let nuevoModo     = r.modo;
  let nuevoTiempo   = r.tiempoObj;
  let nuevoVerboKey = r.verboKey;

  const vPers = PERSONAS.map(p => p.pronombre);
  const vMod  = ['indicativo','subjuntivo'];
  const vTiem = [
    ...TIEMPOS.indicativo.simples, ...TIEMPOS.indicativo.compuestos,
    ...TIEMPOS.subjuntivo.simples, ...TIEMPOS.subjuntivo.compuestos
  ].map(t => t.label);
  const vVerb = disp;

  const N = 18; // menos pasos que el giro completo: efecto más rápido

  if(ruleta === 'persona'){
    nuevaPersona = rand(PERSONAS);
    await animarRuleta('rtPersona','rwPersona', vPers, nuevaPersona.pronombre, 0, N);
  }
  else if(ruleta === 'modo'){
    const modos = getModos();
    nuevoModo   = rand(modos);
    /* Si el nuevo modo no tiene el tiempo actual, sortear tiempo también */
    const tiemposNuevoModo = tiemposDispPara(nuevoModo);
    if(!tiemposNuevoModo.find(t => t.id === nuevoTiempo.id)){
      nuevoTiempo = rand(tiemposNuevoModo);
      await Promise.all([
        animarRuleta('rtModo',   'rwModo',   vMod,  nuevoModo,         0, N),
        animarRuleta('rtTiempo', 'rwTiempo', vTiem, nuevoTiempo.label, 0, N)
      ]);
    } else {
      await animarRuleta('rtModo','rwModo', vMod, nuevoModo, 0, N);
    }
  }
  else if(ruleta === 'tiempo'){
    /* Rolar solo entre los tiempos del modo actual */
    const lista = tiemposDispPara(nuevoModo);
    nuevoTiempo = rand(lista);
    await animarRuleta('rtTiempo','rwTiempo', vTiem, nuevoTiempo.label, 0, N);
  }
  else if(ruleta === 'verbo'){
    if(!disp.length){ ST.girando = false; el('btnGirar').disabled = false; return; }
    nuevoVerboKey = rand(disp);
    await animarRuleta('rtVerbo','rwVerbo', vVerb,
      nuevoVerboKey+' (-'+VERBOS[nuevoVerboKey].conjugacion+')', 0, N);
  }

  /* Recalcular la forma con los valores (posiblemente mixtos) actualizados */
  const verboDato = VERBOS[nuevoVerboKey];
  const forma     = getForma(nuevoVerboKey, nuevoTiempo, nuevaPersona.idx);
  const esSimple  = !nuevoTiempo.haberKey;

  ST.resultadoActual = {
    personaObj: nuevaPersona,
    modo:       nuevoModo,
    tiempoObj:  nuevoTiempo,
    verboKey:   nuevoVerboKey,
    verboDato,
    forma,
    esSimple
  };

  mostrarResultadoGen();
  ST.girando = false;
  el('btnGirar').disabled = false;
}

/* Versión de tiemposDisp que acepta el modo como parámetro
   en lugar de leerlo del estado (útil dentro de girarUna) */
function tiemposDispPara(modo){
  const cfg   = TIEMPOS[modo];
  const valor = document.querySelector('input[name="rFormas"]:checked').value;
  if(valor === 'simples')  return [...cfg.simples];
  if(valor === 'solocomp') return [...cfg.compuestos];
  return [...cfg.simples, ...cfg.compuestos];
}

window.addEventListener('DOMContentLoaded', () => {
  reiniciarGen();
});
