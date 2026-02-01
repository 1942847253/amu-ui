<template>
  <div class="demo-cascader-basic">
    <AmuCascader v-model="value" :options="options" placeholder="请选择地区" />
    <div class="demo-cascader-basic__value">
      当前值：{{ value.length ? value.join(' / ') : '未选择' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCascader } from 'amu-ui/cascader'
import { demoOptions as options } from './options'

const value = ref<string[]>([])
</script>

<style scoped>
.demo-cascader-basic__value {
  margin-top: 8px;
  font-size: 12px;
  color: var(--amu-color-text-default);
}
</style>
