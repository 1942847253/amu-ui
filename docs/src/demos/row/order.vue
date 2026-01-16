<template>
  <div class="demo-order">
    <AmuRow>
      <AmuCol :span="6" :order="4"><div class="grid-content amu-bg-primary">1 (排序 4)</div></AmuCol>
      <AmuCol :span="6" :order="3"><div class="grid-content amu-bg-light">2 (排序 3)</div></AmuCol>
      <AmuCol :span="6" :order="2"><div class="grid-content amu-bg-primary">3 (排序 2)</div></AmuCol>
      <AmuCol :span="6" :order="1"><div class="grid-content amu-bg-light">4 (排序 1)</div></AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.grid-content {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--amu-color-on-primary);
}
.amu-bg-primary {
  background: var(--amu-color-primary);
}
.amu-bg-light {
  background: var(--amu-color-primary-hover);
}
</style>
