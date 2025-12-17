<template>
  <div class="icon-demo">
    <AmuIcon spin>
      <IconLoader />
    </AmuIcon>
    <AmuIcon spin>
     <IconClock />
    </AmuIcon>
  </div>
</template>

<script setup lang="ts">
import { AmuIcon } from 'amu-ui'
import { IconLoader, IconClock } from '@amu-ui/icons'
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  font-size: 24px;
}
</style>
