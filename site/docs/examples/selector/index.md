<script setup>
import Basic from './component/Basic.vue'
import Search from './component/Search.vue'
</script>

# Select 选择器

常用的操作按钮。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的`option` 的 value 属性值

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-select
    v-model="value"
    :options="options"
    @setItemValue="setItemValue"
    placeholder="请选择一个选项"
  >
  </a-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref();
const options = ref([
  {
    value: 1,
    text: "选项 一",
  },
  {
    value: 2,
    text: "选项 二",
  },
  {
    value: 3,
    text: "选项 三",
  },
  {
    value: 4,
    text: "选项 四",
  },
  {
    value: 5,
    text: "选项 五",
  },
]);

const setItemValue = (val: any) => {
  console.log(val);
};
</script>
```

</details>

## 带搜索的选择器

选项过多时可以使用 `isSearch` 开启搜索模式 输入关键字自动检索选项

<div class="example">
 <Search/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-select
    v-model="value"
    isSearch
    :options="options"
    placeholder="请选择一个小可爱"
  >
  </a-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref();
const options = ref([
  {
    value: 1,
    text: "Yjj",
  },
  {
    value: 2,
    text: "Big龙",
  },
  {
    value: 3,
    text: "嘿毛",
  },
  {
    value: 4,
    text: "嫖瓜",
  },
  {
    value: 5,
    text: "吊毛",
  },
  {
    value: 6,
    text: "吴彦祖",
  },
  {
    value: 7,
    text: "陈冠希",
  },
  {
    value: 8,
    text: "林俊杰",
  },
  {
    value: 9,
    text: "周杰伦",
  },
  {
    value: 10,
    text: "王力宏",
  },
]);
</script>
```

</details>

## Select API

| 属性名   | 说明             | 类型    | 默认值 |
| -------- | ---------------- | ------- | ------ |
| v-model  | radio 绑定的值   | number  | —      |
| options  | 传入的选项数组   | array   | —      |
| isSearch | 是否为搜索选择器 | boolean | false  |

## options Attributes

| 属性名   | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | number        | —      |
| label    | 选项的标签     | string/number | —      |
| disabled | 是否禁用该选项 | boolean       | —      |

## Select Events

| 事件名       | 说明                 | 回调参数          |
| ------------ | -------------------- | ----------------- |
| setItemValue | 当选中值发生变化时触发 | val，目前的选中值 |
