<template>
  <AmuSpace direction="vertical" :size="12">
    <div style="color: var(--amu-color-text-default); font-size: 12px;">
      同一格式下，对比 `timezone="utc"` 与 `timezone="Asia/Shanghai"` 的显示效果。
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">UTC：</span>
      <div style="width: 260px; max-width: 100%;">
        <AmuDatePicker
          v-model="utcValue"
          type="datetime"
          showTime
          timezone="utc"
          format="YYYY/MM/DD HH:mm:ss"
          style="width: 100%;"
        />
      </div>
      <span style="max-width: 320px; word-break: break-all;">{{ utcValue ? utcValue.toISOString() : 'null' }}</span>
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">上海：</span>
      <div style="width: 260px; max-width: 100%;">
        <AmuDatePicker
          v-model="shanghaiValue"
          type="datetime"
          showTime
          timezone="Asia/Shanghai"
          format="YYYY/MM/DD HH:mm:ss"
          style="width: 100%;"
        />
      </div>
      <span style="max-width: 320px; word-break: break-all;">{{ shanghaiValue ? shanghaiValue.toISOString() : 'null' }}</span>
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">自定义格式：</span>
      <div style="width: 260px; max-width: 100%;">
        <AmuDatePicker v-model="customValue" :format="customFormat" clearable style="width: 100%;" />
      </div>
      <span>{{ customValue ? customValue.toISOString().slice(0, 10) : 'null' }}</span>
    </div>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { AmuSpace } from 'amu-ui/space'
import { AmuDatePicker } from 'amu-ui/date-picker'

const utcValue = ref<Date | null>(dayjs().toDate())
const shanghaiValue = ref<Date | null>(dayjs().toDate())
const customValue = ref<Date | null>(null)

const customFormat = (d: Date) => {
  // 例：2025年12月25日（周四）
  return dayjs(d).format('YYYY年MM月DD日（ddd）')
}
</script>
