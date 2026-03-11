import { strFromU8, strToU8, zlibSync } from 'fflate'
import { resolveDemoSourceFiles } from './demo-source'
import imageViewerVueSource from '../../../packages/components/image-viewer/src/image-viewer.vue?raw'
import previewImageVueSource from '../../../packages/components/image-viewer/src/preview-image.vue?raw'
import imageViewerServiceSource from '../../../packages/components/image-viewer/src/image-viewer-service.ts?raw'
import imageViewerPropsSource from '../../../packages/components/image-viewer/src/props.ts?raw'
import useImageViewerSource from '../../../packages/components/image-viewer/src/use-image-viewer.ts?raw'

const packageVersions = {
  amuUi: '2.1.2',
  hooks: '0.1.0',
  icons: '0.2.0',
  locale: '0.1.0',
  vue: '3.5.13',
} as const

const amuUiBundleExternals = 'vue,@amu-ui/hooks,@amu-ui/icons,@amu-ui/locale'
const themeShimFilename = '__internal__/amu-ui-theme.ts'
const rootShimFilename = '__internal__/amu-ui-root.ts'
const imageViewerShimFilename = '__internal__/amu-ui-image-viewer/index.ts'
const imageViewerFilePaths = {
  imageViewer: '__internal__/amu-ui-image-viewer/image-viewer.vue',
  previewImage: '__internal__/amu-ui-image-viewer/preview-image.vue',
  service: '__internal__/amu-ui-image-viewer/image-viewer-service.ts',
  props: '__internal__/amu-ui-image-viewer/props.ts',
  useImageViewer: '__internal__/amu-ui-image-viewer/use-image-viewer.ts',
} as const

const rootExportSourceOverrides: Record<string, string> = {
  AmuContent: 'layout',
  AmuDropdownItem: 'dropdown',
  AmuDropdownMenu: 'dropdown',
  AmuFooter: 'layout',
  AmuFormItem: 'form',
  AmuHeader: 'layout',
  AmuLoadingDirective: 'loading',
  AmuLoadingService: 'loading',
  AmuLoadingServiceFn: 'loading',
  AmuMenuGroup: 'menu',
  AmuMenuItem: 'menu',
  AmuOption: 'select',
  AmuPreviewImage: 'image-viewer',
  AmuRadioButton: 'radio',
  AmuRadioGroup: 'radio',
  AmuSkeletonItem: 'skeleton',
  AmuSider: 'layout',
  AmuSubMenu: 'menu',
  AmuSwiperItem: 'swiper',
  AmuTableColumn: 'table',
  AmuTabPane: 'tabs',
  Dialog: 'dialog',
  DrawerOpener: 'drawer',
  previewImage: 'image-viewer',
}

const componentInternalDependencies: Record<string, string[]> = {
  AmuTable: ['AmuScrollbar'],
}

const componentStyleFileOverrides: Record<string, string> = {
  table: 'table.css',
}

const componentStyleDependencies: Record<string, string[]> = {
  table: ['scrollbar'],
}

const componentDirs = [
  'config-provider',
  'date-picker',
  'image-viewer',
  'input-number',
  'popconfirm',
  'scrollbar',
  'textarea',
  'breadcrumb',
  'checkbox',
  'collapse',
  'descriptions',
  'dropdown',
  'pagination',
  'progress',
  'skeleton',
  'spinner',
  'swiper',
  'switch',
  'upload',
  'button',
  'card',
  'cascader',
  'col',
  'dialog',
  'drawer',
  'empty',
  'form',
  'icon',
  'input',
  'layout',
  'loading',
  'menu',
  'message',
  'popup',
  'radio',
  'rate',
  'row',
  'select',
  'slider',
  'space',
  'table',
  'tabs',
  'tag',
  'tooltip',
  'tree',
].sort((left, right) => right.length - left.length)

const serviceComponentMap: Record<string, string> = {
  Dialog: 'dialog',
}

