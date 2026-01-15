<template>
  <div class="demo-gutter">
    <AmuRow :gutter="20">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple" /></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple" /></AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.grid-content {
  min-height: 36px;
  background: #d3dce6;
}
</style>
