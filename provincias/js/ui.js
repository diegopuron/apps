import { $, $$ } from './utils.js';
import { state } from './state.js';

export function setStatus(message, ok = false, err = false){
  const el = $('#estado');
  el.textContent = message || '';
  el.className = 'status' + (ok ? ' ok' : '') + (err ? ' err' : '');
}

export function setHint(message){
  $('#pista').textContent = message || '';
}

export function updateHUD(){
  $('#uiPuntos').textContent = state.puntos;
  $('#uiRacha').textContent = state.racha;
  $('#uiBest').textContent = state.mejor;
  $('#uiQuedan').textContent = state.modo === 'clasico' ? state.quedan : (state.modo === 'endless' ? '∞' : '—');
  $('#uiTiempo').textContent = state.modo === 'contrarreloj' ? `${state.tiempoRestante}s` : '—';
}

export function showTip(text, x, y){
  const tt = $('#tt');
  tt.textContent = text;
  tt.style.display = 'block';
  tt.style.left = `${x + 12}px`;
  tt.style.top = `${y + 12}px`;
}

export function hideTip(){
  $('#tt').style.display = 'none';
}

export function flashElement(el, className){
  if(!el) return;
  el.classList.add(className);
  setTimeout(() => el.classList.remove('acierto', 'fallo'), 600);
}

export function clearFeedbackClasses(){
  $$('.acierto,.fallo').forEach(el => el.classList.remove('acierto', 'fallo'));
}
