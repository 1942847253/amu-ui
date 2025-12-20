<template>
  <div class="demo-tag">
    <amu-tag>Default</amu-tag>
    <amu-tag type="primary">Primary</amu-tag>
    <amu-tag type="success">Success</amu-tag>
    <amu-tag type="warning">Warning</amu-tag>
    <amu-tag type="danger">Danger</amu-tag>
  </div>
</template>

<script setup lang="ts">
import { AmuTag } from 'amu-ui'
</script>

<style scoped>
.demo-tag {
  display: flex;
  gap: 10px;
}
</style>
