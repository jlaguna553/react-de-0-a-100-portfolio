import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite: el "motor" que compila y sirve tu app en desarrollo,
// y la empaqueta (bundlea) para producción cuando haces `npm run build`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
