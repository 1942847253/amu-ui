import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { relative, resolve } from 'node:path'

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const outputDir = resolve(rootDir, 'sfc-playground/public/repl-runtime')
const styleManifestPath = resolve(rootDir, 'docs/src/utils/playground-style-manifest.ts')

const sources = [
  {
    from: resolve(rootDir, 'dist/es'),
    to: resolve(outputDir, 'amu-ui'),
    label: '根包 dist/es',
  },
  {
    from: resolve(rootDir, 'packages/hooks/dist/es'),
    to: resolve(outputDir, '@amu-ui/hooks'),
    label: '@amu-ui/hooks dist/es',
  },
  {
    from: resolve(rootDir, 'packages/locale/dist/es'),
    to: resolve(outputDir, '@amu-ui/locale'),
    label: '@amu-ui/locale dist/es',
  },
  {
    from: resolve(rootDir, 'packages/icons/dist/es'),
    to: resolve(outputDir, '@amu-ui/icons'),
    label: '@amu-ui/icons dist/es',
  },
  {
    from: resolve(rootDir, 'node_modules/vue/dist/vue.esm-browser.js'),
    to: resolve(outputDir, 'vendor/vue.esm-browser.js'),
    label: 'Vue 浏览器运行时',
  },
]

const missing = sources.filter((entry) => !existsSync(entry.from))

function toPosix(path) {
  return path.replace(/\\/g, '/')
}

function collectFiles(dirPath, predicate, bucket = []) {
  const entries = readdirSync(dirPath)

  for (const entry of entries) {
    const fullPath = resolve(dirPath, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      collectFiles(fullPath, predicate, bucket)
      continue
    }

    if (predicate(fullPath)) {
      bucket.push(fullPath)
    }
  }

  return bucket
}

function walkFiles(dirPath) {
  const moduleFiles = collectFiles(dirPath, (filePath) => filePath.endsWith('.mjs'))

  for (const fullPath of moduleFiles) {
    const source = readFileSync(fullPath, 'utf-8')
    const nextSource = source
      .split(/\r?\n/)
      .filter((line) => !/^\s*import\s+.*['"][^'"]+\.css['"]/.test(line))
      .join('\n')

    if (nextSource !== source) {
      writeFileSync(fullPath, nextSource)
    }
  }
}

function writeStyleManifest() {
  const assetsDir = resolve(outputDir, 'amu-ui/assets')
  const cssFiles = collectFiles(assetsDir, (filePath) => filePath.endsWith('.css'))
    .map((filePath) => toPosix(relative(outputDir, filePath)))
    .sort((left, right) => left.localeCompare(right))

  const lines = [
    '// 由 scripts/sync-sfc-playground-runtime.mjs 自动生成',
    '// 请勿手动修改',
    '',
    'export const playgroundStyleManifest = [',
    ...cssFiles.map((filePath) => `  ${JSON.stringify(filePath)},`),
    '] as const',
    '',
  ]

  writeFileSync(styleManifestPath, lines.join('\n'))
}

if (missing.length > 0) {
  const tips = missing.map((entry) => `- 缺少 ${entry.label}: ${entry.from}`).join('\n')
  throw new Error(
    [
      '同步 sfc-playground runtime 失败。',
      tips,
      '请先在仓库根目录执行 pnpm build，确保根包与子包 dist 产物已生成。',
    ].join('\n'),
  )
}

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(outputDir, { recursive: true })

for (const entry of sources) {
  mkdirSync(resolve(entry.to, '..'), { recursive: true })
  cpSync(entry.from, entry.to, { recursive: true, force: true })
}

walkFiles(outputDir)
writeStyleManifest()

console.log(`已同步 sfc-playground runtime 到 ${outputDir}`)