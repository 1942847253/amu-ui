<template>
  <div class="demo-custom-columns">
    <p>5 列栅格系统</p>
    <p>通过 columns 属性自定义列数。</p>
    
    <AmuRow :columns="5" :gutter="10">
      <AmuCol :span="1" v-for="i in 5" :key="i">
        <div class="grid-content ep-bg-purple">{{ i }}/5</div>
      </AmuCol>
    </AmuRow>

    <p style="margin-top: 20px;">16 列栅格系统</p>
    <AmuRow :columns="16" :gutter="10">
      <AmuCol :span="4"><div class="grid-content ep-bg-purple">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content ep-bg-purple-light">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content ep-bg-purple">4/16</div></AmuCol>
      <AmuCol :span="4"><div class="grid-content ep-bg-purple-light">4/16</div></AmuCol>
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
  color: #555;
  margin-bottom: 20px;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
</style>
