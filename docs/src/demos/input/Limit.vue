<template>
  <AmuSpace direction="vertical">
    <AmuInput
      v-model="value1"
      placeholder="最大长度 10"
      :maxlength="10"
      show-limit-number
    />
    <AmuInput
      v-model="value2"
      placeholder="最大字符数 10 (中文=2)"
      :maxcharacter="10"
      show-limit-number
    />
    <AmuInput
      v-model="value3"
      placeholder="允许超出限制"
      :maxlength="10"
      allow-input-over-max
      show-limit-number
    />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
