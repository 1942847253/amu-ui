<template>
  <div class="demo-close">
    <AmuButton type="primary" :plain="true" @click="open1">Closable Message</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open2">Custom Close Text</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open3">Close Callback</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const open1 = () => {
  AmuMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

const open2 = () => {
  AmuMessage({
    showClose: true,
    closeText: 'Got it',
    message: 'This is a message with custom close text.',
    type: 'info',
  })
}

const open3 = () => {
  AmuMessage({
    showClose: true,
    message: 'Close me to trigger callback.',
    onClose: () => {
      AmuMessage.success('Message closed!')
    },
  })
}
</script>

<style scoped>
.demo-close .amu-button {
  margin-right: 10px;
}
</style>
