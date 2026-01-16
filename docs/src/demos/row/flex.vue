<template>
  <div class="demo-flex">
    <p>固定宽度</p>
    <AmuRow>
      <AmuCol :flex="'100px'"><div class="grid-content amu-bg-primary">100px</div></AmuCol>
      <AmuCol :flex="'auto'"><div class="grid-content amu-bg-light">自动填充</div></AmuCol>
    </AmuRow>
    
    <p>比例分配</p>
    <AmuRow>
      <AmuCol :flex="1"><div class="grid-content amu-bg-primary">1 / 3</div></AmuCol>
      <AmuCol :flex="2"><div class="grid-content amu-bg-light">2 / 3</div></AmuCol>
    </AmuRow>

    <p>混合使用</p>
    <AmuRow>
      <AmuCol :flex="'100px'"><div class="grid-content amu-bg-primary">100px</div></AmuCol>
      <AmuCol :flex="'200px'"><div class="grid-content amu-bg-light">200px</div></AmuCol>
      <AmuCol :flex="'auto'"><div class="grid-content amu-bg-primary">自动</div></AmuCol>
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
p {
  font-size: 14px;
  color: var(--amu-color-text-default);
  margin-bottom: 10px;
}
</style>
