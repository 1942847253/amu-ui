<script setup>
import Basic from './component/Basic.vue'
import Closeable from './component/Closeable.vue'
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
  <a-tree
    :data="treeData"
    @node-click="handle"
    @checked="checked"
  ></a-tree>
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
 <Closeable />
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
