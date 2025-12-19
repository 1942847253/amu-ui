
export function openInStackBlitz(code: string, title: string = 'App') {
  const filename = title.endsWith('.vue') ? title : `${title}.vue`

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
        vue: '^3.4.0',
        'amu-ui': 'latest',
        '@amu-ui/icons': 'latest'
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
import App from './${filename}'
import AmuUI from 'amu-ui'
import AmuIcons from '@amu-ui/icons'
import 'amu-ui/theme'

const app = createApp(App)
app.use(AmuUI)
app.use(AmuIcons)
app.mount('#app')`,
    [`src/${filename}`]: code,
    'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})`
  }

  const form = document.createElement('form')
  form.method = 'post'
  form.action = `https://stackblitz.com/run?file=src/${filename}`
  form.target = '_blank'

  const titleInput = document.createElement('input')
  titleInput.type = 'hidden'
  titleInput.name = 'project[title]'
  titleInput.value = 'Amu UI Demo'
  form.appendChild(titleInput)

  const templateInput = document.createElement('input')
  templateInput.type = 'hidden'
  templateInput.name = 'project[template]'
  templateInput.value = 'node'
  form.appendChild(templateInput)

  Object.entries(files).forEach(([path, content]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = `project[files][${path}]`
    input.value = content
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
