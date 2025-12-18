<template>
  <div class="consumer-box">
    <p><strong>Current Locale Name:</strong> {{ lang }}</p>
    <p><strong>Translated 'Today':</strong> {{ t('el.datepicker.today') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@amu-ui/hooks'

const { lang, t } = useLocale()
</script>

<style scoped>
.consumer-box {
  padding: 12px;
  border: 1px dashed var(--amu-border);
  border-radius: 4px;
  margin: 12px 0;
  background-color: var(--amu-bg-2);
}
</style>
