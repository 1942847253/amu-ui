import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [vue(), libInjectCss()],
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'packages/components/index.ts'),
        resolve(__dirname, 'packages/theme/index.ts')
      ],
      formats: ['es', 'cjs']
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs',
          assetFileNames: 'assets/[name][extname]'
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name]-[hash].cjs',
          assetFileNames: 'assets/[name][extname]'
        }
      ]
    }
  }
})
