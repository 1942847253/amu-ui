<template>
  <div class="demo-types">
    <AmuButton :plain="true" status="success" @click="open1">Success</AmuButton>
    <AmuButton :plain="true" status="warning" @click="open2">Warning</AmuButton>
    <AmuButton :plain="true" type="primary" @click="open3">Message</AmuButton>
    <AmuButton :plain="true" status="danger" @click="open4">Error</AmuButton>
    <AmuButton :plain="true" type="primary" @click="open5">Help</AmuButton>
    <AmuButton :plain="true" type="primary" @click="open6">Loading</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const open1 = () => {
  AmuMessage.success('Congrats, this is a success message.')
}
const open2 = () => {
  AmuMessage.warning('Warning, this is a warning message.')
}
const open3 = () => {
  AmuMessage.info('This is an info message.')
}
const open4 = () => {
  AmuMessage.error('Oops, this is an error message.')
}
const open5 = () => {
  AmuMessage.help('This is a help message.')
}
const open6 = () => {
  AmuMessage.loading({
    message: 'Loading... Please wait.',
    duration: 2000
  })
}
</script>

<style scoped>
.demo-types .amu-button {
  margin-right: 10px;
}
</style>
