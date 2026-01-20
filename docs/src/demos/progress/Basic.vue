<template>
  <div style="width: 450px">
    <div class="demo-progress-block">
      <div class="demo-progress-label">默认样式</div>
      <amu-progress :percentage="30" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">100%</div>
      <amu-progress :percentage="100" :color="successColor" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">进度完成</div>
      <amu-progress :percentage="100" status="success" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">进度状态发生重大错误</div>
      <amu-progress :percentage="50" status="exception" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">进度被中断</div>
      <amu-progress :percentage="50" status="warning" />
    </div>
    
    <div class="demo-progress-block">
      <div class="demo-progress-label">渐变色</div>
      <amu-progress :percentage="60" :color="gradientColor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AmuProgress } from 'amu-ui'

const successColor = 'var(--amu-color-status-success)'

const gradientColor = (percentage: number) => {
  return 'linear-gradient(to right, #409eff, #5cb87a)'
}
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
