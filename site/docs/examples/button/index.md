

<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
import Loading from './component/Loading.vue'
</script>

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 来定义按钮的样式。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div>
    <a-button>default</a-button>
    <a-button type="primary">primary</a-button>
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">error</a-button>
    <a-button type="info">info</a-button>
  </div>
</template>
<script lang="ts" setup>
import { YButton } from "amu-ui";
</script>
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
