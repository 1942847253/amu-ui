<template>
  <AmuSpace>
    <AmuButton type="primary" @click="visible = true">Open Dialog</AmuButton>
    <AmuDialog v-model="visible" title="Basic Dialog">
      <p>This is a basic dialog.</p>
    </AmuDialog>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace } from 'amu-ui'

const visible = ref(false)
</script>
