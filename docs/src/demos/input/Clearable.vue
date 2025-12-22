<template>
  <AmuInput v-model="value" placeholder="请输入" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput } from 'amu-ui'

const value = ref('你好 Amu UI')
</script>
