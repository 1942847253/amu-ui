<template>
  <AmuDatePicker  v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)
</script>
