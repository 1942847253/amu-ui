<template>
  <div class="demo-row">
    <AmuRow>
      <AmuCol :span="24"><div class="grid-content amu-bg-dark">col-24</div></AmuCol>
    </AmuRow>
    <AmuRow>
      <AmuCol :span="12"><div class="grid-content amu-bg-primary">col-12</div></AmuCol>
      <AmuCol :span="12"><div class="grid-content amu-bg-light">col-12</div></AmuCol>
    </AmuRow>
    <AmuRow>
      <AmuCol :span="8"><div class="grid-content amu-bg-primary">col-8</div></AmuCol>
      <AmuCol :span="8"><div class="grid-content amu-bg-light">col-8</div></AmuCol>
      <AmuCol :span="8"><div class="grid-content amu-bg-primary">col-8</div></AmuCol>
    </AmuRow>
    <AmuRow>
      <AmuCol :span="6"><div class="grid-content amu-bg-primary">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-primary">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content amu-bg-light">col-6</div></AmuCol>
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
.amu-col {
  border-radius: 0;
}
.grid-content {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--amu-color-on-primary);
}
.amu-bg-dark {
  background: var(--amu-color-primary-active);
}
.amu-bg-primary {
  background: var(--amu-color-primary);
}
.amu-bg-light {
  background: var(--amu-color-primary-hover);
}
</style>
