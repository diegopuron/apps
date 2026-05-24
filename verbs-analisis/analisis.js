/* VERBMASTER · ANÁLISIS MORFOLÓGICO POR NIVELES
   Versión ruta larga: niveles reales, sin almacenamiento personal ni backend. */

const ANA_LEVELS = [
  {
    id:1,
    name:'Presente de indicativo regular',
    short:'Presente reg.',
    desc:'Primer tramo: presente de indicativo con verbos regulares frecuentes. Objetivo: reconocer infinitivo, persona y número sin ruido añadido.',
    tiempos:['indPres'],
    verbos:['cantar','bailar','hablar','estudiar','trabajar','comer','beber','aprender','vender','correr','vivir','partir','subir'],
    target:8
  },
  {
    id:2,
    name:'Presente de indicativo irregular',
    short:'Presente irr.',
    desc:'Presente de indicativo con irregulares frecuentes. Aquí aparecen formas como soy, voy, tengo, hago, digo o puedo.',
    tiempos:['indPres'],
    verbos:['ser','estar','ir','tener','venir','decir','poder','poner','hacer','ver','dar','saber','querer','traer','conducir','dormir','pedir','sentir','oír','salir','caer','valer'],
    target:9
  },
  {
    id:3,
    name:'Pretérito imperfecto de indicativo',
    short:'Imperfecto',
    desc:'Trabajo específico del imperfecto de indicativo. Se entrena la diferencia entre formas en -aba y -ía y las coincidencias entre 1.ª y 3.ª persona.',
    tiempos:['indImp'],
    verbos:null,
    target:9
  },
  {
    id:4,
    name:'Pretérito perfecto simple regular',
    short:'PPS reg.',
    desc:'Pretérito perfecto simple con verbos regulares. Nivel pensado para afianzar acciones terminadas y terminaciones fuertes del pasado.',
    tiempos:['indPS'],
    verbos:['cantar','bailar','hablar','estudiar','trabajar','comer','beber','aprender','vender','correr','vivir','partir','subir','abrir','escribir'],
    target:9
  },
  {
    id:5,
    name:'Pretérito perfecto simple irregular',
    short:'PPS irr.',
    desc:'Pretérito perfecto simple con irregulares frecuentes: fui, estuve, tuve, hice, dije, pude, puse, vine, di, supe…',
    tiempos:['indPS'],
    verbos:['ser','estar','ir','tener','venir','decir','poder','poner','hacer','ver','dar','saber','querer','traer','conducir','dormir','pedir','sentir','oír','andar','caber'],
    target:10
  },
  {
    id:6,
    name:'Futuro simple',
    short:'Futuro',
    desc:'Futuro simple de indicativo. Se mezclan regulares e irregulares para diferenciar cantaré de tendré, haré, pondré o saldré.',
    tiempos:['indFut'],
    verbos:null,
    target:9
  },
  {
    id:7,
    name:'Condicional simple',
    short:'Condicional',
    desc:'Condicional simple. Se trabajan formas como cantaría, tendría, haría, podría o saldría, con atención a la persona y al número.',
    tiempos:['indCond'],
    verbos:null,
    target:9
  },
  {
    id:8,
    name:'Indicativo simple mezclado',
    short:'Ind. simple',
    desc:'Mezcla de presentes, pasados, futuro y condicional de indicativo. Este nivel comprueba que no se resuelve por intuición de un solo tiempo.',
    tiempos:['indPres','indImp','indPS','indFut','indCond'],
    verbos:null,
    target:12
  },
  {
    id:9,
    name:'Presente de subjuntivo regular',
    short:'Subj. pres. reg.',
    desc:'Entrada al subjuntivo: presente con verbos regulares. La ruleta ya separa modo y tiempo; aquí se practica el valor formal del presente.',
    tiempos:['subjPres'],
    verbos:['cantar','bailar','hablar','estudiar','trabajar','comer','beber','aprender','vender','correr','vivir','partir','subir'],
    target:9
  },
  {
    id:10,
    name:'Presente de subjuntivo irregular',
    short:'Subj. pres. irr.',
    desc:'Presente de subjuntivo con irregulares frecuentes: sea, esté, vaya, tenga, venga, diga, pueda, ponga, haga…',
    tiempos:['subjPres'],
    verbos:['ser','estar','ir','tener','venir','decir','poder','poner','hacer','ver','dar','saber','querer','traer','conducir','dormir','pedir','sentir','oír','salir','caer','valer'],
    target:10
  },
  {
    id:11,
    name:'Imperfecto de subjuntivo en -ra',
    short:'Subj. -ra',
    desc:'Pretérito imperfecto de subjuntivo en la forma -ra: cantara, comiera, viviera, tuviera, fuera…',
    tiempos:['subjImp'],
    verbos:null,
    target:10
  },
  {
    id:12,
    name:'Imperfecto de subjuntivo en -se',
    short:'Subj. -se',
    desc:'Pretérito imperfecto de subjuntivo en la forma -se: cantase, comiese, viviese, tuviese, fuese…',
    tiempos:['subjImpEse'],
    verbos:null,
    target:10
  },
  {
    id:13,
    name:'Subjuntivo simple mezclado',
    short:'Subj. simple',
    desc:'Mezcla de presente e imperfecto de subjuntivo. El reto es distinguir tiempo y variante sin depender solo del modo.',
    tiempos:['subjPres','subjImp','subjImpEse'],
    verbos:null,
    target:12
  },
  {
    id:14,
    name:'Pretérito perfecto compuesto de indicativo',
    short:'He cantado',
    desc:'Primera tanda de formas compuestas: haber en presente + participio. Se practica la estructura he/has/ha/hemos/habéis/han + participio.',
    tiempos:['indPerfComp'],
    verbos:null,
    target:9
  },
  {
    id:15,
    name:'Pluscuamperfecto de indicativo',
    short:'Había cantado',
    desc:'Formas con había, habías, habíamos… + participio. Atención: varias personas pueden parecerse mucho.',
    tiempos:['indPluscuamp'],
    verbos:null,
    target:9
  },
  {
    id:16,
    name:'Compuestas avanzadas de indicativo',
    short:'Ind. comp.',
    desc:'Futuro compuesto y condicional compuesto: habré cantado, habría venido, habrán hecho…',
    tiempos:['indFutComp','indCondComp'],
    verbos:null,
    target:10
  },
  {
    id:17,
    name:'Compuestas de subjuntivo',
    short:'Subj. comp.',
    desc:'Pretérito perfecto compuesto y pluscuamperfectos de subjuntivo: haya cantado, hubiera venido, hubiese dicho…',
    tiempos:['subjPerfComp','subjPluscuamp','subjPluscuampEse'],
    verbos:null,
    target:12
  },
  {
    id:18,
    name:'Participios irregulares en formas compuestas',
    short:'Participios irr.',
    desc:'Reto específico con participios que no siguen el patrón esperado: abierto, escrito, dicho, puesto, hecho, visto…',
    tiempos:['indPerfComp','indPluscuamp','indFutComp','indCondComp','subjPerfComp','subjPluscuamp','subjPluscuampEse'],
    verbos:['abrir','escribir','decir','poner','hacer','ver'],
    target:10
  },
  {
    id:19,
    name:'Mezcla de contraste',
    short:'Contraste',
    desc:'Contraste entre indicativo y subjuntivo, simples y compuestas. Nivel largo para evitar respuestas automáticas.',
    tiempos:['indPres','indImp','indPS','indFut','indCond','subjPres','subjImp','subjImpEse','indPerfComp','indPluscuamp','indFutComp','indCondComp','subjPerfComp','subjPluscuamp','subjPluscuampEse'],
    verbos:null,
    target:14
  },
  {
    id:20,
    name:'Maestría verbal',
    short:'Maestría',
    desc:'Nivel final: todos los tiempos disponibles, todos los verbos y todas las formas. Pensado para sesiones de repaso largo o alumnado que ya domina la ruta.',
    tiempos:null,
    verbos:null,
    target:16
  }
];

