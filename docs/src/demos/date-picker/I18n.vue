<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <span>国际化：</span>
    <AmuConfigProvider :locale="lang">
      <AmuDatePicker v-model="value" />
    </AmuConfigProvider>
    <AmuButton size="mini" @click="toggle">切换语言</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AmuButton } from 'amu-ui/button'
import { AmuConfigProvider } from 'amu-ui/config-provider'
import { AmuDatePicker } from 'amu-ui/date-picker'
import { en, zhCn } from '@amu-ui/locale'

const value = ref<Date | null>(null)
const isZh = ref(true)

const lang = computed(() => (isZh.value ? zhCn : en))

const toggle = () => {
  isZh.value = !isZh.value
}
</script>
