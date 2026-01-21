<template>
  <AmuTextarea v-model="value" readonly placeholder="Readonly textarea" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTextarea } from 'amu-ui'

const value = ref('This content is readonly.')
</script>
