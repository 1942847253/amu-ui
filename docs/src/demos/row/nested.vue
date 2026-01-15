<template>
  <div class="demo-nested">
    <AmuRow :gutter="20">
      <AmuCol :span="16">
        <div class="grid-content ep-bg-purple">
          <AmuRow>
            <AmuCol :span="12">
              <div class="grid-content ep-bg-purple-dark">嵌套 12</div>
            </AmuCol>
            <AmuCol :span="12">
              <div class="grid-content ep-bg-purple-light">嵌套 12</div>
            </AmuCol>
          </AmuRow>
        </div>
      </AmuCol>
      <AmuCol :span="8">
        <div class="grid-content ep-bg-purple-light">8</div>
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
}
/* Revert height for demo visual */
.grid-content {
  min-height: 36px;
}

.ep-bg-purple-dark {
  background: #99a9bf;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
</style>
