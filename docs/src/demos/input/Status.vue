<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value1" status="error" placeholder="错误状态" />
    <AmuInput v-model="value2" status="warning" placeholder="警告状态" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
</script>
