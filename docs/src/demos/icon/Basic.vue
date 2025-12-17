<template>
  <div class="icon-demo">
    <AmuIcon>
      <IconSearch />
    </AmuIcon>
    <AmuIcon>
      <IconCheck />
    </AmuIcon>
  </div>
</template>

<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import { IconSearch, IconCheck } from '@amu-ui/icons'
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  font-size: 24px;
}
</style>
