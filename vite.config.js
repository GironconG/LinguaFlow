import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Asegura que las rutas funcionen en GitHub Pages
  build: {
    outDir: 'dist'
  }
})
