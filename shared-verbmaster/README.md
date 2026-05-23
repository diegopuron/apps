# shared-verbmaster

Carpeta común para las apps de VerbMaster.

## Archivos

- `shared.css`: estilos base heredados de la versión original.
- `datos.js`: personas, auxiliar haber, tiempos y base de verbos.
- `conjugador.js`: funciones comunes para filtrar verbos y construir formas verbales.

## Uso previsto

Cada app independiente debe cargar estos archivos antes de su propio JavaScript:

```html
<link rel="stylesheet" href="../shared-verbmaster/shared.css">
<script src="../shared-verbmaster/datos.js"></script>
<script src="../shared-verbmaster/conjugador.js"></script>
```

Corrección incluida: los tiempos del subjuntivo ya no repiten "de subjuntivo" porque el modo se muestra aparte.