Object.assign(ST,{
  modoAna:'int',
  nivelActual:1,
  nivelMax:1,
  nivelOk:0,
  nivelErr:0,
  ejercicios:0,
  scoreOk:0,
  scoreErr:0,
  anaActual:null,
  ejercicioCorregido:false,
  profesorActivo:false
});

function nivel(){return ANA_LEVELS.find(n=>n.id===ST.nivelActual)||ANA_LEVELS[0];}
function tiempoById(id){for(const modo of Object.keys(TIEMPOS)){const all=[...TIEMPOS[modo].simples,...TIEMPOS[modo].compuestos];const found=all.find(t=>t.id===id);if(found)return{modo,tiempoObj:found};}return null;}
function tiemposParaNivel(lv){if(lv.tiempos)return lv.tiempos.map(tiempoById).filter(Boolean);const lista=[];Object.keys(TIEMPOS).forEach(modo=>{[...TIEMPOS[modo].simples,...TIEMPOS[modo].compuestos].forEach(tiempoObj=>lista.push({modo,tiempoObj}));});return lista;}
function verbosParaNivel(lv){return lv.verbos&&lv.verbos.length?lv.verbos.filter(v=>VERBOS[v]):Object.keys(VERBOS);}

function setNivel(id,force=false){if(!force&&id>ST.nivelMax)return;ST.nivelActual=Math.max(1,Math.min(id,ANA_LEVELS.length));ST.nivelOk=0;ST.nivelErr=0;ST.ejercicioCorregido=false;renderRuta();nuevaFormaAna();}

