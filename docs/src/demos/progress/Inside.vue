<template>
  <div style="width: 450px">
    <div class="demo-progress-block">
      <div class="demo-progress-label">默认样式</div>
      <!-- Tall stroke width to match image appearance of 'inside' text -->
      <amu-progress :text-inside="true" :stroke-width="22" :percentage="30" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">进度0-10%时数字位置出现在目前进度的右边区域</div>
      <!-- Low percentage, text should extend the bar pill -->
      <amu-progress :text-inside="true" :stroke-width="22" :percentage="5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AmuProgress } from 'amu-ui'
</script>

<style scoped>
.demo-progress-block {
  margin-bottom: 20px;
}
.demo-progress-label {
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--amu-color-text-default);
  font-weight: 500;
}
</style>