const componentsWithStyle = new Set([
  'breadcrumb',
  'button',
  'card',
  'cascader',
  'checkbox',
  'col',
  'collapse',
  'date-picker',
  'descriptions',
  'dialog',
  'dropdown',
  'empty',
  'form',
  'icon',
  'image-viewer',
  'input',
  'input-number',
  'layout',
  'loading',
  'menu',
  'message',
  'pagination',
  'popconfirm',
  'progress',
  'radio',
  'rate',
  'row',
  'scrollbar',
  'select',
  'skeleton',
  'slider',
  'space',
  'spinner',
  'swiper',
  'switch',
  'table',
  'tabs',
  'tag',
  'textarea',
  'tooltip',
  'tree',
  'upload',
])

function toKebab(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

function resolveComponentDir(name: string) {
  const normalized = toKebab(name)
  if (componentDirs.includes(normalized)) return normalized

  return componentDirs.find((dir) => normalized === dir || normalized.startsWith(`${dir}-`))
}

function getCssImportsForDemo(files: Record<string, string>) {
  const cssUrls: string[] = [
    `https://unpkg.com/amu-ui@${packageVersions.amuUi}/dist/es/assets/theme/src/index.css`,
  ]

  const usedDirs = new Set<string>()

  for (const code of Object.values(files)) {
    const tagRe = /<\s*(Amu[A-Z][\w]*|amu-[a-z0-9-]+)\b/gi
    for (const match of code.matchAll(tagRe)) {
      const tag = match[1]
      if (!tag) continue

      if (/^amu-/i.test(tag)) {
        const dir = tag.slice(4).toLowerCase()
        if (dir) usedDirs.add(dir)
        continue
      }

      const raw = tag.replace(/^Amu/, '')
      const resolved = resolveComponentDir(raw)
      if (resolved) usedDirs.add(resolved)
    }

    const importRe = /import\s+(?:type\s+)?(?:[\s\S]*?)from\s*['"]([^'"]+)['"]/g
    for (const match of code.matchAll(importRe)) {
      const source = match[1]
      if (!source) continue

      if (source.startsWith('amu-ui/')) {
        const dir = source.slice('amu-ui/'.length).split('/')[0]
        if (dir) usedDirs.add(dir)
      }
    }

    const rootImportRe = /import\s*{([\s\S]*?)}\s*from\s*['"]amu-ui['"]/g
    for (const match of code.matchAll(rootImportRe)) {
      const inside = match[1] || ''
      const parts = inside
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)

      for (const part of parts) {
        const name = part.split(/\s+as\s+/i)[0]?.trim()
        if (!name) continue

        if (/^Amu[A-Z]/.test(name)) {
          const resolved = resolveComponentDir(name.replace(/^Amu/, ''))
          if (resolved) usedDirs.add(resolved)
          continue
        }

        const mapped = serviceComponentMap[name]
        if (mapped) usedDirs.add(mapped)
      }
    }
  }

  for (const dir of usedDirs) {
    if (!componentsWithStyle.has(dir)) continue

    const extraStyleDeps = componentStyleDependencies[dir]
    if (extraStyleDeps) {
      for (const dependency of extraStyleDeps) {
        usedDirs.add(dependency)
      }
    }

    const styleFile = componentStyleFileOverrides[dir] || 'style.css'

    cssUrls.push(
      `https://unpkg.com/amu-ui@${packageVersions.amuUi}/dist/es/assets/components/${dir}/src/${styleFile}`,
    )
  }

  return cssUrls
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

function collectTemplateComponentTags(code: string) {
  const names = new Set<string>()
  const tagRe = /<\s*(Amu[A-Z][\w]*)\b/g

  for (const match of code.matchAll(tagRe)) {
    const name = match[1]
    if (name) names.add(name)
  }

  return [...names].sort((left, right) => left.localeCompare(right))
}

function collectExplicitRuntimeImports(code: string) {
  const names = new Set<string>()
  const importRe = /import\s*(type\s+)?\{([\s\S]*?)\}\s*from\s*['"][^'"]+['"]/g

  for (const match of code.matchAll(importRe)) {
    if (match[1]) continue

    const clause = match[2] || ''
    const parts = clause
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)

    for (const part of parts) {
      if (part.startsWith('type ')) continue

      const alias = part.split(/\s+as\s+/i)[1]?.trim()
      const original = part.split(/\s+as\s+/i)[0]?.trim()
      if (alias) {
        names.add(alias)
      } else if (original) {
        names.add(original)
      }
    }
  }

  return names
}

function collectRootRuntimeImports(files: Record<string, string>) {
  const names = new Set<string>()
  const importRe = /import\s*(type\s+)?\{([\s\S]*?)\}\s*from\s*['"]amu-ui['"]/g

  for (const code of Object.values(files)) {
    for (const match of code.matchAll(importRe)) {
      if (match[1]) continue

      const clause = match[2] || ''
      const parts = clause
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)

      for (const part of parts) {
        if (part.startsWith('type ')) continue

        const original = part.split(/\s+as\s+/i)[0]?.trim()
        if (original) names.add(original)
      }
    }

    for (const componentName of collectTemplateComponentTags(code)) {
      names.add(componentName)

      const dependencies = componentInternalDependencies[componentName]
      if (dependencies) {
        for (const dependency of dependencies) {
          names.add(dependency)
        }
      }
    }
  }

  return [...names].sort((left, right) => left.localeCompare(right))
}

function resolveRootExportSource(name: string) {
  const override = rootExportSourceOverrides[name]
  if (override) return override

  if (name.startsWith('Amu')) {
    return resolveComponentDir(name.slice(3))
  }

  return serviceComponentMap[name] || null
}

function collectRootShimSources(files: Record<string, string>) {
  const sources = new Set<string>()

  for (const name of collectRootRuntimeImports(files)) {
    const source = resolveRootExportSource(name)
    if (source) {
      sources.add(`amu-ui/${source}`)
    }
  }

  return [...sources].sort((left, right) => left.localeCompare(right))
}

function getDirectory(path: string) {
  const normalized = path.replace(/\\/g, '/')
  const index = normalized.lastIndexOf('/')
  return index === -1 ? '' : normalized.slice(0, index)
}

function getRelativeImportPath(fromFile: string, toFile: string) {
  const fromParts = getDirectory(fromFile).split('/').filter(Boolean)
  const toParts = toFile.replace(/\\/g, '/').split('/').filter(Boolean)

  while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
    fromParts.shift()
    toParts.shift()
  }

  const up = fromParts.map(() => '..')
  const down = toParts
  const joined = [...up, ...down].join('/')

  return joined.startsWith('.') ? joined : `./${joined}`
}

