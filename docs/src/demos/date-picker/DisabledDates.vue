<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>禁用规则：</span>
    <AmuDatePicker v-model="value" :disabledDate="disabledDate" />
    <span>{{ value ? value.toISOString().slice(0, 10) : 'null' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)

const disabledDate = (d: Date) => {
  // 禁用今天之前的日期
  return dayjs(d).isBefore(dayjs(), 'day')
}
</script>
