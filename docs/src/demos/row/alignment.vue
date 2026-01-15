<template>
  <div class="demo-alignment">
    <p>对齐方式：居中</p>
    <AmuRow justify="center" class="row-bg">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
    </AmuRow>
    
    <p>对齐方式：尾部对齐</p>
    <AmuRow justify="end" class="row-bg">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
    </AmuRow>

    <p>对齐方式：两端对齐</p>
    <AmuRow justify="space-between" class="row-bg">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
    </AmuRow>

    <p>对齐方式：环绕对齐</p>
    <AmuRow justify="space-around" class="row-bg">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
    </AmuRow>

    <p>对齐方式：均匀对齐</p>
    <AmuRow justify="space-evenly" class="row-bg">
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple-light">col-6</div></AmuCol>
      <AmuCol :span="6"><div class="grid-content ep-bg-purple">col-6</div></AmuCol>
    </AmuRow>
  </div>
</template>

<script setup lang="ts">
import { AmuRow, AmuCol } from 'amu-ui'
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
  margin-bottom: 20px;
}
.grid-content {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
  margin-bottom: 10px;
}
</style>
