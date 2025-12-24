import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^amu-ui$/,
        replacement: resolve(__dirname, 'packages/components/index.ts')
      },
      {
        find: /^amu-ui\/(.*)$/,
        replacement: resolve(__dirname, 'packages/components/$1/index.ts')
      },
      {
        find: '@amu-ui/utils',
        replacement: resolve(__dirname, 'packages/utils/index.ts')
      },
      {
        find: '@amu-ui/icons',
        replacement: resolve(__dirname, 'packages/icons/src/index.ts')
      },
      {
        find: '@amu-ui/locale',
        replacement: resolve(__dirname, 'packages/locale/index.ts')
      },
      {
        find: '@amu-ui/hooks',
        replacement: resolve(__dirname, 'packages/hooks/index.ts')
      }
    ]
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
