<template>
    <a-slider v-model="value1" show-input />
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  const value1 = ref(10);
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
  