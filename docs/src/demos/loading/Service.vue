<template>
  <amu-button @click="openFullScreen">Full Screen Loading</amu-button>
</template>

<script setup lang="ts">
import { AmuLoadingService } from 'amu-ui/loading'
import { AmuButton } from 'amu-ui/button'

const openFullScreen = () => {
  const loading = AmuLoadingService({
    lock: true,
    text: 'Loading',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>
