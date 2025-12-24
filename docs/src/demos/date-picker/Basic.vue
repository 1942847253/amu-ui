<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <span>日期：</span>
    <AmuDatePicker v-model="value" />
    <span>{{ value ? value.toISOString().slice(0, 10) : 'null' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)
</script>
