<template>
  <AmuCascader
    v-model="value"
    :options="options"
    expand-trigger="hover"
    placeholder="悬停展开"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'

const value = ref<string[]>([])
</script>
