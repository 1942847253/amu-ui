<template>
  <amu-space direction="vertical" fill style="width: 350px">
    <amu-progress :percentage="50" :indeterminate="true" />
    <amu-progress :percentage="100" :format="format" />
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuProgress, AmuSpace } from 'amu-ui'

const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>
