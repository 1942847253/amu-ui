<template>
  <div class="demo-input-number">
    <AmuInputNumber v-model="num" :precision="2" :step="0.1" :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuInputNumber } from 'amu-ui/input-number'

const num = ref(1)
</script>
