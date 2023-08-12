<template>
  <div class="list">
    <div class="item">
      <span>Default value</span> <a-slider v-model="value1" />
    </div>
    <div class="item">
      <span>Customized initial value</span> <a-slider v-model="value2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref(0);
const value2 = ref(50);
</script>

<style lang="less" scoped>
.list {
  .item {
    display: flex;
    align-items: center;
    span {
      min-width: 200px;
      font-size: 13.5px;
    }
  }
}
</style>
