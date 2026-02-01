<template>
  <AmuCascader :options="options" disabled placeholder="不可选择" />
</template>

<script setup lang="ts">
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'
</script>
