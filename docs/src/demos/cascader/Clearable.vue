<template>
  <AmuCascader v-model="value" :options="options" clearable placeholder="可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'

const value = ref<string[]>(['zhejiang', 'hangzhou', 'xihu'])
</script>
