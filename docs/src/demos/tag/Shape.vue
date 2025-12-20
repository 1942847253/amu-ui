<template>
  <div class="demo-tag">
    <amu-tag shape="square">Square</amu-tag>
    <amu-tag shape="round">Round</amu-tag>
    <amu-tag shape="mark">Mark</amu-tag>
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
