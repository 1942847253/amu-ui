<template>
    <div class="list">
      <div class="item">
        <span>step {{ value1 }}</span> <a-slider v-model="value1" :step="5" />
      </div>
      <div class="item">
        <span>step {{value2}}</span> <a-slider v-model="value2" :step="10" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref(25);
  const value2 = ref(70);
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
  