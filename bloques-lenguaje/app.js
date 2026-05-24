const STORAGE_KEY = "bloquesLenguajeProgressV1";
const state = { levelIndex: 0, challengeIndex: 0, selectedWords: new Set(), selectedChoice: null, solved: false };
const $ = (id) => document.getElementById(id);
const levels = window.BLOQUES_LEVELS || [];

function loadProgress(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {completed:{}};}catch{return {completed:{}};}
}
function saveProgress(progress){localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));}
function activeLevel(){return levels[state.levelIndex];}
function activeChallenge(){return activeLevel().challenges[state.challengeIndex];}
function normalize(text){return String(text).trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}

function renderLevels(){
  const progress = loadProgress();
  $("levelList").innerHTML = levels.map((level, index)=>{
    const done = progress.completed[level.id] || 0;
    const total = level.challenges.length;
    return `<button class="levelBtn ${index===state.levelIndex?'active':''} ${done>=total?'done':''}" data-level="${index}" type="button">
      <strong>${level.badge}: ${level.title}</strong>
      <span class="small">${done}/${total} retos · ${level.short}</span>
    </button>`;
  }).join("");
  document.querySelectorAll(".levelBtn").forEach(btn=>btn.addEventListener("click",()=>{
    state.levelIndex = Number(btn.dataset.level); state.challengeIndex = 0; resetInteraction(); render();
  }));
}

function resetInteraction(){state.selectedWords = new Set(); state.selectedChoice = null; state.solved = false;}

function render(){
  const level = activeLevel(); const ch = activeChallenge();
  renderLevels();
  $("levelBadge").textContent = level.badge;
  $("progressText").textContent = `${state.challengeIndex + 1} / ${level.challenges.length}`;
  $("activityTitle").textContent = level.title;
  $("activityInstruction").textContent = ch.instruction || level.goal;
  $("sentenceBox").textContent = ch.sentence;
  $("feedback").className = "feedback";
  $("feedback").textContent = "Selecciona tu respuesta y comprueba. La idea es razonar con bloques y concordancia, no acertar por intuición.";
  $("nextBtn").hidden = true;
  $("checkBtn").hidden = false;
  $("workspace").innerHTML = "";
  $("choiceArea").innerHTML = "";

  if(level.type === "grouping") renderGrouping(ch);
  else renderChoices(ch);
}

function renderGrouping(ch){
  const bank = document.createElement("div"); bank.className = "wordBank";
  ch.words.forEach((word, idx)=>{
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "wordChip"; btn.textContent = word; btn.dataset.index = idx;
    btn.addEventListener("click",()=>{state.selectedWords.has(idx)?state.selectedWords.delete(idx):state.selectedWords.add(idx); updateGroupingPreview(ch);});
    bank.appendChild(btn);
  });
  const zones = document.createElement("div"); zones.className = "dropGrid";
  ch.labels.forEach((label, idx)=>{
    const zone = document.createElement("div"); zone.className = "dropZone"; zone.dataset.group = idx;
    zone.innerHTML = `<h3>${label}</h3><div class="slot"></div>`;
    zone.addEventListener("click",()=>assignSelectedToGroup(ch, idx));
    zones.appendChild(zone);
  });
  const helper = document.createElement("p"); helper.className = "muted"; helper.textContent = "Pulsa varias palabras y después pulsa el bloque donde quieras colocarlas.";
  $("workspace").append(helper, bank, zones);
  ch.current = Array.from({length: ch.groups.length},()=>[]);
}

function assignSelectedToGroup(ch, groupIndex){
  if(!state.selectedWords.size || state.solved) return;
  const selected = [...state.selectedWords].sort((a,b)=>a-b);
  ch.current.forEach(group=>selected.forEach(i=>{const pos=group.indexOf(i); if(pos>=0) group.splice(pos,1);}));
  ch.current[groupIndex].push(...selected);
  ch.current[groupIndex] = [...new Set(ch.current[groupIndex])].sort((a,b)=>a-b);
  state.selectedWords.clear();
  updateGroupingPreview(ch);
}

function updateGroupingPreview(ch){
  document.querySelectorAll(".wordChip").forEach(btn=>{
    btn.classList.toggle("selected", state.selectedWords.has(Number(btn.dataset.index)));
  });
  document.querySelectorAll(".dropZone").forEach(zone=>{
    const idx = Number(zone.dataset.group);
    const slot = zone.querySelector(".slot");
    slot.innerHTML = ch.current[idx].map(wordIndex=>`<span class="wordChip">${ch.words[wordIndex]}</span>`).join("");
  });
}

function renderChoices(ch){
  ch.options.forEach(option=>{
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "choiceBtn"; btn.textContent = option;
    btn.addEventListener("click",()=>{state.selectedChoice = option; document.querySelectorAll(".choiceBtn").forEach(b=>b.classList.remove("selected")); btn.classList.add("selected");});
    $("choiceArea").appendChild(btn);
  });
}

function checkAnswer(){
  const level = activeLevel(); const ch = activeChallenge();
  if(level.type === "grouping") return checkGrouping(ch);
  if(!state.selectedChoice){return setFeedback("warn", "Elige una opción antes de comprobar.");}
  const ok = normalize(state.selectedChoice) === normalize(ch.answer);
  if(ok) completeChallenge(`Correcto. ${ch.explanation}`);
  else setFeedback("bad", `Todavía no. Fíjate en la concordancia: cambia singular/plural y observa qué forma verbal encaja.`);
}

function checkGrouping(ch){
  if(!ch.current || ch.current.some(group=>group.length===0)) return setFeedback("warn", "Coloca palabras en todos los bloques antes de comprobar.");
  const expected = ch.groups.map(g=>g.join(","));
  const current = ch.current.map(g=>g.join(","));
  const ok = expected.length === current.length && expected.every((g,idx)=>g===current[idx]);
  if(ok) completeChallenge(`Bien agrupado. ${ch.explanation}`);
  else setFeedback("bad", "Algún bloque se ha roto. Piensa qué palabras necesitan ir pegadas para conservar el sentido.");
}

function completeChallenge(message){
  state.solved = true;
  const progress = loadProgress();
  const level = activeLevel();
  progress.completed[level.id] = Math.max(progress.completed[level.id] || 0, state.challengeIndex + 1);
  saveProgress(progress);
  setFeedback("ok", message);
  $("nextBtn").hidden = false;
  $("checkBtn").hidden = true;
  renderLevels();
}

function setFeedback(kind, msg){$("feedback").className = `feedback ${kind}`; $("feedback").textContent = msg;}

function nextChallenge(){
  const level = activeLevel();
  if(state.challengeIndex < level.challenges.length - 1){state.challengeIndex++;}
  else if(state.levelIndex < levels.length - 1){state.levelIndex++; state.challengeIndex = 0;}
  else {setFeedback("ok", "Ruta completada. Puedes reiniciar o repetir los niveles para afianzar."); return;}
  resetInteraction(); render();
}

$("checkBtn").addEventListener("click", checkAnswer);
$("nextBtn").addEventListener("click", nextChallenge);
$("resetBtn").addEventListener("click", ()=>{localStorage.removeItem(STORAGE_KEY); state.levelIndex=0; state.challengeIndex=0; resetInteraction(); render();});
render();
