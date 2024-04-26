import { File } from '@vue/repl'

export enum npmCdnEnum {
  jsdelivr = 'https://cdn.jsdelivr.net/npm',
  unpkg = 'https://unpkg.com',
  skypack = 'https://cdn.skypack.dev',
  cndjs = 'https://cdnjs.com/libraries'
}

export const DEFAULT_CDN = npmCdnEnum.unpkg

/**
 * get cdn url by package name & filePath
 * if use unpkg cdn, url will add query params: ?module'
 */
export const getCdnUrl = (npmName: string, filePath?: string) => {
  if (DEFAULT_CDN === npmCdnEnum.unpkg) {
    return `${DEFAULT_CDN}/${npmName}?module`
  }

  return `${DEFAULT_CDN}/${npmName}/${filePath}`
}

/** get vue runtime cdn url buy version */
export const getVueRuntimeURL = (version?: string) => getCdnUrl('vue' + (version ? `@${version}` : ''))

/** get vue compiler cdn url buy version */
export const getVueCompilerURL = (version: string) => `${DEFAULT_CDN}/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`

export const defaultMainFile = 'AppWrapper.vue'
export const appFile = 'App.vue'
export const amuInjectPlugin = 'amu-ui-inject-plugin.js'
export const amuImports: Record<string, string> = {
  'amu-ui': './amu-ui/index.esm.js'
}

export const vueImports: Record<string, string> = {
  vue: getVueRuntimeURL()
}
export const additionalImports: Record<string, string> = {
  ...amuImports,
  '@vue/shared': getCdnUrl('@vue/shared', 'dist/shared.esm-bundler.js')
}

export const welcomeCode = `\
<script setup lang='ts'>
import { ref } from 'vue'

const msg = ref('Hello AmuUI!')
</script>

<template>
  <AButton type="primary">Primary</AButton>
  <p />
  <AButton type="success">Success</AButton>
  <p />
  <AButton type="error">Error</AButton>
</template>
`
export const AppWrapperCode = `\
<script setup>
import App from './${appFile}'
import { injectAmuUI } from './${amuInjectPlugin}'

injectAmuUI()
</script>

<template>
  <App />
</template>
`

export const amuReplPluginCode = `\
import { getCurrentInstance } from 'vue'
import amuUI from 'amu-ui'

export function injectAmuUI() {
  const instance = getCurrentInstance()
  instance.appContext.app.use(amuUI)
}


export function appendStyle() {
  return new Promise((resolve, reject) => {
    document.body.style.padding = '10px'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = './amu-ui/style.css'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}

window.addEventListener('storage',(e)=>{
 const theme = e.newValue
 if(theme === null) return
 document.querySelector('html').className = theme
  document.querySelector('html').style.background = theme === 'dark' ? '#18181c' : '#ffff'
})

await appendStyle()
const theme = window.parent.document.documentElement.getAttribute('class')
document.querySelector('html').className = theme
document.querySelector('html').style.background = theme === 'dark' ? '#18181c' : '#ffff'
`


export type additionalFileType = Pick<File, 'filename' | 'code'> & Partial<Omit<File, 'filename' | 'code'>> & {
  canDelete?: boolean,
  /** default project depends on this file, cannot be deleted */
  deleteTips?: string,
}


export const defaultDeleteTips = 'project depends on this file, cannot be deleted'

export const additionalFiles: additionalFileType[] = [{
  filename: amuInjectPlugin,
  code: amuReplPluginCode,
  hidden: true,
  canDelete: false,
}]
