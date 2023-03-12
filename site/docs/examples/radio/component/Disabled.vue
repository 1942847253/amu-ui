<template>
    <a-radio-group v-model="checked1" :options="options1"></a-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(2)

const options1 = ref([
    {
        label: "选项 一",
        value: 1,
        disabled:true
    },
    {
        label: "选项 二",
        value: 2,
        disabled: true
    },

]);

</script>

