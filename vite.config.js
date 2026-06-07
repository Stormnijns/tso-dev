import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { execSync } from 'node:child_process'

// get git commit hash (short like dad65d3)
const commitHash = execSync('git rev-parse --short HEAD').toString().trim()

// https://vite.dev/config/
export default defineConfig({
  base: '/tso-dev/',
  plugins: [vue(), vueDevTools()],

  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
