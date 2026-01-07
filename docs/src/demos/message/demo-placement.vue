<template>
  <div class="demo-placement">
    <AmuButton type="primary" :plain="true" @click="open1">Top Left</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open2">Top Right</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open3">Bottom Left</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open4">Bottom Right</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open5">Top Center (Default)</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open6">Bottom Center</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const open1 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'top-left',
  })
}

const open2 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'top-right',
  })
}

const open3 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'bottom-left',
  })
}

const open4 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'bottom-right',
  })
}

const open5 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'top',
  })
}

const open6 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    placement: 'bottom',
  })
}
</script>

<style scoped>
.demo-placement .amu-button {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
