<template>
  <amu-space direction="vertical" fill>
    <div style="margin-bottom: 16px">
        <amu-switch v-model="loading" />
        <span style="margin-left: 8px">Loading: {{ loading }}</span>
    </div>
    
    <amu-card :loading="loading" title="Card Title" style="width: 360px">
      <template #extra>More</template>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuCard, AmuSpace, AmuSwitch } from 'amu-ui'

const loading = ref(true)
</script>
