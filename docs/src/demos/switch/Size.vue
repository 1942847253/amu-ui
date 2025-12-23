<template>
  <AmuSpace align="center">
    <AmuSwitch v-model="value1" size="small" />
    <AmuSwitch v-model="value2" size="medium" />
    <AmuSwitch v-model="value3" size="large" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSpace } from 'amu-ui/space'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
</script>
