<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value" placeholder="请输入" />
    <AmuInput v-model="value" placeholder="请输入" disabled />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value = ref('')
</script>
