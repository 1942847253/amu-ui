<template>
  <div class="demo-tag">
    <amu-tag size="small">Small</amu-tag>
    <amu-tag size="default">Default</amu-tag>
    <amu-tag size="large">Large</amu-tag>
  </div>
</template>

<script setup lang="ts">
import { AmuTag } from 'amu-ui'
</script>

<style scoped>
.demo-tag {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
