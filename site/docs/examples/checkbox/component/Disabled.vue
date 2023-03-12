<template>
    <a-checkbox v-model="checked1" disabled>Disabled 1</a-checkbox>
    <a-checkbox v-model="checked2" disabled>Disabled 2</a-checkbox>
    <a-checkbox>Normal</a-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
