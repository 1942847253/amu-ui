
const fs = require('node:fs');
const path = require('node:path');

// 路径配置
const componentsDir = path.resolve(__dirname, '../packages/components');
const packageJsonPath = path.resolve(__dirname, '../package.json');

// 读取当前 package.json
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 基础 exports 配置（保持不变的核心部分）
const baseExports = {
  ".": {
    "types": "./dist/types/components/index.d.ts",
    "import": "./dist/es/components/index.mjs",
    "require": "./dist/cjs/components/index.cjs"
  },
  "./theme": {
    "types": "./dist/types/theme/index.d.ts",
    "import": "./dist/es/theme/index.mjs",
    "require": "./dist/cjs/theme/index.cjs"
  },
  "./package.json": "./package.json"
};

// 扫描组件目录
const components = fs.readdirSync(componentsDir).filter(name => {
  const componentPath = path.join(componentsDir, name);
  const stat = fs.statSync(componentPath);
  
  // 必须是目录，且排除 node_modules, .git 等隐藏目录，以及非组件目录（如果有）
  return stat.isDirectory() && !name.startsWith('.');
});

// 生成组件 exports
const componentExports = {};
components.forEach(name => {
  const exportConfig = {
    "types": `./dist/types/components/${name}/index.d.ts`,
    "import": `./dist/es/components/${name}/index.mjs`,
    "require": `./dist/cjs/components/${name}/index.cjs`
  };
  
  // 支持 import { Button } from 'amu-ui/button'
  componentExports[`./${name}`] = exportConfig;
  // 支持 import { Button } from 'amu-ui/components/button' (可选，为了兼容性)
  componentExports[`./components/${name}`] = exportConfig;
});

// 合并并写入
pkg.exports = {
  ...baseExports,
  ...componentExports
};

fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`\x1b[32m✓\x1b[0m Successfully generated exports for ${components.length} components.`);
