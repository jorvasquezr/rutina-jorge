import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Debe coincidir con el nombre del repositorio en GitHub para que
// GitHub Pages sirva los assets desde /rutina-jorge/. Si cambias el
// nombre del repo, actualiza este valor también.
// https://vite.dev/config/
export default defineConfig({
  base: '/rutina-jorge/',
  plugins: [react()],
})
