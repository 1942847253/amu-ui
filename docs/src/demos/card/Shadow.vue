<template>
  <amu-space direction="vertical" fill>
    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      <amu-card title="Always Shadow" shadow="always" style="width: 300px">
        Always show shadow
      </amu-card>
      <amu-card title="Hover Shadow" shadow="hover" style="width: 300px">
        Show shadow when hovering
      </amu-card>
      <amu-card title="Never Shadow" shadow="never" style="width: 300px">
        Never show shadow
      </amu-card>
    </div>
    
    <div style="margin-top: 20px;">
      <amu-card title="No Border" :bordered="false" style="width: 300px">
        Card without border
      </amu-card>
    </div>
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuCard, AmuSpace } from 'amu-ui'
</script>
