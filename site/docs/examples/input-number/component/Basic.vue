<template>
  <a-input-number class="vp-raw" v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref(520)
</script>

<style lang="less" scoped>

</style>