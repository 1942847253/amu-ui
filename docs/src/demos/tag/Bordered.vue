<template>
  <div class="demo-tag">
    <amu-tag bordered>Default</amu-tag>
    <amu-tag type="primary" bordered>Primary</amu-tag>
    <amu-tag type="success" bordered>Success</amu-tag>
    <amu-tag type="warning" bordered>Warning</amu-tag>
    <amu-tag type="danger" bordered>Danger</amu-tag>
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
