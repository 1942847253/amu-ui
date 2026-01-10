<template>
    <AmuSpace direction="vertical">
        <AmuInputNumber v-model="num1" status="error" />
        <AmuInputNumber v-model="num2" status="warning" />
        <AmuInputNumber v-model="num3" status="success" />
    </AmuSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuInputNumber } from 'amu-ui/input-number'
import { AmuSpace } from 'amu-ui'

const num1 = ref(1)
const num2 = ref(2)
const num3 = ref(3)
</script>
