<template>
  <AmuSpace direction="vertical">
    <AmuCascader v-model="value1" :options="options" size="small" placeholder="小尺寸" />
    <AmuCascader v-model="value2" :options="options" placeholder="默认尺寸" />
    <AmuCascader v-model="value3" :options="options" size="large" placeholder="大尺寸" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { AmuSpace } from 'amu-ui/space'
import { demoOptions as options } from './options'

const value1 = ref<string[]>([])
const value2 = ref<string[]>([])
const value3 = ref<string[]>([])
</script>
