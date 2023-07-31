<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
</script>

# Radio 单选框

在一组备选项中进行单选。

## 基础用法

一般为一组数据中单选某个数据，如需选择多个选项推荐使用 Checkbox 多选框

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-radio-group v-model="checked1" :options="options1"></a-radio-group>
  <a-radio-group v-model="checked2" :options="options2"></a-radio-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const checked1 = ref(2);
const checked2 = ref(3);

const options1 = ref([
  {
    label: "选项 A",
    value: 1,
  },
  {
    label: "选项 B",
    value: 2,
  },
]);
const options2 = ref([
  {
    label: "选项 C",
    value: 3,
    disabled: true,
  },
  {
    label: "选项 D",
    value: 4,
    disabled: true,
  },
]);
</script>
```

</details>

## 禁用状态

单选框不可用状态。
设置 `disabled` 属性即可。

<div class="example">
 <Disabled/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-radio-group v-model="checked1" :options="options1"></a-radio-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const checked1 = ref(2);

const options1 = ref([
  {
    label: "选项 一",
    value: 1,
    disabled: true,
  },
  {
    label: "选项 二",
    value: 2,
    disabled: true,
  },
]);
</script>
```

</details>

## Radio API

| 属性名  | 说明           | 类型   | 默认值 |
| ------- | -------------- | ------ | ------ |
| v-model | radio 绑定的值 | number | —      |
| options | 传入的选项数组 | array  | —      |

## Option Attributes

| 属性名   | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | number        | —      |
| label    | 选项的标签     | string/number | —      |
| disabled | 是否禁用该选项 | boolean       | —      |

<style>
  table td {
      width:200px
  }
</style>
