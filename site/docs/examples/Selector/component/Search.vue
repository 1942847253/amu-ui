<template>
    <a-select v-model="value" isSearch :options="options" placeholder="请选择一个小可爱">
    </a-select>
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
