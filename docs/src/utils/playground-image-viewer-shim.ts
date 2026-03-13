const imageViewerShimFilename = '__internal__/amu-ui-image-viewer/index.ts'

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

export function rewriteImageViewerImports(files: Record<string, string>) {
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

export function usesImageViewerShim(files: Record<string, string>) {
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

export function createImageViewerShimFiles(toLocalRuntimeUrl: (path: string) => string) {
  return {
    [imageViewerShimFilename]: [
      `import ImageViewerDefault, { AmuImageViewer, AmuPreviewImage } from '${toLocalRuntimeUrl('amu-ui/components/image-viewer/index.mjs')}'`,
      `import { previewImage as runtimePreviewImage } from '${toLocalRuntimeUrl('amu-ui/components/image-viewer/src/image-viewer-service.mjs')}'`,
      '',
      'export { AmuImageViewer, AmuPreviewImage }',
      'export const previewImage = runtimePreviewImage',
      'export default ImageViewerDefault',
      '',
    ].join('\n'),
  }
}