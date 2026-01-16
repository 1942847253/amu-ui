<template>
  <div class="demo-offset">
    <AmuRow :gutter="20">
      <AmuCol :span="6"><div class="grid-content amu-bg-primary">col-6</div></AmuCol>
      <AmuCol :span="6" :offset="6"><div class="grid-content amu-bg-primary">col-6 偏移 6</div></AmuCol>
    </AmuRow>
    <AmuRow :gutter="20">
      <AmuCol :span="6" :offset="6"><div class="grid-content amu-bg-primary">col-6 偏移 6</div></AmuCol>
      <AmuCol :span="6" :offset="6"><div class="grid-content amu-bg-primary">col-6 偏移 6</div></AmuCol>
    </AmuRow>
    <AmuRow :gutter="20">
      <AmuCol :span="12" :offset="6"><div class="grid-content amu-bg-primary">col-12 偏移 6</div></AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.amu-row {
  margin-bottom: 20px;
}
.amu-row:last-child {
  margin-bottom: 0;
}
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
</style>
