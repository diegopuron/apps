import { ID_TO_PROV } from '../data/provincias.js';
import { PROV_A_CCAA } from '../data/comunidades.js';
import { $, normaliza, rand } from './utils.js';
import { state, STORAGE_KEYS } from './state.js';
import { setStatus, setHint, updateHUD, hideTip, flashElement } from './ui.js';
import { clearListHover, clearCCAAHighlight, highlightCCAA } from './mapa.js';

export const PROVINCIAS = Array.from(new Set(Object.values(ID_TO_PROV))).sort();

export function comunidadDe(provincia){
  return PROV_A_CCAA[provincia] || '—';
}

export function nuevaPregunta(){
  clearListHover();
  clearCCAAHighlight();
  state.provinciaActual = rand(PROVINCIAS);
  state.falloPrevio = false;
  $('#pregunta').textContent = `¿Dónde está ${state.provinciaActual}?`;
  setHint('Pulsa en el mapa o en la lista de provincias.');
  setStatus('Elige provincia…');
}

export function empezar(){
  hideTip();
  clearListHover();
  clearCCAAHighlight();

  state.mapaLibre = false;
  state.modo = $('#modo').value;
  state.rondasObjetivo = Math.max(5, Math.min(50, Number($('#rondas').value || 10)));
  state.puntos = 0;
  state.racha = 0;
  state.quedan = state.modo === 'clasico' ? state.rondasObjetivo : 9999;
  state.tiempoRestante = state.modo === 'contrarreloj' ? 60 : 0;
  state.jugando = true;

  updateHUD();

  if(state.timer) clearInterval(state.timer);
  if(state.modo === 'contrarreloj'){
    state.timer = setInterval(() => {
      state.tiempoRestante--;
      updateHUD();
      if(state.tiempoRestante <= 0){
        finalizar('⏱️ ¡Tiempo!');
      }
    }, 1000);
  }

  nuevaPregunta();
}

export function finalizar(message = '🏁 Fin de la partida'){
  hideTip();
  clearListHover();
  clearCCAAHighlight();

  state.jugando = false;
  setStatus(message);
  setHint('');
  $('#pregunta').textContent = 'Pulsa “Empezar” para jugar otra vez';

  if(state.timer){
    clearInterval(state.timer);
    state.timer = null;
  }

  if(state.puntos > state.mejor){
    state.mejor = state.puntos;
    localStorage.setItem(STORAGE_KEYS.bestScore, String(state.mejor));
  }

  updateHUD();
}

export function darPista(){
  if(!state.jugando || !state.provinciaActual) return;
  const ccaa = comunidadDe(state.provinciaActual);
  setHint(`Pista: está en la comunidad de ${ccaa}.`);
  clearCCAAHighlight();
  highlightCCAA(ccaa);
}

export function respuestaProvincia(provincia, originEl){
  if(state.mapaLibre || !state.jugando || !state.provinciaActual) return;

  const ok = normaliza(provincia) === normaliza(state.provinciaActual);
  flashElement(originEl, ok ? 'acierto' : 'fallo');

  if(ok){
    hideTip();
    clearListHover();
    clearCCAAHighlight();

    const pts = state.falloPrevio ? 5 : 10;
    state.puntos += pts;
    state.racha += 1;
    setStatus(`✅ ¡Bien! ${provincia} — +${pts} puntos.`, true, false);
    setHint(`${provincia} — ${comunidadDe(provincia)}`);

    if(state.modo === 'clasico'){
      state.quedan -= 1;
      if(state.quedan <= 0) return finalizar('🏁 ¡Ronda completada!');
    }

    updateHUD();
    setTimeout(nuevaPregunta, 500);
  }else{
    state.puntos -= 3;
    state.racha = 0;
    state.falloPrevio = true;
    setStatus('❌ No es esa provincia. ¡Prueba otra vez!', false, true);
    if(!$('#pista').textContent || $('#pista').textContent.startsWith('Pulsa')) darPista();
    updateHUD();
  }
}

export function toggleMapaLibre(){
  state.mapaLibre = !state.mapaLibre;
  setStatus(state.mapaLibre ? '🗺️ Modo mapa libre activo: explora sin puntos.' : '', false, false);
}
