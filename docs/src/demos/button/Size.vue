<template>
  <div class="demo-button-size">
    <AmuButton size="mini">Mini</AmuButton>
    <AmuButton size="small">Small</AmuButton>
    <AmuButton size="medium">Medium</AmuButton>
    <AmuButton size="large">Large</AmuButton>
  </div>
  <div class="demo-button-size">
    <AmuButton type="primary" size="mini">Mini</AmuButton>
    <AmuButton type="primary" size="small">Small</AmuButton>
    <AmuButton type="primary" size="medium">Medium</AmuButton>
    <AmuButton type="primary" size="large">Large</AmuButton>
  </div>
  <div class="demo-button-size">
    <AmuButton shape="round" size="mini">Mini</AmuButton>
    <AmuButton shape="round" size="small">Small</AmuButton>
    <AmuButton shape="round" size="medium">Medium</AmuButton>
    <AmuButton shape="round" size="large">Large</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from "amu-ui";
</script>

<style scoped>
.demo-button-size {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
