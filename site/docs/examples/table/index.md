<script setup>
import Basic from './component/Basic.vue'
import Border from './component/border.vue'
import SelfDefined from './component/SelfDefined.vue'

</script>

# Table 表格

用于展示多条结构类似的数据

## 基础用法

基础的表格展示用法。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-table :tableData="tableData.tBody" :tableColumn="tableData.tHead">
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
    },
    {
      key: "chinese",
      text: "语文",
      editable: false,
    },
    {
      key: "math",
      text: "数学",
      editable: false,
    },
    {
      key: "english",
      text: "英语",
      editable: false,
    },
    // {
    //     key: "operation",
    //     text: "操作",
    // },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
}) as any;
</script>
```

</details>

## 带边框的表格

默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `border` 属性，把该属性设置为 true 即可启用。

<div class="example">
 <Border/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-table border :tableData="tableData.tBody" :tableColumn="tableData.tHead">
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
    },
    {
      key: "chinese",
      text: "语文",
      editable: false,
    },
    {
      key: "math",
      text: "数学",
      editable: false,
    },
    {
      key: "english",
      text: "英语",
      editable: false,
    },
    // {
    //     key: "operation",
    //     text: "操作",
    // },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
}) as any;
</script>
```

</details>


## 自定义表格内容

可以通过插槽嵌入自定义的组件

<div class="example">
 <SelfDefined/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-table border :tableData="tableData.tBody" :tableColumn="tableData.tHead">
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
    },
    {
      key: "chinese",
      text: "语文",
      editable: false,
    },
    {
      key: "math",
      text: "数学",
      editable: false,
    },
    {
      key: "english",
      text: "英语",
      editable: false,
    },
    // {
    //     key: "operation",
    //     text: "操作",
    // },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
}) as any;
</script>
```

</details>
