import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@amu-ui/utils': resolve(__dirname, 'packages/utils/index.ts'),
      '@amu-ui/icons': resolve(__dirname, 'packages/icons/src/index.ts'),
      '@amu-ui/locale': resolve(__dirname, 'packages/locale/index.ts'),
      '@amu-ui/hooks': resolve(__dirname, 'packages/hooks/index.ts')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/**/__test__/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage'
    }
  }
})
