<template>
  <div class="demo-shape">
    <div class="demo-row">
      <AmuButton>矩形按钮</AmuButton>
      <AmuButton type="primary">Primary</AmuButton>
      <AmuButton type="outline">Outline</AmuButton>
    </div>
    
    <div class="demo-row">
      <AmuButton shape="circle">+</AmuButton>
      <AmuButton shape="circle" type="primary">+</AmuButton>
      <AmuButton shape="circle" type="outline">×</AmuButton>
    </div>
    
    <div class="demo-row">
      <AmuButton shape="round">全圆角</AmuButton>
      <AmuButton shape="round" type="primary">Primary</AmuButton>
      <AmuButton shape="round" type="outline">Outline</AmuButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui'
</script>

<style scoped>
.demo-shape {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-row h4 {
  margin: 0;
  min-width: 120px;
  font-size: 14px;
  color: var(--amu-color-text-default);
}
</style>
