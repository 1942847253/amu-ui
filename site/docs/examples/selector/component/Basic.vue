<template>
    <a-select v-model="value" :options="options"  placeholder="请选择一个选项">
    </a-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref()
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
