<template>
  <div>
    <p>只读 (Readonly)：</p>
    <AmuRate v-model="value" readonly />
    
    <p>禁用 (Disabled) + 显示分数：</p>
    <AmuRate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} 分" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'

const value = ref(3.5)
</script>