function rewriteRootImports(files: Record<string, string>) {
  const rewritten: Record<string, string> = {}

  for (const [filePath, code] of Object.entries(files)) {
    const rootShimPath = getRelativeImportPath(filePath, rootShimFilename)
    rewritten[filePath] = code.replace(
      /from\s*(['"])amu-ui\1/g,
      (_match, quote: string) => `from ${quote}${rootShimPath}${quote}`,
    )
  }

  return rewritten
}

function rewriteImageViewerImports(files: Record<string, string>) {
  const rewritten: Record<string, string> = {}

  for (const [filePath, code] of Object.entries(files)) {
    const imageViewerShimPath = getRelativeImportPath(filePath, imageViewerShimFilename)
    rewritten[filePath] = code
      .replace(
        /from\s*(['"])amu-ui\/image-viewer\1/g,
        (_match, quote: string) => `from ${quote}${imageViewerShimPath}${quote}`,
      )
      .replace(
        /from\s*(['"])amu-ui\/components\/image-viewer\1/g,
        (_match, quote: string) => `from ${quote}${imageViewerShimPath}${quote}`,
      )
  }

  return rewritten
}

function usesImageViewerShim(files: Record<string, string>) {
  const directImportRe = /from\s*['"]amu-ui\/(?:components\/)?image-viewer['"]/g
  const rootImportRe = /import\s*(?:type\s+)?\{([\s\S]*?)\}\s*from\s*['"]amu-ui['"]/g

  for (const code of Object.values(files)) {
    if (directImportRe.test(code)) {
      return true
    }

    for (const match of code.matchAll(rootImportRe)) {
      const clause = match[1] || ''
      if (/\bAmuImageViewer\b|\bAmuPreviewImage\b|\bpreviewImage\b/.test(clause)) {
        return true
      }
    }
  }

  return false
}

function injectMissingComponentImports(files: Record<string, string>) {
  const rewritten: Record<string, string> = {}

  for (const [filePath, code] of Object.entries(files)) {
    if (!filePath.endsWith('.vue')) {
      rewritten[filePath] = code
      continue
    }

    const explicitImports = collectExplicitRuntimeImports(code)
    const missing = collectTemplateComponentTags(code).filter((name) => !explicitImports.has(name))

    if (!missing.length) {
      rewritten[filePath] = code
      continue
    }

    const importPath = getRelativeImportPath(filePath, rootShimFilename)
    const importLine = `import { ${missing.join(', ')} } from '${importPath}'`

    if (/<script\s+setup\b[^>]*>/i.test(code)) {
      rewritten[filePath] = code.replace(/<script\s+setup\b[^>]*>/i, (match) => `${match}\n${importLine}`)
      continue
    }

    rewritten[filePath] = `${code}\n\n<script setup lang="ts">\n${importLine}\n</script>\n`
  }

  return rewritten
}

function toAmuUiBundleUrl(path = '') {
  const suffix = path ? `/${path}` : ''
  return `https://esm.sh/amu-ui@${packageVersions.amuUi}${suffix}?bundle&external=${amuUiBundleExternals}`
}

function toImportMapUrl(source: string) {
  if (source === 'vue') {
    return `https://unpkg.com/vue@${packageVersions.vue}/dist/vue.esm-browser.js`
  }

  if (source === 'amu-ui') {
    return toAmuUiBundleUrl()
  }

  if (source === 'amu-ui/theme') {
    return `./${themeShimFilename}`
  }

  if (source === 'amu-ui/image-viewer' || source === 'amu-ui/components/image-viewer') {
    return null
  }

  if (source === 'amu-ui/locale') {
    return `https://esm.sh/@amu-ui/locale@${packageVersions.locale}?bundle`
  }

  if (source.startsWith('amu-ui/')) {
    const subPath = source.slice('amu-ui/'.length)

    if (subPath.startsWith('components/')) {
      const componentPath = subPath.slice('components/'.length)
      return toAmuUiBundleUrl(componentPath)
    }

    if (subPath === 'locale') {
      return `https://esm.sh/@amu-ui/locale@${packageVersions.locale}?bundle`
    }

    return toAmuUiBundleUrl(subPath)
  }

  if (source === '@amu-ui/hooks') {
    return `https://unpkg.com/@amu-ui/hooks@${packageVersions.hooks}/dist/es/index.mjs`
  }

  if (source === '@amu-ui/icons') {
    return `https://esm.sh/@amu-ui/icons@${packageVersions.icons}?bundle&external=vue`
  }

  if (source.startsWith('@amu-ui/icons/')) {
    const subPath = source.slice('@amu-ui/icons/'.length)

    if (subPath.startsWith('icons/')) {
      const iconPath = subPath.slice('icons/'.length)
      return `https://unpkg.com/@amu-ui/icons@${packageVersions.icons}/dist/es/icons/${iconPath}.vue.mjs`
    }

    return `https://unpkg.com/@amu-ui/icons@${packageVersions.icons}/dist/es/${subPath}.mjs`
  }

  if (source === '@amu-ui/locale') {
    return `https://unpkg.com/@amu-ui/locale@${packageVersions.locale}/dist/es/index.mjs`
  }

  if (source.startsWith('@amu-ui/locale/')) {
    const subPath = source.slice('@amu-ui/locale/'.length)
    return `https://unpkg.com/@amu-ui/locale@${packageVersions.locale}/dist/es/${subPath}.mjs`
  }

  if (source.startsWith('@amu-ui/hooks/')) {
    const subPath = source.slice('@amu-ui/hooks/'.length)
    return `https://unpkg.com/@amu-ui/hooks@${packageVersions.hooks}/dist/es/${subPath}.mjs`
  }

  return null
}

function createImportMap(files: Record<string, string>, rootShimSourceFiles?: Record<string, string>) {
  const baseImports = [
    'vue',
    '@amu-ui/hooks',
    '@amu-ui/icons',
    '@amu-ui/locale',
  ]

  const rootShimImports = collectRootShimSources(rootShimSourceFiles ?? files)

  const imports = Object.fromEntries(
    [...new Set([...baseImports, ...collectExternalImports(files), ...rootShimImports])]
      .map((source) => [source, toImportMapUrl(source)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  )

  return JSON.stringify({ imports }, null, 2)
}

function createThemeShimModule(styleLoaderFilename: string) {
  return `import './${styleLoaderFilename}'\n`
}

function createRootShimModule(files: Record<string, string>) {
  const importNames = collectRootRuntimeImports(files)
  const exportsBySource = new Map<string, string[]>()

  for (const name of importNames) {
    const source = resolveRootExportSource(name)
    if (!source) continue

    const existing = exportsBySource.get(source)
    if (existing) {
      existing.push(name)
      continue
    }

    exportsBySource.set(source, [name])
  }

  const importLines = ['// 仅导出当前示例实际使用到的根包成员']
  const exportNames: string[] = []
  const imageViewerImportPath = getRelativeImportPath(rootShimFilename, imageViewerShimFilename)

  for (const [source, names] of [...exportsBySource.entries()].sort((left, right) => left[0].localeCompare(right[0]))) {
    const uniqueNames = [...new Set(names)].sort((left, right) => left.localeCompare(right))
    const importSource = source === 'image-viewer' ? imageViewerImportPath : `amu-ui/${source}`
    importLines.push(`import { ${uniqueNames.join(', ')} } from '${importSource}'`)
    exportNames.push(...uniqueNames)
  }

  const uniqueExportNames = [...new Set(exportNames)].sort((left, right) => left.localeCompare(right))

  if (!uniqueExportNames.length) {
    return `${importLines.join('\n')}\n\nconst __amuComponents = {}\n\nexport { __amuComponents }\n`
  }

  return `${importLines.join('\n')}\n\nconst __amuComponents = { ${uniqueExportNames.join(', ')} }\n\nexport { ${uniqueExportNames.join(', ')}, __amuComponents }\n`
}

function rewriteImageViewerModule(code: string) {
  return code
    .replace(/from\s+['"]\.\.\/\.\.\/icon['"]/g, "from 'amu-ui/icon'")
    .replace(/from\s+['"]\.\.\/\.\.\/dialog['"]/g, "from 'amu-ui/dialog'")
    .replace(/from\s+['"]\.\.\/\.\.\/popup['"]/g, "from 'amu-ui/popup'")
    .replace(/^\s*import\s+['"]\.\/style\.css['"]\s*;?\s*\n?/gm, '')
}

function createImageViewerShimFiles() {
  return {
    [imageViewerShimFilename]: [
      "import ImageViewer from './image-viewer.vue'",
      "import PreviewImage from './preview-image.vue'",
      "import { previewImage } from './image-viewer-service'",
      '',
      'export const AmuImageViewer = ImageViewer',
      'export const AmuPreviewImage = PreviewImage',
      'export { previewImage }',
      "export * from './props'",
      'export default AmuImageViewer',
      '',
    ].join('\n'),
    [imageViewerFilePaths.imageViewer]: rewriteImageViewerModule(imageViewerVueSource),
    [imageViewerFilePaths.previewImage]: rewriteImageViewerModule(previewImageVueSource),
    [imageViewerFilePaths.service]: imageViewerServiceSource,
    [imageViewerFilePaths.props]: imageViewerPropsSource,
    [imageViewerFilePaths.useImageViewer]: useImageViewerSource,
  }
}

function createStyleLoaderModule(cssUrls: string[]) {
  const urlsJson = JSON.stringify(cssUrls)
  return `// injected by amu-ui docs\n;(() => {\n  const urls = ${urlsJson}\n  const globalKey = '__AMU_UI_PLAYGROUND_THEME_SYNC__'\n  const globalState = ((window)[globalKey] ||= { observer: null })\n\n  // 1) Load CSS assets\n  for (const href of urls) {\n    const selector = 'link[data-amu-ui-css="' + href.replace(/"/g, '&quot;') + '"]'\n    if (document.querySelector(selector)) continue\n    const link = document.createElement('link')\n    link.rel = 'stylesheet'\n    link.href = href\n    link.setAttribute('data-amu-ui-css', href)\n    document.head.appendChild(link)\n  }\n\n  // 2) Ensure page background uses theme tokens\n  if (!document.querySelector('style[data-amu-ui-surface]')) {\n    const style = document.createElement('style')\n    style.setAttribute('data-amu-ui-surface', 'true')\n    style.textContent = [\n      'html, body {',\n      '  background-color: var(--amu-color-bg);',\n      '  color: var(--amu-color-text);',\n      '}',\n    ].join('\\n')\n    document.head.appendChild(style)\n  }\n\n  // 3) Sync Playground dark UI (html.dark) -> amu-ui theme\n  const root = document.documentElement\n  const SOURCE_ATTR = 'data-amu-theme-source'\n  const SOURCE_VALUE = 'amu-ui-docs'\n\n  const syncTheme = () => {\n    const wantsDark = root.classList.contains('dark')\n    const source = root.getAttribute(SOURCE_ATTR)\n    const hasExplicitTheme = root.hasAttribute('data-amu-theme') && source !== SOURCE_VALUE\n\n    if (hasExplicitTheme) return\n\n    if (wantsDark) {\n      root.setAttribute('data-amu-theme', 'dark')\n      root.setAttribute(SOURCE_ATTR, SOURCE_VALUE)\n    } else if (source === SOURCE_VALUE) {\n      root.removeAttribute('data-amu-theme')\n      root.removeAttribute(SOURCE_ATTR)\n    }\n  }\n\n  syncTheme()\n\n  if (!globalState.observer) {\n    globalState.observer = new MutationObserver(syncTheme)\n    globalState.observer.observe(root, { attributes: true, attributeFilter: ['class'] })\n  }\n})()\n`
}

function createVuePlaygroundEntry(entryFile: string, styleLoaderFilename: string) {
  return `<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import './${styleLoaderFilename}'
import { __amuComponents } from './${rootShimFilename}'
import DemoEntry from './${entryFile}'

const instance = getCurrentInstance()
if (instance) {
  Object.assign(instance.appContext.components, __amuComponents)
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
  const rewrittenDemoFiles = injectMissingComponentImports(
    rewriteImageViewerImports(rewriteRootImports(resolved.files)),
  )
  const imageViewerShimFiles = usesImageViewerShim(resolved.files) ? createImageViewerShimFiles() : {}
  const styleLoaderFilename = '__internal__/amu-ui-style.ts'
  const cssUrls = getCssImportsForDemo({
    ...rewrittenDemoFiles,
    ...imageViewerShimFiles,
  })

  const files: Record<string, string> = {
    ...rewrittenDemoFiles,
    ...imageViewerShimFiles,
    'App.vue': createVuePlaygroundEntry(resolved.entryFile, styleLoaderFilename),
    [styleLoaderFilename]: createStyleLoaderModule(cssUrls),
    [themeShimFilename]: createThemeShimModule(styleLoaderFilename),
    [rootShimFilename]: createRootShimModule(resolved.files),
    'import-map.json': createImportMap({
      ...rewrittenDemoFiles,
      ...imageViewerShimFiles,
    }, resolved.files),
  }

  const hash = `#${utoa(JSON.stringify(files))}`

  if (options.popup) {
    options.popup.location.href = `https://play.vuejs.org/${hash}`
    return
  }

  window.open(`https://play.vuejs.org/${hash}`, '_blank')
}
