# Detectives Lógicos — Versión modular

Estructura lista para subir a GitHub Pages en:

```text
/apps/logica/
```

## Archivos

```text
index.html
css/styles.css
js/levels.js
js/storage.js
js/logic.js
js/ui.js
js/app.js
assets/
```

## Archivo clave para añadir niveles

La mayoría de ampliaciones futuras deberían tocar solo:

```text
js/levels.js
```

Cada nivel se define como un objeto:

```javascript
{
  id: 9,
  title: "Título del nivel",
  type: "Tipo de reto",
  checkpoint: null,
  situation: "Texto de la situación.",
  rows: ["Ana", "Bruno", "Carla"],
  cols: ["Tortilla", "Queso", "Chocolate"],
  clues: [
    "Pista 1.",
    "Pista 2."
  ],
  solution: {
    Ana: { Tortilla: "yes", Queso: "no", Chocolate: "no" },
    Bruno: { Tortilla: "no", Queso: "yes", Chocolate: "no" },
    Carla: { Tortilla: "no", Queso: "no", Chocolate: "yes" }
  }
}
```

## Estados válidos

```text
unknown
yes
no
```

## Categorías múltiples

Para separar columnas por categorías, usa `categoryBreaks`.

Ejemplo:

```javascript
cols: ["Cómic", "Misterio", "Aventura", "Biblioteca", "Patio", "Aula"],
categoryBreaks: [3]
```

Esto crea dos grupos:

```text
Cómic / Misterio / Aventura
Biblioteca / Patio / Aula
```

## Importante

No edites `logic.js`, `ui.js` o `app.js` para añadir niveles normales.
Solo deberían tocarse si se añade una mecánica nueva.
