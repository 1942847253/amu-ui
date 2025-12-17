<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import { IconSearch } from '@amu-ui/icons'
</script>

<template>
  <div class="icon-demo">
    <AmuIcon :stroke-width="1">
      <IconSearch />
    </AmuIcon>
    <AmuIcon :stroke-width="2">
      <IconSearch />
    </AmuIcon>
    <AmuIcon :stroke-width="3">
      <IconSearch />
    </AmuIcon>
    <AmuIcon :stroke-width="4">
      <IconSearch />
    </AmuIcon>
  </div>
</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
  color: var(--amu-text-color-primary);
}
</style>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  font-size: 24px;
}
</style>
