# Detectives del Error - versión modular

Esta versión separa la aplicación en archivos independientes:

- `index.html`: estructura de la página.
- `css/styles.css`: estilos visuales.
- `js/levels.js`: datos de bloques y niveles. Para añadir niveles, edita este archivo.
- `js/progress.js`: guardado local y códigos de continuidad.
- `js/ui.js`: funciones auxiliares de interfaz.
- `js/main.js`: lógica principal del juego.

## Cómo añadir un nivel

Abre `js/levels.js` y añade un objeto dentro del array `levels` del bloque correspondiente:

```js
{
  title: "Título del caso",
  text: "Texto que verá el alumnado.",
  instruction: "Qué debe investigar.",
  type: "calculo",
  answerIndex: 1,
  options: ["Opción 1", "Opción 2", "Opción 3", "No hay error"],
  hint: "Pista breve.",
  explanation: "Explicación que aparece al corregir."
}
```

Categorías disponibles: `calculo`, `unidades`, `lengua`, `logica`, `instrucciones`, `ciencias`, `informacion`, `sin_error`.
