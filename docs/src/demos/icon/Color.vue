<template>
  <div class="icon-demo">
    <AmuIcon color="red">
      <IconCheckCircle />
    </AmuIcon>
    <AmuIcon color="#1890ff">
      <IconInfo />
    </AmuIcon>
    <AmuIcon color="var(--amu-color-warning)">
      <IconWarning />
    </AmuIcon>
  </div>
</template>

<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import { IconInfo } from '@amu-ui/icons'
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  font-size: 24px;
}
</style>
