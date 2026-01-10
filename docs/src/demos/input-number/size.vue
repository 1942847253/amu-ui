<template>
    <AmuSpace direction="vertical">
        <AmuInputNumber v-model="num1" size="large" />
        <AmuInputNumber v-model="num2" />
        <AmuInputNumber v-model="num3" size="small" />
    </AmuSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuInputNumber } from 'amu-ui/input-number'
import { AmuSpace } from 'amu-ui'

const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(1)
</script>

<style scoped>
.demo-input-number .amu-input-number {
    margin-right: 10px;
}
</style>
