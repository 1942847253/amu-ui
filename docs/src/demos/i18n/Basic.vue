<template>
  <div class="demo-wrapper">
    <div class="controls">
      <AmuButton @click="toggleLocale">
        Switch to {{ locale.name === 'zh-cn' ? 'English' : 'Chinese' }}
      </AmuButton>
    </div>
    
    <AmuConfigProvider :locale="locale">
      <LocaleConsumer />
    </AmuConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zhCn, en } from '@amu-ui/locale'
import { AmuConfigProvider, AmuButton } from 'amu-ui'
import LocaleConsumer from './LocaleConsumer.vue'

const locale = ref(zhCn)

const toggleLocale = () => {
  locale.value = locale.value.name === 'zh-cn' ? en : zhCn
}
</script>

<style scoped>
.demo-wrapper {
  padding: 24px;
  border: 1px solid var(--amu-border);
  border-radius: var(--amu-radius);
}
.controls {
  margin-bottom: 16px;
}
</style>
