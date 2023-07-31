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
  <div style="display:flex">
    <a-button>default</a-button>
    <a-button @click="showLoading" :loading="loading" type="primary"
      >primary</a-button
    >
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">error</a-button>
    <a-button type="info">info</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const showLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
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
 <div style="dispaly:flex;line-height: 50px;">
  <a-button loading type="primary">primary</a-button>
  <a-button loading type="warning">warning</a-button>
  <a-button loading type="danger">error</a-button>
  <a-button loading type="info">info</a-button>
 </div>
</template>
```

</details>

## Button API

| 属性名   | 说明               | 类型    | 默认值 |
| -------- | ------------------ | ------- | ------ |
| size     | 尺寸               | enum    | —      |
| type     | 类型               | enum    | —      |
| loading  | 是否为加载中状态   | boolean | false  |
| disabled | 按钮是否为禁用状态 | boolean | false  |

<style>
  table td {
      width:200px
  }
</style>
