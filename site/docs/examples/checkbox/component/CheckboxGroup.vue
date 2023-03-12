<template>
    <div style="margin-bottom: 10px">
        checkedList：<a-tag type="info" v-for="item in checkedList" :key="item">选项 {{ item }}
        </a-tag>
    </div>
    <a-checkbox-group v-model="checkedList" :options="options"></a-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const checkedList = ref<Array<any>>([1, 2]);
const options = ref([
    {
        label: "选项一",
        value: 1,
    },
    {
        label: "选项二",
        value: 2,
    },
    {
        label: "选项三",
        value: 3,
        disabled: true
    },
    {
        label: "选项四",
        value: 4,
    },
    {
        label: "选项五",
        value: 5,
    },
]);
</script>
