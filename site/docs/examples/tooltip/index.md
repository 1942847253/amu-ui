

<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
import Loading from './component/Loading.vue'
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

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

<div class="example">
 <Disabled/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-button disabled>default</a-button>
  <a-button disabled type="primary">primary</a-button>
  <a-button disabled type="success">success</a-button>
  <a-button disabled type="warning">warning</a-button>
  <a-button disabled type="danger">error</a-button>
  <a-button disabled type="info">info</a-button>
</template>
```

</details>

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 true 来显示加载中状态。

<div class="example">
 <Loading/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-button disabled>default</a-button>
  <a-button disabled type="primary">primary</a-button>
  <a-button disabled type="success">success</a-button>
  <a-button disabled type="warning">warning</a-button>
  <a-button disabled type="danger">error</a-button>
  <a-button disabled type="info">info</a-button>
</template>
```

</details>
