# 快速开始

## 安装

在你的业务项目中安装：

```bash
pnpm add am-ui vue
```

> `vue` 是 peer dependency，需要由业务项目自行提供。

## 引入主题（推荐）

```ts
import 'am-ui/theme'
```

## 按需引入

```ts
import AmuButton from 'am-ui/button'
```

## 全量注册

```ts
import { createApp } from 'vue'
import AmuUI from 'am-ui'
import 'am-ui/theme'

createApp(App).use(AmuUI).mount('#app')
```

## 暗黑模式

手动暗黑：在 `html`（或任意容器）上加属性：

```html
<html data-amu-theme="dark">
```

自动暗黑：未设置 `data-amu-theme` 时会跟随系统 `prefers-color-scheme`。

## 自定义主题

通过覆盖 CSS Variables 自定义：

```css
:root {
  --amu-color-primary: #7c3aed;
  --amu-radius: 10px;
}
```