function nuevaFormaAna(){
  const lv=nivel();
  const tiempos=tiemposParaNivel(lv);
  if(!tiempos.length){alert('Este nivel no tiene tiempos disponibles. Revisa la configuración.');return;}
  const item=rand(tiempos);
  const claves=verbosParaNivel(lv);
  if(!claves.length){alert('Este nivel no tiene verbos disponibles. Revisa la configuración.');return;}
  const verboKey=rand(claves);
  const verboDato=VERBOS[verboKey];
  const personaObj=rand(PERSONAS);
  const forma=getForma(verboKey,item.tiempoObj,personaObj.idx);
  const esSimple=!item.tiempoObj.haberKey;
  ST.anaActual={personaObj,modo:item.modo,tiempoObj:item.tiempoObj,verboKey,verboDato,forma,esSimple};
  ST.ejercicioCorregido=false;
  el('anaForma').textContent=forma;
  el('feedbackInt').classList.add('hidden');
  el('solucionInt').classList.add('hidden');
  buildInteractivo();
  renderRuta();
}

function camposActivos(){return{inf:el('chkInf').checked,per:el('chkPer').checked,num:el('chkNum').checked,mod:el('chkMod').checked,tie:el('chkTie').checked,tip:el('chkTip').checked};}
function buildInteractivo(){const grid=el('interactivoGrid');grid.innerHTML='';const show=camposActivos();const optsPersona=PERSONAS.map(p=>p.persona).filter((v,i,a)=>a.indexOf(v)===i);const optsNumero=['singular','plural'];const optsModo=['indicativo','subjuntivo'];const optsTiempos=[...new Set([...TIEMPOS.indicativo.simples,...TIEMPOS.indicativo.compuestos,...TIEMPOS.subjuntivo.simples,...TIEMPOS.subjuntivo.compuestos].map(t=>t.label))];const optsTipo=['simple','compuesta'];if(show.inf)grid.innerHTML+=iField('iInf','📝 Infinitivo',Object.keys(VERBOS));if(show.per)grid.innerHTML+=iField('iPer','👤 Persona',optsPersona);if(show.num)grid.innerHTML+=iField('iNum','🔢 Número',optsNumero);if(show.mod)grid.innerHTML+=iField('iMod','📚 Modo',optsModo);if(show.tie)grid.innerHTML+=iField('iTie','⏱️ Tiempo',optsTiempos);if(show.tip)grid.innerHTML+=iField('iTip','📋 Tipo',optsTipo);}
function iField(id,lbl,opciones){const opts=opciones.map(o=>`<option value="${o}">${o}</option>`).join('');return `<div class="ifield"><label for="${id}">${lbl}</label><select class="iselect" id="${id}"><option value="">– elige –</option>${opts}</select></div>`;}

