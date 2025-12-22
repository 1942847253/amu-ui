<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value" type="password" placeholder="请输入密码" show-password />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value = ref('123456')
</script>
