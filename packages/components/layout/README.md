# Layout 布局组件

协助进行页面级整体布局，提供 `Layout`、`Header`、`Sider`、`Content`、`Footer` 组件。

## 组件说明

### Layout 布局容器

- **AmuLayout**: 布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- **AmuHeader**: 顶部布局，可自定义高度。
- **AmuSider**: 侧边栏，可自定义宽度、支持折叠功能。
- **AmuContent**: 内容部分，必须放在 `Layout` 中。
- **AmuFooter**: 底部布局,可自定义高度。

## 功能特性

- ✅ **响应式布局**: 自动检测是否包含侧边栏，自动调整布局方向
- ✅ **可折叠侧边栏**: 支持手动折叠/展开，自定义折叠宽度
- ✅ **左右侧边栏**: 支持侧边栏在左侧或右侧
- ✅ **自定义尺寸**: Header、Footer 支持自定义高度，Sider 支持自定义宽度
- ✅ **自定义触发器**: 可自定义折叠按钮样式
- ✅ **嵌套布局**: 支持多层嵌套使用

## 基础用法

```vue
<template>
  <amu-layout>
    <amu-header>Header</amu-header>
    <amu-content>Content</amu-content>
    <amu-footer>Footer</amu-footer>
  </amu-layout>
</template>
```

## 带侧边栏

```vue
<template>
  <amu-layout>
    <amu-header>Header</amu-header>
    <amu-layout>
      <amu-sider width="200">Sider</amu-sider>
      <amu-content>Content</amu-content>
    </amu-layout>
    <amu-footer>Footer</amu-footer>
  </amu-layout>
</template>
```

## 可折叠侧边栏

```vue
<template>
  <amu-layout>
    <amu-sider
      v-model:collapsed="collapsed"
      collapsible
      :width="200"
      :collapsed-width="80"
    >
      Sider content
    </amu-sider>
    <amu-layout>
      <amu-header>Header</amu-header>
      <amu-content>Content</amu-content>
      <amu-footer>Footer</amu-footer>
    </amu-layout>
  </amu-layout>
</template>

<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
</script>
```

## API

### Layout Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 布局方向 | `'horizontal' \| 'vertical'` | 自动检测 |
| hasSider | 是否包含侧边栏 | `boolean` | `false` |

### Header / Footer Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 高度 | `string \| number` | - |

### Sider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度（未折叠时） | `string \| number` | `200` |
| collapsed-width | 折叠后的宽度 | `string \| number` | `80` |
| collapsed (v-model) | 是否折叠 | `boolean` | - |
| collapsible | 是否可折叠 | `boolean` | `false` |
| position | 侧边栏位置 | `'left' \| 'right'` | `'left'` |
| default-collapsed | 默认折叠状态 | `boolean` | `false` |

### Sider Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:collapsed | 折叠状态变化时触发 | `(collapsed: boolean) => void` |
| collapse | 折叠状态变化时触发（别名） | `(collapsed: boolean) => void` |

### Sider Slots

| 名称 | 说明 |
| --- | --- |
| default | 侧边栏内容 |
| trigger | 自定义折叠触发器 |
