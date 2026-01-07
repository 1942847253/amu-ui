<template>
  <div class="demo-loading">
    <AmuButton type="primary" @click="openLoading">Loading then Success</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const openLoading = () => {
  const { id } = AmuMessage.loading('Action in progress...')
  
  setTimeout(() => {
    AmuMessage.success({
      id,
      message: 'Action finished!',
      duration: 3000
    })
  }, 2000)
}
</script>
