<template>
  <AmuSpace>
    <AmuSwitch v-model="value1" disabled />
    <AmuSwitch v-model="value2" disabled />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSpace } from 'amu-ui/space'

const value1 = ref(true)
const value2 = ref(false)
</script>
