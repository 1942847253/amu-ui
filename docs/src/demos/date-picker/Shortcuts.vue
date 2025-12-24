<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>快捷项：</span>
    <AmuDatePicker v-model="value" :shortcuts="shortcuts" />
    <span>{{ value ? value.toISOString().slice(0, 10) : 'null' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)

const shortcuts = [
  {
    label: '今天',
    value: () => dayjs().toDate(),
  },
  {
    label: '昨天',
    value: () => dayjs().subtract(1, 'day').toDate(),
  },
]
</script>
