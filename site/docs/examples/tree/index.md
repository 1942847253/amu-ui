<script setup>
import Basic from './component/Basic.vue'
import Checked from './component/Checked.vue'
</script>

# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-tree :data="treeData" @node-click="handle" @checked="checked"></a-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const treeData = ref([
  {
    key: 1,
    title: "一级机构部门",
    children: [
      {
        key: 90001,
        title: "测试机构111",
        children: [
          {
            key: 90019,
            title: "测试机构111-2",
          },
          {
            key: 90025,
            title: "机构机构",
            children: [
              {
                key: 90026,
                title: "机构机构-2",
              },
            ],
          },
        ],
      },
      {
        key: 90037,
        title: "另一个机构部门",
      },
    ],
  },
  {
    key: 2,
    title: "小卖部总舵",
    children: [
      {
        key: 90037,
        title: "小卖部河边分部",
      },
    ],
  },
]);

const handle = (node) => {
  console.log("点击节点 Data : ", node);
};

const checked = (item) => {
  console.log(item);
};
</script>

<style></style>
```

</details>

## 可选择

适用于需要选择层级时使用。

<div class="example">
 <Checked />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-tree
    :isSelect="isSelect"
    :data="treeData"
    @node-click="handle"
    @checked="checked"
  ></a-tree>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isSelect = ref(true);
const treeData = ref([
  {
    key: 1,
    title: "一级机构部门",
    children: [
      {
        key: 90001,
        title: "测试机构111",
        children: [
          {
            key: 90019,
            title: "测试机构111-2",
          },
          {
            key: 90025,
            title: "机构机构",
            children: [
              {
                key: 90026,
                title: "机构机构-2",
              },
            ],
          },
        ],
      },
      {
        key: 90037,
        title: "另一个机构部门",
      },
    ],
  },
  {
    key: 2,
    title: "小卖部总舵",
    children: [
      {
        key: 90037,
        title: "小卖部河边分部",
      },
    ],
  },
]);

const handle = (node) => {
  console.log("点击节点 Data : ", node);
};

const checked = (item) => {
  console.log(item);
};
</script>

<style></style>
```

</details>

## Select API

| 属性名 | 说明              | 类型  | 默认值 |
| ------ | ----------------- | ----- | ------ |
| data   | tree 绑定树型结构 | array | —      |

## options Attributes

| 属性名   | 说明               | 类型   | 默认值 |
| -------- | ------------------ | ------ | ------ |
| key      | 树型结构的唯一 key | number | —      |
| label    | 显示标题           | string | —      |
| children | 树形结构的子项     | object | —      |

## Select Events

| 事件名     | 说明                 | 回调参数              |
| ---------- | -------------------- | --------------------- |
| node-click | 点击当前节点时触发   | val，当前点击的节点值 |
| checked    | 选中或取消节点时触发 | val，当前选中的节点值 |
