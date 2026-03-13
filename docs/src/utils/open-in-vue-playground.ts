import { strFromU8, strToU8, zlibSync } from 'fflate'
import { resolveDemoSourceFiles } from './demo-source'
import {
  createImageViewerShimFiles,
  rewriteImageViewerImports,
  usesImageViewerShim,
} from './playground-image-viewer-shim'
import { playgroundStyleManifest } from './playground-style-manifest'

const localPlaygroundBaseToken = '__AMU_SFC_PLAYGROUND_BASE__'
const themeShimFilename = '__internal__/amu-ui-theme.ts'
const playgroundMetaFilename = '__playground_meta__.json'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

function getCssImportsForDemo() {
  return playgroundStyleManifest.map((filePath) => toLocalRuntimeUrl(filePath))
}

function toLocalRuntimeUrl(path: string) {
  return `${localPlaygroundBaseToken}repl-runtime/${path}`
}

function collectExternalImports(files: Record<string, string>) {
  const imports = new Set<string>()
  const importRe = /import\s+(?:type\s+)?(?:[\s\S]*?)from\s*['"]([^'"]+)['"]|export\s+(?:type\s+)?(?:[\s\S]*?)from\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g

  for (const code of Object.values(files)) {
    for (const match of code.matchAll(importRe)) {
      const source = match[1] || match[2] || match[3]
      if (!source || source.startsWith('.') || source.startsWith('/')) continue
      imports.add(source)
    }
  }

  return [...imports].sort((left, right) => left.localeCompare(right))
}

function toImportMapUrl(source: string) {
  if (source === 'vue') {
    return toLocalRuntimeUrl('vendor/vue.esm-browser.js')
  }

  if (source === 'amu-ui') {
    return toLocalRuntimeUrl('amu-ui/components/index.mjs')
  }

  if (source === 'amu-ui/theme') {
    return `./${themeShimFilename}`
  }

  if (source === 'amu-ui/image-viewer' || source === 'amu-ui/components/image-viewer') {
    return null
  }

  if (source === 'amu-ui/locale') {
    return toLocalRuntimeUrl('amu-ui/locale/index.mjs')
  }

  if (source.startsWith('amu-ui/')) {
    const subPath = source.slice('amu-ui/'.length)

    if (subPath.startsWith('components/')) {
      const componentPath = subPath.slice('components/'.length)
      return toLocalRuntimeUrl(`amu-ui/components/${componentPath}/index.mjs`)
    }

    if (subPath === 'locale') {
      return toLocalRuntimeUrl('amu-ui/locale/index.mjs')
    }

    return toLocalRuntimeUrl(`amu-ui/components/${subPath}/index.mjs`)
  }

  if (source === '@amu-ui/hooks') {
    return toLocalRuntimeUrl('@amu-ui/hooks/index.mjs')
  }

  if (source === '@amu-ui/icons') {
    return toLocalRuntimeUrl('@amu-ui/icons/index.mjs')
  }

  if (source.startsWith('@amu-ui/icons/')) {
    const subPath = source.slice('@amu-ui/icons/'.length)

    if (subPath.startsWith('icons/')) {
      const iconPath = subPath.slice('icons/'.length)
      return toLocalRuntimeUrl(`@amu-ui/icons/icons/${iconPath}.mjs`)
    }

    return toLocalRuntimeUrl(`@amu-ui/icons/${subPath}.mjs`)
  }

  if (source === '@amu-ui/locale') {
    return toLocalRuntimeUrl('@amu-ui/locale/index.mjs')
  }

  if (source.startsWith('@amu-ui/locale/')) {
    const subPath = source.slice('@amu-ui/locale/'.length)
    return toLocalRuntimeUrl(`@amu-ui/locale/${subPath}.mjs`)
  }

  if (source.startsWith('@amu-ui/hooks/')) {
    const subPath = source.slice('@amu-ui/hooks/'.length)
    return toLocalRuntimeUrl(`@amu-ui/hooks/${subPath}.mjs`)
  }

  // 第三方依赖回退到 esm.sh，避免 dayjs 等示例依赖在本地 playground 中丢失
  return `https://esm.sh/${source}`
}

