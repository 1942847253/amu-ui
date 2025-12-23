<template>
  <AmuSwitch v-model="value" checked-color="#13ce66" unchecked-color="#ff4949" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'

const value = ref(true)
</script>
