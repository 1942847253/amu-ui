<template>
  <div class="demo-nested">
    <AmuRow :gutter="20">
      <AmuCol :span="16">
        <div class="grid-content amu-bg-primary">
          <AmuRow>
            <AmuCol :span="12">
              <div class="grid-content amu-bg-dark">嵌套 12</div>
            </AmuCol>
            <AmuCol :span="12">
              <div class="grid-content amu-bg-light">嵌套 12</div>
            </AmuCol>
          </AmuRow>
        </div>
      </AmuCol>
      <AmuCol :span="8">
        <div class="grid-content amu-bg-light">8</div>
      </AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.grid-content {
  min-height: 300px; /* Ensure height to see nested content */
  padding: 10px;
  color: var(--amu-color-on-primary);
}
/* Revert height for demo visual */
.grid-content {
  min-height: 36px;
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
