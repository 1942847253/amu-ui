
import sdk from '@stackblitz/sdk'
import { resolveDemoSourceFiles } from './demo-source'

function createStackBlitzEntry(entryFile: string) {
  return `<script setup lang="ts">
import DemoEntry from './${entryFile}'
</script>

<template>
  <DemoEntry />
</template>
`
}

export async function openInStackBlitz(options: {
  componentName: string
  demoKey: string
  code: string
  title?: string
  popup?: Window | null
}) {
  const resolved = await resolveDemoSourceFiles(
    options.componentName,
    options.demoKey,
    options.code,
  )

  const files = {
    'package.json': JSON.stringify({
      name: 'amu-ui-demo',
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        vue: '^3.5.0',
        'amu-ui': 'latest',
        '@amu-ui/hooks': 'latest',
        '@amu-ui/icons': 'latest',
        '@amu-ui/locale': 'latest'
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.2.0',
        vite: '^6.0.0',
        typescript: '^5.7.2',
        'vue-tsc': '^2.1.10'
      }
    }, null, 2),
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amu UI Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
    'src/main.ts': `import { createApp } from 'vue'
import App from './App.vue'
import AmuUI from 'amu-ui'
import AmuIcons from '@amu-ui/icons'
import 'amu-ui/theme'

const app = createApp(App)
app.use(AmuUI)
app.use(AmuIcons)
app.mount('#app')`,
    'src/App.vue': createStackBlitzEntry(resolved.entryFile),
    ...Object.fromEntries(
      Object.entries(resolved.files).map(([path, content]) => [`src/${path}`, content]),
    ),
    'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})`
  }

  await sdk.openProject(
    {
      title: 'Amu UI Demo',
      description: 'Generated from amu-ui docs.',
      template: 'node',
      files,
    },
    {
      newWindow: true,
      openFile: 'src/App.vue',
    },
  )

  options.popup?.close()
}
