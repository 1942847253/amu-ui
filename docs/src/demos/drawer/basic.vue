<template>
  <div>
    <AmuButton type="primary" @click="visible = true">Open Drawer</AmuButton>
    <AmuDrawer
      v-model="visible"
      title="Basic Drawer"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </AmuDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
