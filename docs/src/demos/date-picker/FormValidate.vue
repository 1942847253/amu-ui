<template>
  <div style="display: grid; gap: 12px; max-width: 520px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="width: 90px;">必填：</span>
      <AmuDatePicker v-model="value" :status="error ? 'error' : 'normal'" clearable />
      <AmuButton size="mini" @click="submit">校验</AmuButton>
    </div>

    <div v-if="error" style="color: var(--amu-color-status-danger);">
      请选择日期
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuButton } from 'amu-ui/button'
import { AmuDatePicker } from 'amu-ui/date-picker'

const value = ref<Date | null>(null)
const error = ref(false)

const submit = () => {
  error.value = !value.value
}
</script>
