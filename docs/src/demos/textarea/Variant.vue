<template>
  <AmuSpace direction="vertical" style="width: 100%">
    <AmuTextarea v-model="value1" variant="outline" placeholder="Outline variant (Default)" />
    <AmuTextarea v-model="value2" variant="filled" placeholder="Filled variant" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTextarea, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
</script>
