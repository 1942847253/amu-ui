<template>
  <ALoading v-model="showLoading" title="please loading...">
    <a-table :tableData="tableData.tBody" :tableColumn="tableData.tHead">
    </a-table>
  </ALoading>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showLoading = ref(true);

const tableData = ({
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
