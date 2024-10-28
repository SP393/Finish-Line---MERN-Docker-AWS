import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Make the server listen on all interfaces
    port: 5173,      // Optional: specify port if needed
  },
  plugins: [react()],
})
