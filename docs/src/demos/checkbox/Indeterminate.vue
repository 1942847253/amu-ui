<template>
  <div class="demo-section">
    <amu-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </amu-checkbox>
    <div class="divider"></div>
    <amu-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
      <amu-checkbox value="1">选项 1</amu-checkbox>
      <amu-checkbox value="2">选项 2</amu-checkbox>
      <amu-checkbox value="3">选项 3</amu-checkbox>
      <amu-checkbox value="4">选项 4</amu-checkbox>
    </amu-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { AmuCheckbox, AmuCheckboxGroup } from 'amu-ui/checkbox'

const allOptions = ['1', '2', '3', '4']
const checkedItems = ref<string[]>(['1'])
const checkAll = ref(false)

// 计算半选状态
const isIndeterminate = computed(() => {
  const checkedCount = checkedItems.value.length
  return checkedCount > 0 && checkedCount < allOptions.length
})

// 处理全选变化
const handleCheckAllChange = (checked: boolean) => {
  checkedItems.value = checked ? [...allOptions] : []
}

// 处理子项变化
const handleCheckedChange = (value: Array<string | number>) => {
  checkAll.value = value.length === allOptions.length
}
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.divider {
  height: 1px;
  background-color: var(--amu-border-color-light);
  margin: 8px 0;
}
</style>
