<template>
  <amu-space direction="vertical" fill>
    <amu-switch v-model="animated" active-text="Animated" inactive-text="Static" />
    <br />
    <amu-skeleton :rows="3" :animated="animated" />
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuSkeleton, AmuSpace, AmuSwitch } from 'amu-ui'

const animated = ref(true)
</script>
