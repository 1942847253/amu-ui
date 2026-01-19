<template>
  <amu-card title="Workspace Apps" class="grid-card-demo">
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">📊</div>
      <div class="app-name">Analytics</div>
    </amu-card-grid>
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">👥</div>
      <div class="app-name">Users</div>
    </amu-card-grid>
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">📦</div>
      <div class="app-name">Inventory</div>
    </amu-card-grid>
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">⚙️</div>
      <div class="app-name">Settings</div>
    </amu-card-grid>
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">🔔</div>
      <div class="app-name">Alerts</div>
    </amu-card-grid>
    <amu-card-grid class="grid-item" style="width: 25%">
      <div class="app-icon">📝</div>
      <div class="app-name">Reports</div>
    </amu-card-grid>
  </amu-card>
</template>

<script lang="ts" setup>
import { AmuCard, AmuCardGrid } from 'amu-ui'
</script>

<style scoped>
.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 120px;
  cursor: pointer;
}

.app-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.app-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-color-text);
}
</style>
