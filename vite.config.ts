// STEP 1 — Vite config.
//
// Vite is the dev server + bundler that powers modern Vue projects. The config
// here is intentionally small: register the official Vue plugin (so `.vue`
// single-file components are parsed) and pin the dev server port so the URL
// printed in the terminal stays stable across restarts.

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Mirror the `@/*` path mapping in tsconfig.json so runtime imports
    // resolve the same way the type checker does.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
