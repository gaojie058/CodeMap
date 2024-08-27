import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}
  },
  resolve: {
    alias: {
      "@": "/src",
      '@gpt': resolve(__dirname, 'gpt'),
      "node-fetch" : "node-fetch/lib/index.js",
      "stream" : "stream-browserify"
    },
  },
})
