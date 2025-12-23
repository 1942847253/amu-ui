<template>
  <div class="demo-section">
    <h4>使用 options 配置</h4>
    <amu-checkbox-group v-model="checkedList1" :options="options" />

    <h4 style="margin-top: 24px">使用默认插槽</h4>
    <amu-checkbox-group v-model="checkedList2">
      <amu-checkbox value="apple">苹果</amu-checkbox>
      <amu-checkbox value="banana">香蕉</amu-checkbox>
      <amu-checkbox value="orange">橙子</amu-checkbox>
      <amu-checkbox value="grape">葡萄</amu-checkbox>
    </amu-checkbox-group>

    <p style="margin-top: 16px; color: var(--amu-text-color-secondary)">
      选中值：{{ checkedList2 }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox, AmuCheckboxGroup } from 'amu-ui/checkbox'
import type { CheckboxOption } from 'amu-ui/checkbox'

const checkedList1 = ref(['1'])
const checkedList2 = ref(['apple', 'banana'])

const options: CheckboxOption[] = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
  { label: '选项 4（禁用）', value: '4', disabled: true },
]
</script>

<style scoped>
.demo-section {
  padding: 20px;
}

h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--amu-text-color-primary);
}
</style>
