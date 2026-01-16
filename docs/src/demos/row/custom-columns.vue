<template>
  <div class="demo-custom-columns">
    <p>5 列栅格系统</p>
    <p>通过 columns 属性自定义列数。</p>
    
    <AmuRow :columns="5" :gutter="10">
      <AmuCol :span="1" v-for="i in 5" :key="i">
        <div class="grid-content amu-bg-primary">{{ i }}/5</div>
      </AmuCol>
    </AmuRow>

    <p style="margin-top: 20px;">16 列栅格系统</p>
    <AmuRow :columns="16" :gutter="10">
      <AmuCol :span="4"><div class="grid-content amu-bg-primary">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content amu-bg-light">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content amu-bg-primary">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content amu-bg-light">4/16</div></AmuCol>
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
  margin-bottom: 20px;
}
.amu-bg-primary {
  background: var(--amu-color-primary);
}
.amu-bg-light {
  background: var(--amu-color-primary-hover);
}
</style>
