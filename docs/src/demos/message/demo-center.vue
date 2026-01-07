<template>
  <div class="demo-center">
    <AmuButton type="primary" :plain="true" @click="openCenter">Centered Text</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const openCenter = () => {
  AmuMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  })
}
</script>
