<template>
  <div class="demo-space">
    <AmuButton type="primary">Primary</AmuButton>
    <AmuButton type="default">default</AmuButton>
    <AmuButton type="dashed">Dashed</AmuButton>
    <AmuButton type="outline">Outline</AmuButton>
    <AmuButton type="text">Text</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui'
</script>

<style scoped>
.demo-space {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
