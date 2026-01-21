<template>
  <AmuSpace direction="vertical" style="width: 100%">
    <AmuTextarea v-model="value1" status="error" placeholder="Error status" />
    <AmuTextarea v-model="value2" status="warning" placeholder="Warning status" />
    <AmuTextarea v-model="value3" status="success" placeholder="Success status" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTextarea, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
