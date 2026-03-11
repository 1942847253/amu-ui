const rawDemoModules = import.meta.glob('../demos/**/*.{vue,ts,js,json,css}', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const relativeImportPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[\w*{}\s,]+\s+from\s+)?['"](\.[^'"]+)['"]|import\(\s*['"](\.[^'"]+)['"]\s*\)/g

function normalizeCode(code: string) {
  return code.replace(/\r\n/g, '\n').trim()
}

function normalizePath(path: string) {
  const normalized = path.replace(/\\/g, '/')
  const segments = normalized.split('/')
  const result: string[] = []

  for (const segment of segments) {
    if (!segment || segment === '.') continue
    if (segment === '..') {
      result.pop()
      continue
    }
    result.push(segment)
  }

  return result.join('/')
}

function dirname(path: string) {
  const normalized = normalizePath(path)
  const index = normalized.lastIndexOf('/')
  return index === -1 ? '' : normalized.slice(0, index)
}

function joinPath(base: string, relativePath: string) {
  const baseDir = dirname(base)
  const combined = baseDir ? `${baseDir}/${relativePath}` : relativePath
  return normalizePath(combined)
}

function getBasename(path: string) {
  const normalized = normalizePath(path)
  const index = normalized.lastIndexOf('/')
  return index === -1 ? normalized : normalized.slice(index + 1)
}

function stripExtension(path: string) {
  return path.replace(/\.[^.]+$/, '')
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function matchesDemoKey(path: string, demoKey: string) {
  const normalizedKey = normalizeKey(demoKey)
  const basename = normalizeKey(stripExtension(getBasename(path)).replace(/^demo/, ''))
  return basename === normalizedKey || basename.includes(normalizedKey)
}

function collectRelativeImports(code: string) {
  const imports = new Set<string>()

  for (const match of code.matchAll(relativeImportPattern)) {
    const specifier = match[1] || match[2]
    if (specifier) imports.add(specifier)
  }

  return [...imports]
}

function resolveRelativeImport(
  fromPath: string,
  specifier: string,
  availablePaths: Set<string>,
) {
  const basePath = joinPath(fromPath, specifier)
  const candidates = new Set<string>([
    basePath,
    `${basePath}.vue`,
    `${basePath}.ts`,
    `${basePath}.js`,
    `${basePath}.json`,
    `${basePath}.css`,
    `${basePath}/index.vue`,
    `${basePath}/index.ts`,
    `${basePath}/index.js`,
    `${basePath}/index.json`,
    `${basePath}/index.css`,
  ])

  for (const candidate of candidates) {
    if (availablePaths.has(candidate)) return candidate
  }

  return null
}

function toRelativeFilePath(fullPath: string, componentName: string) {
  const prefix = normalizePath(`../demos/${componentName}/`)
  return normalizePath(fullPath).slice(prefix.length).replace(/^\/+/, '')
}

async function loadComponentDemoFiles(componentName: string) {
  const prefix = `../demos/${componentName}/`
  const entries = Object.entries(rawDemoModules).filter(([path]) => path.startsWith(prefix))

  const loaded = await Promise.all(
    entries.map(async ([path, loader]) => [normalizePath(path), await loader()] as const),
  )

  return Object.fromEntries(loaded)
}

function findEntryFilePath(
  files: Record<string, string>,
  demoKey: string,
  code: string,
) {
  const normalizedCode = normalizeCode(code)

  for (const [path, content] of Object.entries(files)) {
    if (normalizeCode(content) === normalizedCode) return path
  }

  const keyedMatch = Object.keys(files).find(
    (path) => path.endsWith('.vue') && matchesDemoKey(path, demoKey),
  )

  return keyedMatch ?? null
}

export async function resolveDemoSourceFiles(
  componentName: string,
  demoKey: string,
  code: string,
) {
  const componentFiles = await loadComponentDemoFiles(componentName)
  const entryPath = findEntryFilePath(componentFiles, demoKey, code)

  if (!entryPath) {
    return {
      entryFile: 'Demo.vue',
      files: {
        'Demo.vue': code,
      },
    }
  }

  const availablePaths = new Set(Object.keys(componentFiles))
  const queue = [entryPath]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const currentPath = queue.pop()
    if (!currentPath || visited.has(currentPath)) continue

    visited.add(currentPath)

    const content = componentFiles[currentPath]
    if (!content) continue

    for (const specifier of collectRelativeImports(content)) {
      const resolved = resolveRelativeImport(currentPath, specifier, availablePaths)
      if (resolved && !visited.has(resolved)) {
        queue.push(resolved)
      }
    }
  }

  const files = Object.fromEntries(
    [...visited]
      .sort((left, right) => left.localeCompare(right))
      .map((path) => [toRelativeFilePath(path, componentName), componentFiles[path]]),
  )

  return {
    entryFile: toRelativeFilePath(entryPath, componentName),
    files,
  }
}