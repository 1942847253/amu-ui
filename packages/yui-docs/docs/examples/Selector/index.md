<script setup>
import Basic from './component/Basic.vue'
import Search from './component/Search.vue'
</script>

# Selector 选择器

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
  <y-selector v-model="value" :options="options" placeholder="请选择一个选项">
  </y-selector>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { YSelector } from "y-ui";
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
    <y-selector v-model="value" isSearch :options="options" placeholder="请选择一个小可爱">
    </y-selector>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref()
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
