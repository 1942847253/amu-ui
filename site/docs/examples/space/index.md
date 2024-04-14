<script setup>
import Basic from './component/Basic.vue'
import CustomSize from './component/CustomSize.vue'
import Column from './component/Column.vue'
import Size from './component/Size.vue'
</script>

# Space 间距

设置组件之间的间距

## 基础用法

间距组件的基本用法。
使用 `size` 在设置间距大小, 默认为 `small` ,也可设定为数字值

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 垂直布局

将 `direction` 设置为 `column` 即可实现垂直布局 , 背后实际上是利用了 flex-direction 来控制.

<div class="example">
 <Column/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace direction="column" align="center" style="width: 400px;">
    <AButton full>Default</AButton>
    <AButton full type="primary">Primary</AButton>
    <AButton full type="error">Error</AButton>
    <AButton full type="warning">Warning</AButton>
    <AButton full type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 控制间距的大小

通过调整 size 的值来控制间距的大小

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 `8px`、`12px` 和 `16px` 的间距。 默认的间距大小为 `small`，也就是 `8px`。

您也可以通过自定义的 `size` 来控制大小， 参见下一个部分。

<div class="example">
 <Size/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASelect v-model="size" :options="options"></ASelect>
  <ASpace align="center" style="margin-top: 20px;" :size="size">
    <span>{{ size }}:</span>
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const size = ref("small");

const options = [
  {
    text: "Small",
    value: "small",
  },
  {
    text: "Default",
    value: "default",
  },
  {
    text: "Large",
    value: "large",
  },
];
</script>
```

</details>

## 自定义 Size

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小 (数值类型) 来设置。

<div class="example">
 <CustomSize/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## Space API

| 属性名     | 说明           | 类型                                   | 默认值     |
| ---------- | -------------- | -------------------------------------- | ---------- |
| size       | 间隔大小       | `string / number`                      | small      |
| direction  | 间距方向       | `'vertical' / 'horizontal'`            | horizontal |
| align      | 对齐方式       | `'start' / 'end' / 'end' / 'baseline'` | start      |
