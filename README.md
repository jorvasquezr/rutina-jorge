# Rutina personal

Web estática (React + Vite) para seguir mi rutina de gimnasio desde el celular:

- Elijo el día de entrenamiento (la app sugiere el día según el día de la semana).
- Marco cada ejercicio como hecho con un check; el progreso se guarda en el
  celular (`localStorage`) y se reinicia solo al día siguiente.
- Toco un ejercicio para ver el detalle: series/repeticiones, descanso,
  indicaciones de técnica y un enlace directo a ejemplos en YouTube.
- Un botón de información (ℹ️) muestra las guías generales: cómo escoger el
  peso, tabla de descansos, progresión de cardio, etc.

No requiere backend ni base de datos: toda la rutina vive en un archivo de
datos dentro del repo, y GitHub Pages sirve el sitio ya compilado.

## Estructura del proyecto

```
src/
  data/rutina.js        ← toda la rutina (días, ejercicios, series, videos)
  components/           ← UI: selector de día, checklist, modales
  hooks/useProgress.js  ← guardado del progreso en localStorage
  utils/date.js         ← día sugerido, fechas relativas
material/                ← fotos e info original de la rutina (no se publica)
.github/workflows/deploy.yml  ← publica a GitHub Pages en cada push a main
```

## Actualizar la rutina

Toda la rutina está en **`src/data/rutina.js`**. Es un archivo de datos
plano: no hace falta tocar nada de la UI para cambiar ejercicios.

Cada ejercicio tiene esta forma:

```js
{
  id: "d1-2",                 // único dentro del día
  nombre: "Press de pecho con mancuernas",
  detalle: "Pecho",           // grupo muscular / equipo
  series: "3 × 10–12",
  descanso: "60 s",           // o null si no aplica (ej. calentamiento)
  indicaciones: ["Banco plano.", "..."],
  videoQuery: "dumbbell bench press proper form tutorial", // o null
}
```

`videoQuery` es un término de búsqueda de YouTube (no un video puntual): el
modal de detalle muestra un botón "Ver ejemplos en YouTube" que abre esa
búsqueda en una pestaña nueva, así no hay que pegar IDs de video a mano.
(YouTube descontinuó hace tiempo el embed de resultados de búsqueda vía
iframe, por eso se enlaza en vez de embeber directamente en la página.)

Para agregar/quitar ejercicios, editar los arrays `ejercicios` de cada día
en `dias`. Para agregar un día nuevo, copiar la forma de uno existente
(`id`, `nombre`, `subtitulo`, `ejercicios`) y agregarlo al array `dias`, y
opcionalmente mapearlo en `distribucionSemanal`.

Ver también el skill `.claude/skills/deploy-rutina/SKILL.md` para pedirle a
Claude Code que haga la actualización y el deploy de punta a punta.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (normalmente `http://localhost:5173`).

## Publicar a GitHub Pages

### Primera vez

1. Crear un repo en GitHub llamado **`rutina-jorge`** (el `base` en
   `vite.config.js` ya está configurado para ese nombre).
2. Conectar este proyecto local con el repo remoto y hacer push a `main`.
3. En GitHub → **Settings → Pages**, en "Build and deployment" elegir
   **Source: GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` corre automáticamente en cada
   push a `main`: instala dependencias, compila (`npm run build`) y publica
   `dist/` a Pages.
5. La web queda en `https://<tu-usuario>.github.io/rutina-jorge/`.

Si el repo se llama distinto a `rutina-jorge`, hay que actualizar `base` en
`vite.config.js` para que coincida (ej. `base: '/nombre-del-repo/'`).

### Actualizaciones futuras

Cada vez que se edite `src/data/rutina.js` (o cualquier otro archivo) y se
haga push a `main`, GitHub Actions vuelve a compilar y publicar la web
automáticamente — no hay pasos manuales de deploy.

## Notas técnicas

- El progreso marcado se guarda por fecha en `localStorage`, así que cada
  vez que se retoma un día (p. ej. "Día 1" la semana siguiente) el checklist
  empieza limpio, pero si se cierra y reabre la app el mismo día el progreso
  se mantiene.
- Todo corre en el navegador; no hay servidor ni base de datos.
