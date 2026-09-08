---
name: deploy-rutina
description: Publica la web "Rutina personal" (React + Vite) en GitHub Pages por primera vez, o actualiza la rutina de ejercicios y hace deploy de los cambios. Usar cuando el usuario pida "sube la rutina a GitHub Pages", "publica la web", "actualiza la rutina" o "agrega/cambia un ejercicio" en este proyecto.
---

# Deploy y actualización de "Rutina personal"

Este proyecto es una web estática (React + Vite) sin backend. Toda la rutina
vive en `src/data/rutina.js`. El deploy a GitHub Pages es automático vía
GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.

## Caso 1: Publicar por primera vez

1. Verificar que el repo local ya tiene git inicializado:
   ```bash
   git status
   ```
   Si no es un repo git, inicializarlo (`git init`) y hacer el primer commit.

2. Verificar que `vite.config.js` tiene `base: '/rutina-jorge/'` (o el
   nombre real que tendrá el repo en GitHub — deben coincidir exactamente).

3. Crear el repositorio remoto. Si hay `gh` CLI autenticado, confirmar con
   el usuario y luego:
   ```bash
   gh repo create rutina-jorge --public --source=. --remote=origin
   ```
   Si no hay `gh` o el usuario prefiere hacerlo manualmente, pedirle que
   cree el repo vacío en GitHub (sin README/gitignore) y dar el comando
   para conectar el remoto:
   ```bash
   git remote add origin git@github.com:<usuario>/rutina-jorge.git
   ```

4. Confirmar con el usuario antes de hacer push (acción visible en un
   servicio compartido). Luego:
   ```bash
   git push -u origin main
   ```

5. Activar Pages: en GitHub → **Settings → Pages** → en "Build and
   deployment" → **Source: GitHub Actions**. Esto solo se hace una vez;
   avisar al usuario que debe hacer este clic manual si `gh` no lo puede
   automatizar (`gh api` sí puede, pero el clic manual es más simple y
   seguro de indicar).

6. El workflow corre solo tras el push. Verificar con:
   ```bash
   gh run list --limit 3
   gh run watch
   ```
   La URL final es `https://<usuario>.github.io/rutina-jorge/`.

## Caso 2: Actualizar la rutina de ejercicios

1. Editar `src/data/rutina.js`. Cada ejercicio sigue esta forma (ver
   comentarios al inicio del archivo y la sección "Actualizar la rutina"
   del `README.md`):
   ```js
   {
     id: "d1-2",
     nombre: "Press de pecho con mancuernas",
     detalle: "Pecho",
     series: "3 × 10–12",
     descanso: "60 s",           // null si no aplica
     indicaciones: ["Banco plano.", "..."],
     videoQuery: "dumbbell bench press proper form tutorial", // o null
   }
   ```
   - `id` debe ser único dentro del día (`dX-N`).
   - `videoQuery` es un término de búsqueda de YouTube, no un video
     puntual ni una URL — la app arma sola el link "Ver ejemplos en
     YouTube" que abre esa búsqueda en una pestaña nueva (el embed vía
     iframe de resultados de búsqueda está descontinuado por YouTube,
     por eso se enlaza en vez de embeber). **No inventar URLs de
     YouTube ni IDs de video**; si el usuario quiere un video
     específico, pedirle el enlace exacto y usar ese campo aparte (o
     agregar `videoUrl` con el link tal como lo dio, sin adivinar).
   - Para un día nuevo, copiar la forma de un día existente (`id`,
     `nombre`, `subtitulo`, `ejercicios`) dentro del array `dias`, y
     opcionalmente mapear los días de la semana en `distribucionSemanal`.

2. Probar en local antes de publicar:
   ```bash
   npm install   # solo si es la primera vez o cambiaron dependencias
   npm run dev
   ```
   Abrir la URL local y revisar el día editado: checklist, detalle del
   ejercicio y video.

3. Cuando el usuario confirme que se ve bien, commitear y subir:
   ```bash
   git add src/data/rutina.js
   git commit -m "Actualiza rutina: <resumen del cambio>"
   git push
   ```
   El push a `main` dispara el deploy automático; no hace falta correr
   `npm run build` a mano ni tocar GitHub Pages de nuevo.

4. Opcional: confirmar que el deploy terminó bien:
   ```bash
   gh run watch
   ```
