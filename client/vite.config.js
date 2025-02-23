import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/server': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  build: {
    outDir: 'public', // output directory for the build
  }
})
