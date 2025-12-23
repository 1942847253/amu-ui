<template>
  <AmuSpace>
    <AmuSwitch v-model="value1" :before-change="beforeChange1" />
    <AmuSwitch v-model="value2" :before-change="beforeChange2" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSpace } from 'amu-ui/space'

const value1 = ref(false)
const value2 = ref(false)

const beforeChange1 = () => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  return new Promise<boolean>((_, reject) => {
    setTimeout(() => {
      alert('Switch failed')
      reject()
    }, 1000)
  })
}
</script>
