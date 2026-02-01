<template>
  <AmuCascader v-model="value" :options="options" placeholder="自定义选项">
    <template #option="{ option, isLeaf }">
      <div class="demo-cascader-option">
        <span>{{ option.label }}</span>
        <span v-if="!isLeaf" class="demo-cascader-option__hint">子级</span>
      </div>
    </template>
  </AmuCascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'

const value = ref<string[]>([])
</script>

<style scoped>
.demo-cascader-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.demo-cascader-option__hint {
  font-size: 12px;
  color: var(--amu-color-text-default);
}
</style>
