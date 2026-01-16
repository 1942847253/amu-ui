<template>
  <div class="demo-gutter">
    <AmuRow :gutter="20">
      <AmuCol :span="6"><div class="grid-content amu-bg-primary" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-primary" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-primary" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-primary" /></AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.grid-content {
  min-height: 36px;
}
.amu-bg-primary {
  background: var(--amu-color-primary);
}
</style>
