# 使用 Amu-UI

本节将介绍如何在项目中使用 Amu-UI

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
const app = createApp(App);
app.use(AmuUI);
app.mount("#app");
```