<template>
  <div class="demo-tag">
    <amu-tag color="#165DFF">#165DFF</amu-tag>
    <amu-tag color="#722ED1">#722ED1</amu-tag>
    <amu-tag color="#F53F3F">#F53F3F</amu-tag>
    <amu-tag color="#00B42A">#00B42A</amu-tag>
    <amu-tag color="#FF7D00">#FF7D00</amu-tag>
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
