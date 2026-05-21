let current = 0;
let program = [];
let planOk = false;
let teacherOk = false;
let missionSolved = false;
let robot = {x:0,y:3,dir:'right'};
let goal = {x:4,y:3};
let isRunning = false;
let executionSteps = [];
let activeStepIndex = -1;

function setRunDisabled(value){
 document.getElementById('runBtn').disabled = value;
 document.getElementById('runBtnBoard').disabled = value;
}
function setNextDisabled(value){
 document.getElementById('nextBtn').disabled = value;
 document.getElementById('nextBtnBoard').disabled = value;
}
function currentMission(){ return missions[current]; }
function isWall(x,y){ return currentMission().walls.some(w => w.x === x && w.y === y); }

function loadMission(){
 const m = currentMission();
 document.getElementById('missionTitle').textContent = m.title;
 document.getElementById('missionText').textContent = m.text;
 robot = {...m.start};
 goal = {...m.goal};
 program = [];
 planOk = false;
 teacherOk = false;
 missionSolved = false;
 document.getElementById('plan').value = '';
 document.getElementById('planResult').textContent = '';
 document.getElementById('program').textContent = 'Todavía no hay bloques.';
 document.getElementById('result').textContent = '';
 document.getElementById('teacherBox').style.display = 'none';
 document.getElementById('teacherCode').value = '';
 document.getElementById('unlockResult').textContent = '';
 document.getElementById('checkpointBox').style.display = 'none';
 document.getElementById('checkpointBox').innerHTML = '';
 setRunDisabled(true); setNextDisabled(true); render();
}

function render(){
 const grid = document.getElementById('grid');
 grid.innerHTML = '';
 for(let y=0; y<8; y++){
  for(let x=0; x<8; x++){
   const c = document.createElement('div');
   c.className = 'cell';
   if(isWall(x,y)){ c.classList.add('wall'); c.textContent = '🪨'; }
   if(x === goal.x && y === goal.y) c.textContent = '⭐';
   if(x === robot.x && y === robot.y) c.textContent = directionSymbols[robot.dir];
   grid.appendChild(c);
  }
 }
}

function addBlock(type){ program.push(type); renderProgram(); teacherOk=false; missionSolved=false; setRunDisabled(true); setNextDisabled(true); }
function renderProgram(){
 const names = {move:'Avanzar', left:'Girar izquierda', right:'Girar derecha', repeat:'Repetir anterior'};
 const box = document.getElementById('program');
 if(program.length === 0){ box.textContent = 'Todavía no hay bloques.'; return; }
 box.innerHTML = program.map((b,i)=>`<span class="program-block" id="block-${i}">${i+1}. ${names[b]}</span>`).join(' ');
}
function clearProgram(){ program=[]; renderProgram(); teacherOk=false; missionSolved=false; setRunDisabled(true); setNextDisabled(true); }

