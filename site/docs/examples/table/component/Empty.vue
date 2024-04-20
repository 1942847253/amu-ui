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