function createImportMap(files: Record<string, string>) {
  const baseImports = [
    'vue',
    'amu-ui',
    '@amu-ui/hooks',
    '@amu-ui/icons',
    '@amu-ui/locale',
  ]

  const imports = Object.fromEntries(
    [...new Set([...baseImports, ...collectExternalImports(files)])]
      .map((source) => [source, toImportMapUrl(source)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  )

  return JSON.stringify({ imports }, null, 2)
}

function createThemeShimModule(styleLoaderFilename: string) {
  return `import './${styleLoaderFilename}'\n`
}

function createStyleLoaderModule(cssUrls: string[]) {
  const urlsJson = JSON.stringify(cssUrls)
  return `// injected by amu-ui docs\n;(() => {\n  const urls = ${urlsJson}\n  const globalKey = '__AMU_UI_PLAYGROUND_THEME_SYNC__'\n  const globalState = ((window)[globalKey] ||= { observer: null })\n\n  // 1) Load CSS assets\n  for (const href of urls) {\n    const selector = 'link[data-amu-ui-css="' + href.replace(/"/g, '&quot;') + '"]'\n    if (document.querySelector(selector)) continue\n    const link = document.createElement('link')\n    link.rel = 'stylesheet'\n    link.href = href\n    link.setAttribute('data-amu-ui-css', href)\n    document.head.appendChild(link)\n  }\n\n  // 2) Ensure page background uses theme tokens\n  if (!document.querySelector('style[data-amu-ui-surface]')) {\n    const style = document.createElement('style')\n    style.setAttribute('data-amu-ui-surface', 'true')\n    style.textContent = [\n      'html, body {',\n      '  background-color: var(--amu-color-bg);',\n      '  color: var(--amu-color-text);',\n      '}',\n    ].join('\\n')\n    document.head.appendChild(style)\n  }\n\n  // 3) Sync Playground dark UI (html.dark) -> amu-ui theme\n  const root = document.documentElement\n  const SOURCE_ATTR = 'data-amu-theme-source'\n  const SOURCE_VALUE = 'amu-ui-docs'\n\n  const syncTheme = () => {\n    const wantsDark = root.classList.contains('dark')\n    const source = root.getAttribute(SOURCE_ATTR)\n    const hasExplicitTheme = root.hasAttribute('data-amu-theme') && source !== SOURCE_VALUE\n\n    if (hasExplicitTheme) return\n\n    if (wantsDark) {\n      root.setAttribute('data-amu-theme', 'dark')\n      root.setAttribute(SOURCE_ATTR, SOURCE_VALUE)\n    } else if (source === SOURCE_VALUE) {\n      root.removeAttribute('data-amu-theme')\n      root.removeAttribute(SOURCE_ATTR)\n    }\n  }\n\n  syncTheme()\n\n  if (!globalState.observer) {\n    globalState.observer = new MutationObserver(syncTheme)\n    globalState.observer.observe(root, { attributes: true, attributeFilter: ['class'] })\n  }\n})()\n`
}

function createVuePlaygroundEntry(entryFile: string, styleLoaderFilename: string) {
  return `<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import AmuUI from 'amu-ui'
import AmuIcons from '@amu-ui/icons'
import './${styleLoaderFilename}'
import DemoEntry from './${entryFile}'

const instance = getCurrentInstance()
if (instance) {
  const app = instance.appContext.app
  const installKey = '__AMU_PLAYGROUND_INSTALLED__'

  if (!(app as any)[installKey]) {
    app.use(AmuUI)
    app.use(AmuIcons)
    ;(app as any)[installKey] = true
  }
}
</script>

<template>
  <DemoEntry />
</template>
`
}

export async function openInVuePlayground(options: {
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
  const rewrittenDemoFiles = rewriteImageViewerImports(resolved.files)
  const imageViewerShimFiles = usesImageViewerShim(resolved.files)
    ? createImageViewerShimFiles(toLocalRuntimeUrl)
    : {}
  const styleLoaderFilename = '__internal__/amu-ui-style.ts'
  const cssUrls = getCssImportsForDemo()

  const files: Record<string, string> = {
    ...rewrittenDemoFiles,
    ...imageViewerShimFiles,
    'App.vue': createVuePlaygroundEntry(resolved.entryFile, styleLoaderFilename),
    [styleLoaderFilename]: createStyleLoaderModule(cssUrls),
    [themeShimFilename]: createThemeShimModule(styleLoaderFilename),
    [playgroundMetaFilename]: JSON.stringify({ activeFile: resolved.entryFile }, null, 2),
    'import-map.json': createImportMap({
      ...rewrittenDemoFiles,
      ...imageViewerShimFiles,
    }),
  }

  const hash = `#${utoa(JSON.stringify(files))}`
  const url = resolveLocalVuePlaygroundUrl(hash)

  if (options.popup) {
    options.popup.location.href = url
    return
  }

  window.open(url, '_blank')
}

function resolveLocalVuePlaygroundUrl(hash: string) {
  const docsBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
  return new URL(`sfc-playground/${hash}`, docsBaseUrl).toString()
}