function validatePlan(){
 const t = document.getElementById('plan').value.toLowerCase().trim();
 if(t.length < 20){ document.getElementById('planResult').innerHTML='<span class="warning">Explica mejor el plan antes de seguir.</span>'; planOk=false; }
 else if(!t.includes('avanz') && !t.includes('gir') && !t.includes('repet') && !t.includes('rodea')){ document.getElementById('planResult').innerHTML='<span class="warning">Usa palabras de programación: avanzar, girar, repetir, rodear...</span>'; planOk=false; }
 else{ document.getElementById('planResult').innerHTML='<span class="ok">Explicación suficiente. Ahora programa.</span>'; planOk=true; }
 teacherOk=false; setRunDisabled(true);
}
function countWord(text, word){ return (text.match(new RegExp(word,'g')) || []).length; }
function getCoherenceFeedback(){
 const text = document.getElementById('plan').value.toLowerCase();
 const feedback = [];
 const avanzarText=countWord(text,'avanz'), girarText=countWord(text,'gir'), repetirText=countWord(text,'repet');
 const avanzarProg=program.filter(b=>b==='move').length, girarProg=program.filter(b=>b==='left'||b==='right').length, repetirProg=program.filter(b=>b==='repeat').length;
 if(avanzarText>0 && avanzarProg===0) feedback.push('Dices avanzar, pero no hay bloques de avanzar.');
 if(girarText>0 && girarProg===0) feedback.push('Dices girar, pero no hay giros.');
 if(repetirText>0 && repetirProg===0) feedback.push('Dices repetir, pero no hay bucle.');
 if(avanzarProg>0 && avanzarText===0) feedback.push('Programas avanzar, pero no lo explicas.');
 if(girarProg>0 && girarText===0) feedback.push('Programas giros, pero no los explicas.');
 if(repetirProg>0 && repetirText===0) feedback.push('Usas repetir, pero no lo explicas.');
 return feedback;
}
function checkCoherence(){
 const feedback=getCoherenceFeedback();
 if(!planOk){ document.getElementById('result').textContent='Primero valida la explicación.'; return; }
 if(program.length===0){ document.getElementById('result').textContent='Todavía no has puesto bloques.'; return; }
 document.getElementById('result').textContent = feedback.length ? feedback.join(' ') : 'Plan y programa parecen coherentes. Ahora avisa a tu profe.';
}
function askTeacher(){
 document.getElementById('teacherBox').style.display='block';
 const feedback=getCoherenceFeedback(); const plan=document.getElementById('plan').value.trim();
 document.getElementById('teacherSummary').innerHTML='<strong>Plan del alumno:</strong><br>'+escapeHtml(plan||'Sin explicación')+'<br><br><strong>Programa:</strong><br>'+escapeHtml(document.getElementById('program').textContent||'Sin bloques')+'<br><br><strong>Avisos automáticos:</strong><br>'+(feedback.length?feedback.map(escapeHtml).join('<br>'):'Sin avisos de incoherencia.');
}
function unlockRun(){
 const code=document.getElementById('teacherCode').value;
 if(!planOk){ document.getElementById('unlockResult').textContent='Todavía no validó la explicación.'; return; }
 if(program.length===0){ document.getElementById('unlockResult').textContent='Todavía no hay programa.'; return; }
 if(code===TEACHER_CODE){ teacherOk=true; setRunDisabled(false); document.getElementById('unlockResult').textContent='Ejecución desbloqueada.'; document.querySelector('.board-panel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
 else{ document.getElementById('unlockResult').textContent='Código incorrecto.'; }
}
function expandProgram(blocks){
 const expanded=[];
 blocks.forEach((block,originalIndex)=>{
  if(block==='repeat'){ const previous=expanded[expanded.length-1]; if(previous) expanded.push({...previous,repeated:true,repeatSourceIndex:originalIndex}); }
  else expanded.push({type:block,originalIndex,repeated:false});
 });
 return expanded;
}
function turnLeft(dir){ return directions[(directions.indexOf(dir)+3)%4]; }
function turnRight(dir){ return directions[(directions.indexOf(dir)+1)%4]; }
function moveForward(position){
 const next={...position};
 if(next.dir==='up') next.y--; if(next.dir==='right') next.x++; if(next.dir==='down') next.y++; if(next.dir==='left') next.x--;
 return next;
}
function executeProgram(start, blocks){
 let pos={...start};
 for(const step of expandProgram(blocks)){ if(step.type==='left') pos.dir=turnLeft(pos.dir); if(step.type==='right') pos.dir=turnRight(pos.dir); if(step.type==='move') pos=moveForward(pos); }
 return pos;
}
async function runProgram(){
 if(isRunning) return;
 if(!teacherOk){ document.getElementById('result').textContent='Antes debe desbloquearlo el profe.'; return; }
 const m=currentMission(); robot={...m.start}; executionSteps=expandProgram(program); activeStepIndex=-1; isRunning=true; setRunDisabled(true); setNextDisabled(true); render(); renderProgram(); document.querySelector('.board-panel').scrollIntoView({behavior:'smooth',block:'nearest'});
 for(let i=0;i<executionSteps.length;i++){
  activeStepIndex=i; highlightExecutionStep(i); await wait(650); applyStep(executionSteps[i].type); render(); await wait(450);
  if(robot.x<0||robot.x>7||robot.y<0||robot.y>7){ finishFailed('El robot se salió del tablero. Corrige el programa y vuelve a avisar al profe.'); return; }
  if(isWall(robot.x,robot.y)){ finishFailed('El robot chocó con una roca. Necesitas rodear el obstáculo.'); return; }
 }
 markAllBlocksDone(); isRunning=false;
 if(robot.x===goal.x&&robot.y===goal.y){ document.getElementById('result').textContent='¡Misión conseguida!'; missionSolved=true; setNextDisabled(false); }
 else finishFailed('No llegó. Corrige el plan o el programa y vuelve a avisar al profe.');
}
function applyStep(block){ if(block==='left') robot.dir=turnLeft(robot.dir); if(block==='right') robot.dir=turnRight(robot.dir); if(block==='move') robot=moveForward(robot); }
function highlightExecutionStep(i){
 document.querySelectorAll('.program-block').forEach(el=>{el.classList.remove('active');el.classList.remove('repeat-expanded');});
 const step=executionSteps[i];
 for(let j=0;j<i;j++){ const prev=executionSteps[j]; const prevBlock=document.getElementById(`block-${prev.originalIndex}`); if(prevBlock) prevBlock.classList.add('done'); }
 const active=document.getElementById(`block-${step.originalIndex}`); if(active){ active.classList.add('active'); if(step.repeated) active.classList.add('repeat-expanded'); }
 document.getElementById('result').textContent=`Ejecutando ${step.repeated?'repetición del bloque anterior':'bloque'} ${step.originalIndex+1}...`;
}
function markAllBlocksDone(){ document.querySelectorAll('.program-block').forEach(el=>{el.classList.remove('active');el.classList.remove('repeat-expanded');el.classList.add('done');}); }
function finishFailed(message){ isRunning=false; teacherOk=false; document.getElementById('result').textContent=message; setRunDisabled(true); setNextDisabled(true); }
function wait(ms){ return new Promise(resolve=>setTimeout(resolve,ms)); }
function nextMission(){
 if(!missionSolved) return;
 const checkpoint = robotCheckpoints[current];
 if(checkpoint){
  showCheckpoint(checkpoint);
  return;
 }
 continueAfterCheckpoint();
}

function showFinalMessage(){
 const box = document.getElementById('checkpointBox');
 box.style.display = 'block';
 box.innerHTML = `<strong>🏆 ¡Enhorabuena, programador/a!</strong><br>
 Has completado todas las misiones de ScratchLab.<br><br>
 Ya sabes planificar algoritmos, contar casillas, orientar el robot, usar giros, rodear obstáculos, repetir acciones y depurar errores.<br><br>
 <span class="badge">PROGRAMADOR</span>
 <span class="badge">EXPERTO</span>
 <br><button onclick="current=0; loadMission();">Volver a empezar</button>`;
 document.getElementById('result').innerHTML = '<span class="ok">Recorrido completo. Puedes avisar al profe para que registre el logro.</span>';
 setNextDisabled(true);
}

function continueAfterCheckpoint(){
 if(current < missions.length - 1){ current++; loadMission(); }
 else showFinalMessage();
}

function showCheckpoint(checkpoint){
 const box = document.getElementById('checkpointBox');
 box.style.display = 'block';
 box.innerHTML = `<strong>Checkpoint conseguido</strong><br>${checkpoint.text}<br><span class="badge">${checkpoint.code}</span><br><button onclick="continueAfterCheckpoint()">Continuar misiones</button>`;
 document.getElementById('result').textContent = 'Checkpoint conseguido. Anota tu código antes de continuar.';
}

function useProgressCode(){
 const raw = document.getElementById('progressCode').value.trim().toUpperCase();
 const data = progressCodes[raw];
 if(!data){
  document.getElementById('progressResult').innerHTML = '<span class="warning">Código no reconocido. Revisa cómo lo has escrito.</span>';
  return;
 }
 current = data.mission;
 loadMission();
 document.getElementById('progressResult').innerHTML = `<span class="ok">${data.message}</span>`;
}

function escapeHtml(value){ return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function runTests(){
 const test1=executeProgram({x:0,y:0,dir:'right'},['move','move']); console.assert(test1.x===2&&test1.y===0&&test1.dir==='right','Test 1');
 const test2=executeProgram({x:0,y:0,dir:'right'},['left','move']); console.assert(test2.x===0&&test2.y===-1&&test2.dir==='up','Test 2');
 const test3=executeProgram({x:0,y:0,dir:'right'},['move','repeat']); console.assert(test3.x===2&&test3.y===0,'Test 3');
 const test4=executeProgram({x:0,y:0,dir:'right'},['right','move']); console.assert(test4.x===0&&test4.y===1&&test4.dir==='down','Test 4');
 const test5=expandProgram(['move','left','repeat']); console.assert(test5.length===3&&test5[2].type==='left'&&test5[2].repeated===true,'Test 5');

}
runTests(); loadMission();
