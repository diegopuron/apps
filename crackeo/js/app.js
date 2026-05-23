let secret = [];
let guess = [];
let attempts = [];

function byId(id){
  return document.getElementById(id);
}

function escapeHtml(value){
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getCurrentSettings(){
  const selected = byId('difficulty').value;
  return difficultySettings[selected] || difficultySettings.easy;
}

function newCrackGame(){
  const settings = getCurrentSettings();
  secret = [];
  guess = [];
  attempts = [];

  const pool = [...symbols];
  for(let i = 0; i < settings.length; i++){
    const index = Math.floor(Math.random() * pool.length);
    secret.push(pool[index]);
    if(!settings.allowRepeat){
      pool.splice(index, 1);
    }
  }

  renderCrack();
  renderAttempts();
  byId('crackResult').textContent = 'Nuevo código preparado. Empieza probando una hipótesis.';
  byId('crackCheckpointBox').classList.add('hidden');
  byId('crackCheckpointBox').innerHTML = '';
  byId('crackRules').innerHTML = `
    El código tiene <strong>${settings.length}</strong> símbolos.<br>
    ${settings.allowRepeat ? 'Puede repetir símbolos.' : 'No repite símbolos.'}<br><br>
    🟢 = símbolo correcto en posición correcta.<br>
    🟡 = símbolo correcto en posición incorrecta.<br>
    ⚪ = símbolo que no aparece.
  `;
}

function renderCrack(){
  byId('symbolPalette').innerHTML = symbols
    .map(symbol => `<button type="button" class="symbolBtn" data-symbol="${escapeHtml(symbol)}">${escapeHtml(symbol)}</button>`)
    .join('');

  byId('currentGuess').textContent = guess.length ? guess.join(' ') : '—';

  document.querySelectorAll('.symbolBtn').forEach(button => {
    button.addEventListener('click', () => addGuessSymbol(button.dataset.symbol));
  });
}

function addGuessSymbol(symbol){
  const max = secret.length;
  if(guess.length < max){
    guess.push(symbol);
    renderCrack();
  }
}

function deleteGuessSymbol(){
  guess.pop();
  renderCrack();
}

function checkGuess(){
  if(guess.length !== secret.length){
    byId('crackResult').innerHTML = `<span class="warning">El intento debe tener ${secret.length} símbolos.</span>`;
    return;
  }

  const feedback = getMastermindFeedback(guess, secret);
  attempts.push({ guess:[...guess], feedback });
  renderAttempts();

  if(feedback.green === secret.length){
    const settings = getCurrentSettings();
    byId('crackResult').innerHTML = '<span class="ok">¡Código crackeado! Has usado lógica y descarte de posibilidades.</span>';
    byId('crackCheckpointBox').classList.remove('hidden');
    byId('crackCheckpointBox').innerHTML = `
      <strong>Código lógico conseguido</strong><br>
      Anótalo en tu hoja de progreso:<br>
      <span class="badge">${settings.progressCode}</span><br>
      <button type="button" id="anotherGameBtn">Nuevo reto</button>
    `;
    byId('anotherGameBtn').addEventListener('click', newCrackGame);
  }else{
    byId('crackResult').textContent = 'Pista generada. Ajusta tu hipótesis y prueba otra combinación.';
  }

  guess = [];
  renderCrack();
}

function getMastermindFeedback(currentGuess, currentSecret){
  let green = 0;
  let yellow = 0;
  let white = 0;
  const remainingSecret = [];
  const remainingGuess = [];

  for(let i = 0; i < currentSecret.length; i++){
    if(currentGuess[i] === currentSecret[i]){
      green++;
    }else{
      remainingSecret.push(currentSecret[i]);
      remainingGuess.push(currentGuess[i]);
    }
  }

  for(const item of remainingGuess){
    const index = remainingSecret.indexOf(item);
    if(index >= 0){
      yellow++;
      remainingSecret.splice(index, 1);
    }else{
      white++;
    }
  }

  return { green, yellow, white };
}

function renderAttempts(){
  if(attempts.length === 0){
    byId('attempts').innerHTML = '<div class="attempt">Todavía no hay intentos.</div>';
    return;
  }

  byId('attempts').innerHTML = attempts
    .map((attempt, index) => `
      <div class="attempt">
        <strong>${index + 1}.</strong>
        ${escapeHtml(attempt.guess.join(' '))}
        → 🟢 ${attempt.feedback.green} | 🟡 ${attempt.feedback.yellow} | ⚪ ${attempt.feedback.white}
      </div>
    `)
    .join('');
}

function runTests(){
  const test = getMastermindFeedback(['◆','●','▲'], ['◆','▲','■']);
  console.assert(test.green === 1 && test.yellow === 1 && test.white === 1, 'Test mastermind');
}

window.addEventListener('DOMContentLoaded', () => {
  byId('difficulty').addEventListener('change', newCrackGame);
  byId('newGameBtn').addEventListener('click', newCrackGame);
  byId('deleteGuessBtn').addEventListener('click', deleteGuessSymbol);
  byId('checkGuessBtn').addEventListener('click', checkGuess);

  runTests();
  newCrackGame();
});
