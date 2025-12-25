<template>
  <AmuSpace direction="vertical" :size="12">
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">small：</span>
      <div style="width: 240px; max-width: 100%;">
        <AmuDatePicker v-model="small" size="small" clearable style="width: 100%;" />
      </div>
      <span>{{ small ? small.toISOString().slice(0, 10) : 'null' }}</span>
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">medium：</span>
      <div style="width: 240px; max-width: 100%;">
        <AmuDatePicker v-model="medium" size="medium" placeholder="请选择日期" style="width: 100%;" />
      </div>
      <span>{{ medium ? medium.toISOString().slice(0, 10) : 'null' }}</span>
    </div>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <span style="width: 90px;">large + error：</span>
      <div style="width: 240px; max-width: 100%;">
        <AmuDatePicker v-model="large" size="large" status="error" placeholder="必填" style="width: 100%;" />
      </div>
      <span>{{ large ? large.toISOString().slice(0, 10) : 'null' }}</span>
    </div>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSpace } from 'amu-ui/space'
import { AmuDatePicker } from 'amu-ui/date-picker'

const small = ref<Date | null>(null)
const medium = ref<Date | null>(null)
const large = ref<Date | null>(null)
</script>
