<template>
  <AmuSwitch v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'

const value = ref(true)
</script>
