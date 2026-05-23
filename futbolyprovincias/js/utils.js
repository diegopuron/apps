export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export function stripDiacritics(text){
  return (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function normaliza(text){
  return stripDiacritics(String(text)).replace(/\s+/g, ' ').trim().toLowerCase();
}

export function rand(items){
  return items[Math.floor(Math.random() * items.length)];
}
