<template>
  <div class="demo-section">
    <h4>限制最多选择 2 个</h4>
    <amu-checkbox-group v-model="checkedList1" :max="2">
      <amu-checkbox value="1">选项 1</amu-checkbox>
      <amu-checkbox value="2">选项 2</amu-checkbox>
      <amu-checkbox value="3">选项 3</amu-checkbox>
      <amu-checkbox value="4">选项 4</amu-checkbox>
    </amu-checkbox-group>
    <p style="margin-top: 12px; color: var(--amu-text-color-secondary)">
      已选：{{ checkedList1.length }} / 2
    </p>

    <h4 style="margin-top: 24px">限制至少选择 1 个</h4>
    <amu-checkbox-group v-model="checkedList2" :min="1">
      <amu-checkbox value="a">选项 A</amu-checkbox>
      <amu-checkbox value="b">选项 B</amu-checkbox>
      <amu-checkbox value="c">选项 C</amu-checkbox>
    </amu-checkbox-group>
    <p style="margin-top: 12px; color: var(--amu-text-color-secondary)">
      已选：{{ checkedList2.length }} (至少 1 个)
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox, AmuCheckboxGroup } from 'amu-ui/checkbox'

const checkedList1 = ref(['1'])
const checkedList2 = ref(['a'])
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