function corregirInteractivo(){
  if(ST.ejercicioCorregido){
    const fb=el('feedbackInt');
    fb.className='feedback fb-par';
    fb.textContent='Esta forma ya está corregida. Pulsa “Siguiente forma” para seguir avanzando.';
    fb.classList.remove('hidden');
    return;
  }
  const r=ST.anaActual;if(!r){nuevaFormaAna();return;}
  const show=camposActivos();let correctas=0,total=0;
  const esSingular=r.personaObj.numero==='singular';const esPrimOTerc=r.personaObj.idx===0||r.personaObj.idx===2;const ambigua=esSingular&&esPrimOTerc&&formaAmbigua13(r.verboKey,r.tiempoObj);
  function chk(chkKey,selectId,valorCorrecto){if(!show[chkKey])return;const sel=el(selectId);if(!sel)return;total++;const resp=sel.value.trim().toLowerCase();const ok=resp===valorCorrecto.toLowerCase();sel.className='iselect '+(ok?'sel-ok':'sel-err');if(ok)correctas++;}
  if(show.per){const sel=el('iPer');if(sel){total++;const resp=sel.value.trim().toLowerCase();const correcto=r.personaObj.persona.toLowerCase();let ok=resp===correcto;if(!ok&&ambigua&&(resp==='1.ª persona'||resp==='3.ª persona'))ok=true;sel.className='iselect '+(ok?'sel-ok':'sel-err');if(ok)correctas++;}}
  chk('inf','iInf',r.verboKey);chk('num','iNum',r.personaObj.numero);chk('mod','iMod',r.modo);chk('tie','iTie',r.tiempoObj.label);chk('tip','iTip',r.esSimple?'simple':'compuesta');
  if(total===0){alert('Activa al menos un aspecto a analizar.');return;}
  ST.ejercicioCorregido=true;ST.ejercicios++;
  const perfecto=correctas===total;
  if(perfecto){ST.scoreOk++;ST.nivelOk++;}else{ST.scoreErr++;ST.nivelErr++;}
  renderFeedback(correctas,total,ambigua,perfecto);renderSolucion(r,show,ambigua);
  if(perfecto&&ST.nivelOk>=nivel().target)completarNivel();else renderRuta();
}

