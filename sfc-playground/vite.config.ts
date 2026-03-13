import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolvePlaygroundBase(command: string) {
  if (command !== 'build') {
    return '/'
  }

  if (process.env.AMU_SFC_PLAYGROUND_BASE) {
    return process.env.AMU_SFC_PLAYGROUND_BASE
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
  return repository ? `/${repository}/sfc-playground/` : '/sfc-playground/'
}

export default defineConfig(({ command }) => ({
  base: resolvePlaygroundBase(command),
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@vue/repl'],
  },
  server: {
    port: 5176,
    strictPort: false,
  },
}))