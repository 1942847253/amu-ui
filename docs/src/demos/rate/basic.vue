<template>
  <div>
    <p>默认：</p>
    <div class="demo-rate-block">
      <span class="demonstration">默认</span>
      <AmuRate v-model="value1" />
    </div>
    
    <div class="demo-rate-block">
      <span class="demonstration">区分颜色</span>
      <AmuRate v-model="value2" :colors="colors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'

const value1 = ref(0)
const value2 = ref(2)

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<style scoped>
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--amu-color-border);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demonstration {
  display: block;
  color: var(--amu-color-text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
