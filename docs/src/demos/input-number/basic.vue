<template>
  <div class="demo-input-number">
    <AmuInputNumber v-model="num" :min="1" :max="10" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuInputNumber } from 'amu-ui/input-number'

const num = ref(1)

const handleChange = (value: number | undefined) => {
  console.log(value)
}
</script>
