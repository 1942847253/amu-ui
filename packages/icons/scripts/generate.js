import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const svgDir = path.resolve(__dirname, '../svg')
const iconsDir = path.resolve(__dirname, '../src/icons')
const indexFile = path.resolve(__dirname, '../src/index.ts')

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Optimize SVG content
 */
function optimizeSvg(svgContent) {
  // Remove unnecessary attributes
  return svgContent
    .replace(/\s+/g, ' ')
    .replace(/<!--.*?-->/g, '')
    .replace(/<\?xml.*?\?>/g, '')
    .replace(/<!DOCTYPE.*?>/g, '')
    .trim()
}

/**
 * Generate icon component from SVG
 */
function generateIconComponent(name, svgContent) {
  const componentName = `Icon${toPascalCase(name)}`
  const optimizedSvg = optimizeSvg(svgContent)
  
  // Extract all attributes from the svg tag
  const svgTagMatch = optimizedSvg.match(/<svg([^>]*)>/)
  const svgAttributes = svgTagMatch ? svgTagMatch[1].trim() : ''
  
  // Remove xmlns, width, height (we handle size via props/css), and class
  // Keep fill, stroke, stroke-width, etc.
  // Use word boundary \b to avoid matching substrings like stroke-width
  const cleanAttributes = svgAttributes
    .replace(/\bxmlns="[^"]*"/g, '')
    .replace(/\bwidth="[^"]*"/g, '')
    .replace(/\bheight="[^"]*"/g, '')
    .replace(/\bclass="[^"]*"/g, '')
    .trim()
  
  // Extract path/content from SVG
  const contentMatch = optimizedSvg.match(/<svg[^>]*>(.*?)<\/svg>/s)
  const svgInner = contentMatch ? contentMatch[1].trim() : ''

  return `<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    ${cleanAttributes}
  >
    ${svgInner}
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: '${componentName}',
})
</script>
`
}

/**
 * Generate icons from SVG files
 */
async function generateIcons() {
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  // Find all SVG files
  const svgFiles = await fg('*.svg', {
    cwd: svgDir,
    absolute: false,
  })

  if (svgFiles.length === 0) {
    console.log('⚠️  No SVG files found in svg/ directory')
    console.log('💡 Add your SVG files to packages/icons/svg/ and run this script again')
    return
  }

  const iconNames = []

  // Generate icon components
  for (const file of svgFiles) {
    const name = path.basename(file, '.svg')
    const iconName = `Icon${toPascalCase(name)}`
    iconNames.push({ name, iconName })

    const svgPath = path.join(svgDir, file)
    const svgContent = fs.readFileSync(svgPath, 'utf-8')
    const componentContent = generateIconComponent(name, svgContent)
    
    const outputPath = path.join(iconsDir, `${iconName}.vue`)
    fs.writeFileSync(outputPath, componentContent, 'utf-8')
    
    console.log(`✅ Generated: ${iconName}.vue`)
  }

  // Generate index.ts with all exports
  generateIndex(iconNames)
  
  console.log(`\n🎉 Successfully generated ${iconNames.length} icon components!`)
}

/**
 * Generate index.ts with all icon exports
 */
function generateIndex(iconNames) {
  const imports = iconNames
    .map(({ iconName }) => `import ${iconName} from './icons/${iconName}.vue'`)
    .join('\n')
  
  const exports = iconNames
    .map(({ iconName }) => `  ${iconName},`)
    .join('\n')

  const componentList = iconNames
    .map(({ iconName }) => `    ${iconName},`)
    .join('\n')

  const content = `import type { App } from 'vue'
${imports}

// Export all icon components
export {
${exports}
}

// Default export for global registration
const icons = [
${componentList}
]

export default {
  install(app: App) {
    icons.forEach(icon => {
      if (icon.name) {
        app.component(icon.name, icon)
      }
    })
  },
}
`

  fs.writeFileSync(indexFile, content, 'utf-8')
  console.log('✅ Generated: index.ts')
}

// Run the generator
generateIcons().catch(console.error)
