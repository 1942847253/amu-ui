<script setup>
import Basic from './component/Basic.vue'
import Empty from './component/Empty.vue'
import Border from './component/Border.vue'
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
    <a-table class="vp-raw" :data="tableData.tBody" :columns="tableData.tHead">
    </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref({
    tHead: [
        {
            key: "id",
            title: "学号",
        },
        {
            key: "name",
            title: "姓名",
        },
        {
            key: "age",
            title: "年龄"
        },
        {
            key: "chinese",
            title: "语文",
        },
        {
            key: "math",
            title: "数学",
        },
        {
            key: "english",
            title: "英语",
        },
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

## 空表格
<div class="example">
 <Empty/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-table class="vp-raw" :data="[]" :columns="tableData.tHead">
    </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref({
    tHead: [
        {
            key: "id",
            title: "学号",
        },
        {
            key: "name",
            title: "姓名",
        },
        {
            key: "age",
            title: "年龄"
        },
        {
            key: "chinese",
            title: "语文",
        },
        {
            key: "math",
            title: "数学",
        },
        {
            key: "english",
            title: "英语",
        },
    ]
}) as any;
</script>
```

</details>

## 带边框的表格

默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `single-line` 属性，把该属性设置为 `false` 即可启用。

<div class="example">
 <Border/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-table  class="vp-raw" :single-line="false"  :data="tableData.tBody" :columns="tableData.tHead">
    </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref({
    tHead: [
        {
            key: "id",
            title: "学号",
        },
        {
            key: "name",
            title: "姓名",
        },
        {
            key: "age",
            title: "年龄"
        },
        {
            key: "chinese",
            title: "语文",
        },
        {
            key: "math",
            title: "数学",
        },
        {
            key: "english",
            title: "英语",
        },
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
  <ATable class="vp-raw" :data="tableData.tBody" :columns="tableData.tHead">
  </ATable>
</template>

<script lang="ts" setup>
import { AMessageBox } from "amu-ui";
import { ref, h } from "vue";
import { AButton, AMessage } from "amu-ui";

const tableData = ref({
  tHead: [
    {
      key: "id",
      title: "学号",

    },
    {
      key: "name",
      title: "姓名",

      render(row) {
        return h(
          AButton,
          {
            size: 'small',
            type: 'success',
          },
          {
            default: () => row.name
          }
        )
      }
    },
    {
      key: "age",
      title: "年龄",
    },
    {
      key: "chinese",
      title: "语文",
    },
    {
      key: "math",
      title: "数学",
    },

    {
      key: "english",
      title: "英语",
    },
    {
      key: "operation",
      title: "操作",
      width: 100,
      render(row) {
        return h(
          AButton,
          {
            size: 'small',
            type: 'info',
            onClick: () => play(row)
          },
          {
            default: () => 'Play'
          }
        )
      }
    },
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
    }
  ]
}) as any;

const play = (row) => {
  AMessage.message({
    message: row
  })
}
</script>

```

</details>
