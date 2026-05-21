let secret = [];
let guess = [];
let attempts = [];
function newCrackGame(){
 const difficulty = document.getElementById('difficulty').value;
 const length = difficulty === 'easy' ? 3 : 4;
 const allowRepeat = difficulty === 'hard';
 secret = [];
 const pool = [...symbols];
 for(let i=0;i<length;i++){
  const index = Math.floor(Math.random()*pool.length);
  secret.push(pool[index]);
  if(!allowRepeat) pool.splice(index,1);
 }
 guess=[]; attempts=[];
 renderCrack();
 document.getElementById('crackResult').textContent='Nuevo código preparado. Empieza probando una hipótesis.';
 document.getElementById('attempts').innerHTML='';
 document.getElementById('crackCheckpointBox').style.display='none';
 document.getElementById('crackCheckpointBox').innerHTML='';
 document.getElementById('crackRules').innerHTML=`El código tiene <strong>${length}</strong> símbolos. ${allowRepeat?'Puede repetir símbolos.':'No repite símbolos.'}<br>🟢 = símbolo correcto en posición correcta.<br>🟡 = símbolo correcto en posición incorrecta.<br>⚪ = símbolo que no aparece.`;
}
function renderCrack(){
 document.getElementById('symbolPalette').innerHTML=symbols.map(s=>`<button class="symbolBtn" onclick="addGuessSymbol('${s}')">${s}</button>`).join('');
 document.getElementById('currentGuess').textContent=guess.length?guess.join(' '):'—';
}
function addGuessSymbol(s){ const max=secret.length; if(guess.length<max){ guess.push(s); renderCrack(); } }
function deleteGuessSymbol(){ guess.pop(); renderCrack(); }
function checkGuess(){
 if(guess.length!==secret.length){ document.getElementById('crackResult').textContent=`El intento debe tener ${secret.length} símbolos.`; return; }
 const feedback = getMastermindFeedback(guess, secret);
 attempts.push({guess:[...guess],feedback});
 renderAttempts();
 if(feedback.green===secret.length){
  const difficulty = document.getElementById('difficulty').value;
  const crackCode = difficulty === 'easy' ? 'LOGICA' : difficulty === 'medium' ? 'PATRON' : 'MASTER';
  document.getElementById('crackResult').innerHTML='<span class="ok">¡Código crackeado! Has usado lógica y descarte de posibilidades.</span>';
  document.getElementById('crackCheckpointBox').style.display='block';
  document.getElementById('crackCheckpointBox').innerHTML=`<strong>Código lógico conseguido</strong><br>Anótalo en tu hoja de progreso:<br><span class="badge">${crackCode}</span><br><button onclick="newCrackGame()">Nuevo reto</button>`;
 }
 else{ document.getElementById('crackResult').textContent='Pista generada. Ajusta tu hipótesis y prueba otra combinación.'; }
 guess=[]; renderCrack();
}
function getMastermindFeedback(g,s){
 let green=0,yellow=0,white=0;
 const remainingSecret=[]; const remainingGuess=[];
 for(let i=0;i<s.length;i++){ if(g[i]===s[i]) green++; else{ remainingSecret.push(s[i]); remainingGuess.push(g[i]); } }
 for(const item of remainingGuess){ const idx=remainingSecret.indexOf(item); if(idx>=0){ yellow++; remainingSecret.splice(idx,1); } else white++; }
 return {green,yellow,white};
}
function renderAttempts(){
 document.getElementById('attempts').innerHTML=attempts.map((a,i)=>`<div class="attempt"><strong>${i+1}.</strong> ${a.guess.join(' ')} → 🟢 ${a.feedback.green} | 🟡 ${a.feedback.yellow} | ⚪ ${a.feedback.white}</div>`).join('');
}
function runTests(){
 const test=getMastermindFeedback(['◆','●','▲'],['◆','▲','■']);
 console.assert(test.green===1&&test.yellow===1&&test.white===1,'Test mastermind');
}
runTests(); newCrackGame();
