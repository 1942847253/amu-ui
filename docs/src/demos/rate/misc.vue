<template>
  <div>
    <p>10 分制：</p>
    <AmuRate v-model="value" :max="10" />

    <p>0.1 步长：</p>
    <AmuRate v-model="preciseValue" :step="0.1" show-score />

    <p>不允许清空：</p>
    <AmuRate v-model="noClearValue" :allow-clear="false" />

    <p>自定义禁用时的未选中图标与颜色：</p>
    <AmuRate 
      v-model="disabledValue" 
      disabled 
      void-color="lightgray"
      disabled-void-color="rgba(0,0,0,0.1)"
      :disabled-void-icon="IconFrown"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'
import { IconFrown } from '@amu-ui/icons'

const value = ref(5)
const preciseValue = ref(3.7)
const noClearValue = ref(3)
const disabledValue = ref(2)
</script>
