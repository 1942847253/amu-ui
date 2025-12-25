<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>范围：</span>
    <div style="width: 300px; max-width: 100%;">
      <AmuDatePicker v-model="range" type="daterange" clearable style="width: 100%;" />
    </div>
    <span>
      {{
        range
          ? `${dayjs(range[0]).format('YYYY-MM-DD')} ~ ${dayjs(range[1]).format('YYYY-MM-DD')}`
          : 'null'
      }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { AmuDatePicker } from 'amu-ui/date-picker'

const range = ref<[Date, Date] | null>(null)
</script>
