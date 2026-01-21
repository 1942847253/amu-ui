<template>
  <AmuSpace direction="vertical">
    <AmuTextarea v-model="value1" resize="vertical" placeholder="Vertical resize (Default)" style="width: 300px" />
    <AmuTextarea v-model="value2" resize="horizontal" placeholder="Horizontal resize" style="width: 300px" />
    <AmuTextarea v-model="value3" resize="both" placeholder="Both resize" style="width: 300px" />
    <AmuTextarea v-model="value4" resize="none" placeholder="No resize" style="width: 300px" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTextarea, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
