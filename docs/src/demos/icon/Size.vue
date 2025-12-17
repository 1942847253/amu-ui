<template>
  <div class="icon-demo">
    <AmuIcon :size="16">
      <IconSearch />
    </AmuIcon>
    <AmuIcon :size="24">
      <IconSearch />
    </AmuIcon>
    <AmuIcon :size="32">
      <IconSearch />
    </AmuIcon>
    <AmuIcon size="48px">
      <IconSearch />
    </AmuIcon>
  </div>
</template>

<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import { IconSearch } from '@amu-ui/icons'
</script>

<style scoped>
.icon-demo {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
