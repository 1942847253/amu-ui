import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /^amu-ui$/,
        replacement: resolve(__dirname, '../../packages/components/index.ts')
      },
      {
        find: /^amu-ui\/theme$/,
        replacement: resolve(__dirname, '../../packages/theme/index.ts')
      },
      {
        find: /^amu-ui\/(.*)$/,
        replacement: resolve(__dirname, '../../packages/components/$1/index.ts')
      },
      {
        find: '@amu-ui/hooks',
        replacement: resolve(__dirname, '../../packages/hooks/index.ts')
      },
      {
        find: '@amu-ui/locale',
        replacement: resolve(__dirname, '../../packages/locale/index.ts')
      },
      {
        find: '@amu-ui/icons',
        replacement: resolve(__dirname, '../../packages/icons/src/index.ts')
      },
      {
        find: '@amu-ui/utils',
        replacement: resolve(__dirname, '../../packages/utils/index.ts')
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('echarts')) return 'vendor-echarts'
            if (id.includes('vue')) return 'vendor-vue'
            if (id.includes('pinia') || id.includes('vue-router')) return 'vendor-app'
          }
          return undefined
        }
      }
    }
  }
})
