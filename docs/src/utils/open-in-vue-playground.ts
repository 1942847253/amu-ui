import { strFromU8, strToU8, zlibSync } from 'fflate'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

function toSafeVueFilename(title: string) {
  const trimmed = title.trim() || 'Demo'
  const base = trimmed
    .replace(/\.vue$/i, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!base) return 'Demo.vue'

  const pascal = base
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return `${pascal || 'Demo'}.vue`
}

function getCssImportsForDemo(code: string) {
  const cssUrls: string[] = [
    'https://unpkg.com/amu-ui@latest/dist/es/assets/theme/src/index.css',
  ]

  const toKebab = (pascal: string) =>
    pascal
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase()

  const usedDirs = new Set<string>()

  // 1) Detect component tags in <template>
  // Examples: <AmuButton />, <AmuConfigProvider>, <amu-button />, <amu-config-provider>
  const tagRe = /<\s*(Amu[A-Z][\w]*|amu-[a-z0-9-]+)\b/gi
  for (const m of code.matchAll(tagRe)) {
    const tag = m[1]
    if (!tag) continue

    if (/^amu-/i.test(tag)) {
      const dir = tag.slice(4).toLowerCase()
      if (dir) usedDirs.add(dir)
      continue
    }

    if (/^Amu[A-Z]/.test(tag)) {
      const raw = tag.replace(/^Amu/, '')
      if (!raw) continue
      usedDirs.add(toKebab(raw))
    }
  }

  // 2) Detect named imports from 'amu-ui'
  // Example: import { AmuButton, AmuIcon as Icon } from 'amu-ui'
  const importRe = /import\s*{([\s\S]*?)}\s*from\s*['"]amu-ui['"]/g
  for (const m of code.matchAll(importRe)) {
    const inside = m[1] || ''
    const parts = inside
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    for (const part of parts) {
      const name = part.split(/\s+as\s+/i)[0]?.trim()
      if (name && /^Amu[A-Z]/.test(name)) {
        const raw = name.replace(/^Amu/, '')
        if (!raw) continue
        usedDirs.add(toKebab(raw))
      }
    }
  }

  for (const dir of usedDirs) {
    cssUrls.push(
      `https://unpkg.com/amu-ui@latest/dist/es/assets/components/${dir}/src/style.css`,
    )
  }

  return cssUrls
}

function withStyleLoaderImportInSfc(code: string, styleLoaderFilename: string) {
  const importLine = `import './${styleLoaderFilename.replace(/\.ts$/i, '')}'`
  const trimmed = code.trimEnd()
  const scriptSetupRe = /<script\s+setup(\s+[^>]*)?>([\s\S]*?)<\/script>/i

  if (scriptSetupRe.test(trimmed)) {
    return trimmed.replace(scriptSetupRe, (full) => {
      if (full.includes(importLine)) return full
      return full.replace(/<script\s+setup(\s+[^>]*)?>/i, (m) => `${m}\n${importLine}\n`)
    })
  }

  const scriptBlock = `\n\n<script setup lang="ts">\n${importLine}\n</script>\n`
  if (/<\/template>\s*/i.test(trimmed)) {
    return trimmed.replace(/<\/template>\s*/i, (m) => `${m}${scriptBlock}`)
  }
  return `${trimmed}${scriptBlock}`
}

function createStyleLoaderModule(cssUrls: string[]) {
  const urlsJson = JSON.stringify(cssUrls)
  return `// injected by amu-ui docs\n;(() => {\n  const urls = ${urlsJson}\n\n  // 1) Load CSS assets\n  for (const href of urls) {\n    const selector = 'link[data-amu-ui-css="' + href.replace(/"/g, '&quot;') + '"]'\n    if (document.querySelector(selector)) continue\n    const link = document.createElement('link')\n    link.rel = 'stylesheet'\n    link.href = href\n    link.setAttribute('data-amu-ui-css', href)\n    document.head.appendChild(link)\n  }\n\n  // 2) Ensure page background uses theme tokens\n  if (!document.querySelector('style[data-amu-ui-surface]')) {\n    const style = document.createElement('style')\n    style.setAttribute('data-amu-ui-surface', 'true')\n    style.textContent = [\n      'html, body {',\n      '  background-color: var(--amu-color-bg);',\n      '  color: var(--amu-color-text);',\n      '}',\n    ].join('\\n')\n    document.head.appendChild(style)\n  }\n\n  // 3) Sync Playground dark UI (html.dark) -> amu-ui theme\n  const root = document.documentElement\n  const SOURCE_ATTR = 'data-amu-theme-source'\n  const SOURCE_VALUE = 'amu-ui-docs'\n\n  const syncTheme = () => {\n    const wantsDark = root.classList.contains('dark')\n    const source = root.getAttribute(SOURCE_ATTR)\n    const hasExplicitTheme = root.hasAttribute('data-amu-theme') && source !== SOURCE_VALUE\n\n    if (hasExplicitTheme) return\n\n    if (wantsDark) {\n      root.setAttribute('data-amu-theme', 'dark')\n      root.setAttribute(SOURCE_ATTR, SOURCE_VALUE)\n    } else if (source === SOURCE_VALUE) {\n      root.removeAttribute('data-amu-theme')\n      root.removeAttribute(SOURCE_ATTR)\n    }\n  }\n\n  syncTheme()\n  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ['class'] })\n})()\n`
}

export function openInVuePlayground(code: string, title = 'Demo') {
  const demoFilename = toSafeVueFilename(title)

  const styleLoaderFilename = '__internal__/amu-ui-style.ts'

  const cssUrls = getCssImportsForDemo(code)
  const demoCode = withStyleLoaderImportInSfc(code, styleLoaderFilename)

  const files: Record<string, string> = {
    // Important: omit App.vue so the playground will fall back to the first file
    // and focus it by default.
    [demoFilename]: demoCode,
    [styleLoaderFilename]: createStyleLoaderModule(cssUrls),
    'import-map.json': JSON.stringify(
      {
        imports: {
          'amu-ui': 'https://esm.sh/amu-ui@latest?external=vue',
          '@amu-ui/icons': 'https://esm.sh/@amu-ui/icons@latest?external=vue',
        },
      },
      null,
      2,
    ),
  }

  const hash = `#${utoa(JSON.stringify(files))}`
  window.open(`https://play.vuejs.org/${hash}`, '_blank')
}
