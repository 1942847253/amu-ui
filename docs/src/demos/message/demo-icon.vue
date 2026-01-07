<template>
  <div class="demo-icon">
    <AmuButton type="primary" :plain="true" @click="open1">Message with Icon</AmuButton>
    <AmuButton type="primary" :plain="true" @click="open2">Success with Icon</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'
import { IconGithub, IconSettings } from '@amu-ui/icons'
import { h } from 'vue'

const open1 = () => {
  AmuMessage({
    message: 'Hello World',
    icon: h(IconGithub),
  })
}

const open2 = () => {
  AmuMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    icon: h(IconSettings, { spin: true }),
  })
}
</script>

<style scoped>
.demo-icon .amu-button {
  margin-right: 10px;
}
</style>
