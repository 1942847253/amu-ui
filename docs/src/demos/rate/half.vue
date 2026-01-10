<template>
  <div>
    <AmuRate v-model="value" allow-half />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'

const value = ref(2.5)
</script>
