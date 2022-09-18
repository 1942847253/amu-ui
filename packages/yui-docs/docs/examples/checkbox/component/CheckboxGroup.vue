<template>
    <div style="margin-bottom: 10px">
        checkedList：<y-tag type="info" v-for="item in checkedList" :key="item">选项 {{ item }}
        </y-tag>
    </div>
    <y-checkbox-group v-model="checkedList" :options="options"></y-checkbox-group>
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
