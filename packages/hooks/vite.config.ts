import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist/types',
      include: ['index.ts', 'src/**/*.ts']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', '@amu-ui/locale'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          preserveModules: true,
          preserveModulesRoot: '.',
          entryFileNames: '[name].mjs'
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          preserveModules: true,
          preserveModulesRoot: '.',
          entryFileNames: '[name].cjs',
          exports: 'named'
        }
      ]
    },
    emptyOutDir: true
  }
})
