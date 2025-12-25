<template>
  <AmuSpace direction="vertical" :size="12">
    <div style="color: var(--amu-color-text-default); font-size: 12px;">
      通过 `step` 控制时间下拉的步长（例如分钟 5、秒 10）。
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">步长：</span>
      <div style="width: 260px; max-width: 100%;">
        <AmuDatePicker
          v-model="value"
          type="datetime"
          showTime
          :step="{ hour: 1, minute: 5, second: 10 }"
          style="width: 100%;"
        />
      </div>
      <span style="max-width: 320px; word-break: break-all;">{{ value ? value.toISOString() : 'null' }}</span>
    </div>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSpace } from 'amu-ui/space'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)
</script>
