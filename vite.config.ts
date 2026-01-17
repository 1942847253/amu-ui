import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    libInjectCss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
      exclude: ['playground', 'node_modules', 'docs']
    })
  ],
  resolve: {
    alias: [
      {
        find: '@amu-ui/utils',
        replacement: resolve(__dirname, 'packages/utils/index.ts'),
      },
      {
        find: '@amu-ui/icons',
        replacement: resolve(__dirname, 'packages/icons/src/index.ts'),
      },
      {
        find: '@amu-ui/locale',
        replacement: resolve(__dirname, 'packages/locale/index.ts'),
      },
      {
        find: '@amu-ui/hooks',
        replacement: resolve(__dirname, 'packages/hooks/index.ts'),
      },
      {
        find: /^amu-ui\/(.*)$/,
        replacement: resolve(__dirname, 'packages/components/$1/index.ts'),
      },
    ]
  },
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'packages/components/index.ts'),
        resolve(__dirname, 'packages/theme/index.ts'),
        resolve(__dirname, 'packages/locale/index.ts')
      ],
      formats: ['es', 'cjs']
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', '@amu-ui/hooks', '@amu-ui/locale'],
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
