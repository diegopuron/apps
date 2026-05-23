import { ID_TO_PROV } from '../data/provincias.js';
import { PROV_A_CCAA } from '../data/comunidades.js';
import { $, $$, normaliza } from './utils.js';
import { state } from './state.js';
import { showTip, hideTip } from './ui.js';

let onProvinceSelected = () => {};

export function setProvinceSelectionHandler(handler){
  onProvinceSelected = handler;
}

export async function injectSVG(){
  const host = $('#svgHost');
  const response = await fetch('./assets/mapa-espana.svg');
  const svgText = await response.text();
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.documentElement;

  svg.id = 'mapa';
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  host.innerHTML = '';
  host.appendChild(svg);

  const shapes = svg.querySelectorAll('path[id], polygon[id], polyline[id]');
  shapes.forEach(el => {
    const nombre = ID_TO_PROV[el.id] || el.id;
    if(!ID_TO_PROV[el.id]) return;

    el.classList.add('provincia');
    el.dataset.provincia = nombre;
    el.addEventListener('mouseenter', event => showTip(nombre, event.clientX, event.clientY));
    el.addEventListener('mousemove', event => showTip(nombre, event.clientX, event.clientY));
    el.addEventListener('mouseleave', hideTip);
    el.addEventListener('click', () => onProvinceSelected(nombre, el));
  });

  encuadrarMapa();
}

export function highlightProvinceOnMap(provincia){
  const norm = normaliza(provincia);
  $$('#mapa .provincia').forEach(el => {
    const mapped = ID_TO_PROV[el.id];
    if(!mapped) return;
    el.classList.toggle('hoverlist', normaliza(mapped) === norm);
  });
}

export function clearListHover(){
  $$('#mapa .provincia').forEach(el => el.classList.remove('hoverlist'));
}

export function clearCCAAHighlight(){
  $$('#mapa .provincia').forEach(el => el.classList.remove('ccaa-hint', 'dim'));
  state.ccaaHint = null;
}

export function highlightCCAA(ccaa){
  state.ccaaHint = ccaa;
  $$('#mapa .provincia').forEach(el => {
    const provincia = ID_TO_PROV[el.id];
    if(!provincia) return;
    if(PROV_A_CCAA[provincia] === ccaa) el.classList.add('ccaa-hint');
    else el.classList.add('dim');
  });
}

function encuadrarMapa(){
  const svg = $('#mapa');
  if(!svg) return;

  const shapes = svg.querySelectorAll('.provincia');
  if(!shapes.length) return;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  shapes.forEach(el => {
    try{
      const b = el.getBBox();
      minX = Math.min(minX, b.x);
      minY = Math.min(minY, b.y);
      maxX = Math.max(maxX, b.x + b.width);
      maxY = Math.max(maxY, b.y + b.height);
    }catch(error){
      // Algunos elementos SVG podrían no admitir getBBox en ciertos navegadores.
    }
  });

  const pad = 5;
  svg.setAttribute('viewBox', [minX - pad, minY - pad, (maxX - minX) + 2 * pad, (maxY - minY) + 2 * pad].join(' '));
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
}
