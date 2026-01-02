<template>
  <AmuSpace>
    <AmuButton type="primary" @click="visible = true">Async Close</AmuButton>
  </AmuSpace>

  <AmuDialog 
    v-model="visible" 
    title="Async Close" 
    type="async"
    description="Click confirm to start async task."
    :async-loading="loading"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace } from 'amu-ui'

const visible = ref(false)
const loading = ref(false)

const handleConfirm = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible.value = false
    console.log('Async task finished')
  }, 2000)
}
</script>
