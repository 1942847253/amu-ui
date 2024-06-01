# 使用 Amu-UI

本节将介绍如何在项目中使用 Amu-UI

## 引入主题文件
```js
import 'amu-ui/es/style.css'
```
## 按需引入
```vue
<template>
  <a-button>按钮</a-button>
</template>

<script setup>
import { AButton } from 'amu-ui'
</script>
```

## 全局引入
```js
import AmuUI from 'amu-ui'
import 'amu-ui/es/style.css'
const app = createApp(App);
app.use(AmuUI);
app.mount("#app");
```
## 全局组件类型提示
```json
{
  "compilerOptions": {
     "types":["amu-ui/es/src/components.d.ts"],
  }
}
```