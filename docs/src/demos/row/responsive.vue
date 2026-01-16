<template>
  <AmuRow :gutter="10">
    <AmuCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content amu-bg-primary" />
    </AmuCol>
    <AmuCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content amu-bg-light" />
    </AmuCol>
    <AmuCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content amu-bg-primary" />
    </AmuCol>
    <AmuCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content amu-bg-light" />
    </AmuCol>
  </AmuRow>
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
.amu-bg-light {
  background: var(--amu-color-primary-hover);
}
</style>
