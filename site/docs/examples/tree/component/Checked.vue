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
