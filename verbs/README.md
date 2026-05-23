# VerbMaster modular

Estructura modular de la app de morfología verbal española.

## Estructura

```text
verbmaster_modular/
├─ index.html                 # Página de acceso a los dos juegos
├─ shared/
│  ├─ styles.css              # Estilos comunes
│  ├─ data.js                 # Personas, tiempos, auxiliar haber y base de verbos
│  └─ core.js                 # Funciones comunes: construir formas, ambigüedad, voz, tema
├─ generador/
│  ├─ index.html              # Juego 1: ruletas
│  └─ generador.js            # Lógica específica del generador
└─ analisis/
   ├─ index.html              # Juego 2: análisis morfológico
   └─ analisis.js             # Lógica específica del analizador
```

## Cambio incluido

En los tiempos del subjuntivo se ha eliminado la redundancia “de subjuntivo” porque el modo ya aparece en una ruleta/campo independiente.

Ejemplo: `pretérito imperfecto (-ra)` en lugar de `pretérito imperfecto de subj. (-ra)`.

## Publicación en GitHub Pages

Puedes subir la carpeta completa como una app independiente o copiar su contenido dentro de `/apps/verbs/`.

- Entrada general: `/apps/verbs/`
- Generador: `/apps/verbs/generador/`
- Análisis: `/apps/verbs/analisis/`
