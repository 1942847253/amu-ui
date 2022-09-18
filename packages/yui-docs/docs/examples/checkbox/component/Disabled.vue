<template>
    <y-checkbox v-model="checked1" disabled>Disabled 1</y-checkbox>
    <y-checkbox v-model="checked2" disabled>Disabled 2</y-checkbox>
    <y-checkbox>Normal</y-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
