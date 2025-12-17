<template>
  <div class="icon-list">
    <div 
      v-for="item in iconList" 
      :key="item.name"
      class="icon-item"
      @click="copyName(item.name)"
    >
      <AmuIcon :size="32">
        <component :is="item.component" />
      </AmuIcon>
      <span class="icon-name">{{ item.name.split('Icon')[1] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import * as icons from '@amu-ui/icons'
import type { Component } from 'vue'

const iconList = Object.entries(icons)
  .filter(([key]) => key.startsWith('Icon'))
  .map(([name, component]) => ({
    name,
    component: component as Component
  }))

const copyName = (name: string) => {
  navigator.clipboard.writeText(`<${name} />`)
  // You might want to add a toast notification here
}
</script>

<style scoped>
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid var(--amu-border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  background-color: var(--amu-bg-color-hover);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: var(--amu-text-color-secondary);
}
</style>
