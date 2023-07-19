

<script setup>
import Basic from './component/Basic.vue'
import bgColor from './component/bgColor.vue'
</script>

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。
<p></p>
Tooltip为自定义指令形式的组件，在指定组件上使用v-tooltip即可

## 基础用法

提供四个方向：`top`、`left`、`right`、`bottom`

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div >
    <a-button v-tooltip.top="`top prompts info`" type="primary">top</a-button>
    <a-button v-tooltip.left="`left prompts info`" type="primary">left</a-button>
    <a-button v-tooltip.bottom="`bottom prompts info`" type="primary">bottom</a-button>
    <a-button v-tooltip.right="`right prompts info`" type="primary">right</a-button>
  </div>
</template>
```
</details>

## 自定义背景色

你可以使用 `bgColor` 属性来自定义背景色

<div class="example">
 <bgColor/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
 <a-button v-tooltip="{ text: 'tip-default', bgColor: '#dcdcdc' }">default</a-button>
  <a-button v-tooltip="{ text: 'tip-primary', bgColor: '#0468dc' }" type="primary">primary</a-button>
  <a-button v-tooltip="{ text: 'tip-success', bgColor: '#18a058' }" type="success">success</a-button>
  <a-button v-tooltip="{ text: 'tip-warning', bgColor: '#d69800' }" type="warning">warning</a-button>
  <a-button v-tooltip="{ text: 'tip-danger', bgColor: '#e53935' }" type="danger">danger</a-button>
  <a-button v-tooltip="{ text: 'tip-info', bgColor: '#3f5e7de0' }" type="info">info</a-button>
</template>
```

</details>