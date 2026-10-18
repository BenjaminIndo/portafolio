import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas para que funcione bajo users.dcc.uchile.cl/~bindo/
  base: './',
})