function renderFeedback(correctas,total,ambigua,perfecto){const fb=el('feedbackInt');fb.classList.remove('hidden','fb-ok','fb-par','fb-err');let fbClass,fbText;if(perfecto){fbClass='fb-ok';fbText='✅ Perfecto. Sumas un avance en esta misión.';if(ambigua)fbText+=' Nota: esta forma admite 1.ª o 3.ª persona del singular.';}else if(correctas>0){fbClass='fb-par';fbText=`⚠️ ${correctas} de ${total} correctas. Mira las marcadas en rojo y compara con la solución.`;}else{fbClass='fb-err';fbText='❌ Ninguna correcta. Observa la solución y prueba otra forma.';}fb.className='feedback '+fbClass;fb.textContent=fbText;}
function renderSolucion(r,show,ambigua){const sol=el('solucionInt');sol.classList.remove('hidden');let sHTML='<div class="reveal-grid">';if(show.inf)sHTML+=revItem('📝 Infinitivo',r.verboKey);if(show.per){const notaPersona=ambigua?r.personaObj.persona+' <small style="opacity:.75">(o '+(r.personaObj.idx===0?'3.ª':'1.ª')+' persona: forma idéntica)</small>':r.personaObj.persona;sHTML+=revItem('👤 Persona',notaPersona);}if(show.num)sHTML+=revItem('🔢 Número',r.personaObj.numero);if(show.mod)sHTML+=revItem('📚 Modo',r.modo);if(show.tie)sHTML+=revItem('⏱️ Tiempo',r.tiempoObj.label);if(show.tip)sHTML+=revItem('📋 Tipo',r.esSimple?'simple':'compuesta');sHTML+='</div><div class="flex-c mt-14"><button class="btn btn-primary btn-sm" onclick="nuevaFormaAna()">➡️ Siguiente forma</button></div>';sol.innerHTML=sHTML;}
function revItem(lbl,val){return `<div class="rev-item"><div class="rev-lbl">${lbl}</div><div class="rev-val">${val}</div></div>`;}
function completarNivel(){const actual=nivel();if(ST.nivelMax<actual.id+1&&actual.id<ANA_LEVELS.length)ST.nivelMax=actual.id+1;const fb=el('feedbackInt');fb.className='feedback fb-ok';fb.textContent=actual.id<ANA_LEVELS.length?`🏆 Misión completada: ${actual.name}. Nivel ${actual.id+1} desbloqueado.`:'🏆 Ruta completada. Has llegado al nivel de maestría.';renderRuta();}
function renderRuta(){const lv=nivel();el('counterPill').textContent='Nivel '+ST.nivelActual;el('missionTitle').textContent=`Nivel ${lv.id}: ${lv.name}`;el('missionDesc').textContent=lv.desc;el('progressText').textContent=`${Math.min(ST.nivelOk,lv.target)} / ${lv.target} aciertos perfectos`;el('sessionText').textContent=`Sesión: ${ST.scoreOk} aciertos · ${ST.scoreErr} errores · ${ST.ejercicios} ejercicios`;el('progressFill').style.width=Math.min(100,(ST.nivelOk/lv.target)*100)+'%';const strip=el('levelStrip');strip.innerHTML=ANA_LEVELS.map(n=>{const locked=n.id>ST.nivelMax;const active=n.id===ST.nivelActual;return `<button class="level-pill ${active?'active':''} ${locked?'locked':''}" onclick="setNivel(${n.id})" title="${n.name}">${locked?'🔒':'✓'} ${n.id}. ${n.short}</button>`;}).join('');const teacher=el('teacherLevels');if(teacher&&ST.profesorActivo)teacher.innerHTML=ANA_LEVELS.map(n=>`<button class="btn btn-secondary btn-xs" onclick="setNivelProfesor(${n.id})">Nivel ${n.id}</button>`).join('');}
function codigoActual(){const base=`ANA-N${ST.nivelMax}-A${ST.scoreOk}-E${ST.scoreErr}-R${ST.ejercicios}`;const checksum=base.split('').reduce((acc,ch)=>acc+ch.charCodeAt(0),0)%97;return `${base}-C${String(checksum).padStart(2,'0')}`;}
function checksumCodigo(base){return base.split('').reduce((acc,ch)=>acc+ch.charCodeAt(0),0)%97;}
function finalizarSesion(){const panel=el('sessionSummary');const lv=nivel();const code=codigoActual();panel.classList.remove('hidden');panel.innerHTML=`<div class="summary-card"><div class="card-title">🏁 Sesión finalizada</div><h2>Copia este código en la libreta</h2><div class="summary-grid"><div><strong>Nivel desbloqueado</strong><span>${ST.nivelMax}</span></div><div><strong>Nivel actual</strong><span>${lv.id}: ${lv.short}</span></div><div><strong>Aciertos</strong><span>${ST.scoreOk}</span></div><div><strong>Errores</strong><span>${ST.scoreErr}</span></div></div><div class="code-box" id="finalCode">${code}</div><div class="flex-c mt-14"><button class="btn btn-primary" onclick="copiarCodigo()">📋 Copiar código</button><button class="btn btn-secondary" onclick="window.print()">🖨️ Imprimir</button></div><p class="text-muted" style="text-align:center;margin-top:12px">El código no contiene nombre ni datos personales. Solo resume el progreso de esta sesión.</p></div>`;panel.scrollIntoView({behavior:'smooth',block:'start'});}
function copiarCodigo(){const txt=el('finalCode')?.textContent||codigoActual();navigator.clipboard?.writeText(txt);}
function abrirCodigo(){const panel=el('codePanel');panel.classList.remove('hidden');panel.innerHTML=`<div class="summary-card"><div class="card-title">🔑 Continuar con código</div><h2>Introduce el código de la libreta</h2><p class="text-muted">Formato esperado: ANA-N4-A18-E3-R21-C00. Solo usaremos el nivel desbloqueado y el marcador.</p><div class="code-input-row"><input id="resumeCode" class="code-input" placeholder="ANA-N4-A18-E3-R21-C00"><button class="btn btn-primary" onclick="usarCodigo()">Continuar</button></div><div id="codeMsg" class="hidden"></div></div>`;panel.scrollIntoView({behavior:'smooth',block:'start'});}
function usarCodigo(){const raw=(el('resumeCode').value||'').trim().toUpperCase();const msg=el('codeMsg');const m=raw.match(/^ANA-N(\d+)-A(\d+)-E(\d+)-R(\d+)-C(\d{2})$/);if(!m){msg.className='feedback fb-err';msg.textContent='Código no reconocido. Revisa guiones, letras y números.';return;}const base=`ANA-N${m[1]}-A${m[2]}-E${m[3]}-R${m[4]}`;const esperado=String(checksumCodigo(base)).padStart(2,'0');if(m[5]!==esperado){msg.className='feedback fb-err';msg.textContent='El código tiene algún carácter mal copiado. Revisa el final C'+m[5]+'.';return;}const n=Math.max(1,Math.min(parseInt(m[1],10),ANA_LEVELS.length));ST.nivelMax=n;ST.scoreOk=parseInt(m[2],10)||0;ST.scoreErr=parseInt(m[3],10)||0;ST.ejercicios=parseInt(m[4],10)||0;ST.nivelOk=0;ST.nivelErr=0;setNivel(n,true);msg.className='feedback fb-ok';msg.textContent=`Código cargado. Continúas desde el nivel ${n}.`;}
function reiniciarRuta(){ST.nivelActual=1;ST.nivelMax=1;ST.nivelOk=0;ST.nivelErr=0;ST.scoreOk=0;ST.scoreErr=0;ST.ejercicios=0;ST.ejercicioCorregido=false;el('sessionSummary').classList.add('hidden');el('codePanel').classList.add('hidden');renderRuta();nuevaFormaAna();}
function codigoProfesorValido(valor){return (valor||'').trim().toUpperCase()==='AULA23';}
function verificarProfesor(){const input=el('teacherCode');const msg=el('teacherMsg');if(codigoProfesorValido(input?.value)){ST.profesorActivo=true;el('teacherLogin')?.classList.add('hidden');el('teacherPanel')?.classList.remove('hidden');if(msg){msg.className='feedback fb-ok';msg.textContent='Modo profesor activado.';}renderRuta();}else{if(msg){msg.className='feedback fb-err';msg.textContent='Código profesor incorrecto.';}}}
function cerrarProfesor(){ST.profesorActivo=false;el('teacherPanel')?.classList.add('hidden');el('teacherLogin')?.classList.remove('hidden');const input=el('teacherCode');if(input)input.value='';const msg=el('teacherMsg');if(msg)msg.classList.add('hidden');renderRuta();}
function requiereProfesor(){if(ST.profesorActivo)return true;alert('Introduce primero el código profesor.');return false;}
function setNivelProfesor(id){if(!requiereProfesor())return;if(ST.nivelMax<id)ST.nivelMax=id;setNivel(id,true);renderRuta();}
function desbloquearTodo(){if(!requiereProfesor())return;ST.nivelMax=ANA_LEVELS.length;renderRuta();}
function escucharAna(){if(ST.anaActual)hablar(ST.anaActual.forma);}
window.addEventListener('DOMContentLoaded',()=>{['chkInf','chkPer','chkNum','chkMod','chkTie','chkTip'].forEach(id=>{const c=el(id);if(c)c.addEventListener('change',buildInteractivo);});renderRuta();nuevaFormaAna();});
