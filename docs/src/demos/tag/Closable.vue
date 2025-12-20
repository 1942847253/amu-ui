<template>
  <div class="demo-tag">
    <amu-tag v-if="show" closable @close="handleClose">Closable Tag</amu-tag>
    <amu-button v-else size="small" @click="show = true">Reset</amu-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTag, AmuButton } from 'amu-ui'

const show = ref(true)
const handleClose = () => {
  show.value = false
}
</script>

<style scoped>
.demo-tag {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 32px;
}
</style>
