<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>范围：</span>
    <div style="width: 300px; max-width: 100%;">
      <AmuDatePicker v-model="range" type="daterange" clearable style="width: 100%;" />
    </div>
    <span>
      {{
        range
          ? `${range[0].toISOString().slice(0, 10)} ~ ${range[1]
              .toISOString()
              .slice(0, 10)}`
          : 'null'
      }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDatePicker } from 'amu-ui/date-picker'

const range = ref<[Date, Date] | null>(null)
</script>
