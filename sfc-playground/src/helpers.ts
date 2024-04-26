import { additionalImports, amuImports, vueImports } from './config'

/**
 * fix wrong cdn url already in use
 * @param importMap { "amu-ui": "xx" }
 */
export const convertBugImportMapCdnUrl = (importMap: Record<string, string>) => {
  const someBugImportData = [ {
    name: 'vue',
    filepath: '/dist/runtime-dom.esm-browser.js'
  }]

  /**
   * fix some missing import
   * @param importMap { "amu-ui": "xx" }
   */
  const someMissingImportData = ['@vue/shared']

  someBugImportData.forEach(({ name, filepath }) => {
    if (importMap[name]?.endsWith(filepath)) {
      if (amuImports[name]) {
        importMap[name] = amuImports[name]
      } else if (vueImports[name]) {
        importMap[name] = vueImports[name]
      }
    }
  })

  someMissingImportData.forEach((name) => {
    if (!importMap[name]) {
      importMap[name] = additionalImports[name] || vueImports[name]
    }
  })
}
