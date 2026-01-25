<template>
  <amu-card title="Workspace Apps" class="grid-card-demo">
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconGrid /></amu-icon></div>
      <div class="app-name">Analytics</div>
    </amu-card-grid>
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconUser /></amu-icon></div>
      <div class="app-name">Users</div>
    </amu-card-grid>
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconArchive /></amu-icon></div>
      <div class="app-name">Inventory</div>
    </amu-card-grid>
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconSettings /></amu-icon></div>
      <div class="app-name">Settings</div>
    </amu-card-grid>
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconBell /></amu-icon></div>
      <div class="app-name">Alerts</div>
    </amu-card-grid>
    <amu-card-grid hoverable class="grid-item" style="width: 25%">
      <div class="app-icon"><amu-icon :size="34"><IconFile /></amu-icon></div>
      <div class="app-name">Reports</div>
    </amu-card-grid>
  </amu-card>
</template>

<script lang="ts" setup>
import { AmuCard, AmuCardGrid, AmuIcon } from 'amu-ui'
import { IconGrid, IconUser, IconArchive, IconSettings, IconBell, IconFile } from '@amu-ui/icons'
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
  margin-bottom: 8px;
  color: var(--amu-color-text-caption);
}

.app-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-color-text);
}
</style>
