<template>
  <div class="demo-tag">
    <amu-tag disabled>Disabled</amu-tag>
    <amu-tag type="primary" disabled>Disabled</amu-tag>
    <amu-tag type="success" disabled closable>Disabled</amu-tag>
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
