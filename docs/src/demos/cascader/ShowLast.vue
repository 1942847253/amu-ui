<template>
  <AmuCascader
    v-model="value"
    :options="options"
    :show-all-levels="false"
    separator=" / "
    placeholder="只显示最后一级"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'

const value = ref<string[]>([])
</script>
