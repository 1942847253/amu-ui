<template>
  <div class="demo-status-row">
    <AmuButton status="warning">Warning</AmuButton>
    <AmuButton status="danger">Danger</AmuButton>
    <AmuButton status="success">Success</AmuButton>
  </div>
  <div class="demo-status-row">
    <AmuButton type="outline" status="warning">Outline warning</AmuButton>
    <AmuButton type="outline" status="danger">Outline danger</AmuButton>
    <AmuButton type="outline" status="success">Outline success</AmuButton>
  </div>
  <div class="demo-status-row">
    <AmuButton type="text" status="warning">Text warning</AmuButton>
    <AmuButton type="text" status="danger">Text danger</AmuButton>
    <AmuButton type="text" status="success">Text success</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui'
</script>

<style scoped>
.demo-status-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 12px;
}
</style>
