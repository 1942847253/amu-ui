<template>
  <AmuSpace direction="vertical">
    <AmuInput
      v-model="value"
      placeholder="格式化金额"
      :formatter="formatMoney"
      :parser="parseMoney"
    />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value = ref('')

const formatMoney = (val: string) => {
  if (!val) return ''
  return `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseMoney = (val: string) => {
  return val.replace(/\$\s?|(,*)/g, '')
}
</script>
