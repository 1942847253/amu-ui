<template>
    <div class="list">
      <div class="item">
        <span>step </span> <a-slider v-model="value1" :step="5" />
      </div>
      <div class="item">
        <span>stops</span> <a-slider show-stops  v-model="value2" :step="10" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref(10);
  const value2 = ref(30);
  </script>
  
  <style lang="less" scoped>
  .list {
    .item {
      display: flex;
      align-items: center;
      span {
        min-width: 100px;
        font-size: 13.5px;
      }
    }
  }
  </style>
  