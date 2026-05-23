import { $ } from './utils.js';
import { injectSVG, setProvinceSelectionHandler, highlightProvinceOnMap, clearListHover } from './mapa.js';
import { PROVINCIAS, empezar, finalizar, darPista, respuestaProvincia, toggleMapaLibre } from './game.js';
import { updateHUD } from './ui.js';

function construirListaProvincias(){
  const container = $('#listaProvincias');
  container.innerHTML = '';

  PROVINCIAS.forEach(provincia => {
    const button = document.createElement('button');
    button.className = 'btn';
    button.type = 'button';
    button.textContent = provincia;
    button.addEventListener('mouseenter', () => highlightProvinceOnMap(provincia));
    button.addEventListener('mouseleave', clearListHover);
    button.addEventListener('click', () => respuestaProvincia(provincia, button));
    container.appendChild(button);
  });
}

async function init(){
  setProvinceSelectionHandler(respuestaProvincia);
  await injectSVG();
  construirListaProvincias();
  updateHUD();

  $('#btnJugar').addEventListener('click', empezar);
  $('#btnReiniciar').addEventListener('click', () => finalizar('🔁 Reiniciado.'));
  $('#btnPista').addEventListener('click', darPista);
  $('#btnMapaLibre').addEventListener('click', toggleMapaLibre);

  empezar();
}

document.addEventListener('DOMContentLoaded', init);
