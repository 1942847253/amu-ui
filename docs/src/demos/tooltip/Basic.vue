<template>
  <AmuTooltip content="这是提示文字">
    <template #reference>
      <AmuButton>悬停查看</AmuButton>
    </template>
  </AmuTooltip>
</template>

<script setup lang="ts">
import { AmuTooltip } from 'amu-ui/tooltip'
import { AmuButton } from 'amu-ui/button'
</script>
