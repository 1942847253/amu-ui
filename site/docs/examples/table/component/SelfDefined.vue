<template>
  <ATable :tableData="tableData.tBody" :tableColumn="tableData.tHead">
    <template #table="{ tableColumn, tableData }">
      <a-tag type="success" v-if="tableColumn.key === 'name'">{{
        tableData.name
      }}</a-tag>
    </template>
    <template #operation="{ item, index }">                                                   
      <a-button type="info" size="small">Edit</a-button>
      <a-button
        type="danger"
        size="small"
        :disabled="false"
        @click="deleteItem(item.id)"
        >Delete</a-button
      >
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { AMessageBox } from "amu-ui";
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
    },
    {
      key: "math",
      text: "数学",
    },
    {
      key: "english",
      text: "英语",
    },
    {
      key: "operation",
      text: "操作",
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

const deleteItem = (id: any) => {
  AMessageBox({
    showCancelBtn: true,
    title: "提示",
    confirmBtnText: "确认",
    cancelBtnText: "取消",
    content: "确认删除当前学生吗？",
  }).then(() => {
    tableData.value.tBody = tableData.value.tBody.filter(
      (item: any) => item.id !== id
    );
  });
};
</script>
