<template>
  <amu-space direction="vertical" fill>
    <amu-switch v-model="loading" />
    <amu-card :loading="loading" title="Card Title" style="width: 300px">
      Whatever content
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuCard, AmuSpace, AmuSwitch } from 'amu-ui'

const loading = ref(true)
</script>
