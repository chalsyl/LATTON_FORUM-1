import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  server: {
        host: '127.0.0.1', // force IPv4
        port: 3001,        // ou un autre port libre
  }
})