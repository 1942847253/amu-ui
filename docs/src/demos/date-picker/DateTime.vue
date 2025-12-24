<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>日期时间：</span>
    <div style="width: 240px; max-width: 100%;">
      <AmuDatePicker v-model="value" type="datetime" showTime style="width: 100%;" />
    </div>
    <span>{{ value ? value.toISOString() : 'null' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)
</script>
