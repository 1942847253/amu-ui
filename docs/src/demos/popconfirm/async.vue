<template>
  <amu-popconfirm
    title="Async Confirm"
    content="This action will take 2 seconds to complete."
    :on-before-confirm="handleBeforeConfirm"
    @confirm="handleConfirm"
  >
    <template #reference>
      <amu-button type="primary">Async Confirm</amu-button>
    </template>
  </amu-popconfirm>
</template>

<script setup lang="ts">
import { AmuPopconfirm, AmuButton } from 'amu-ui'

const handleBeforeConfirm = async () => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      // Simulate a check or async operation
      const success = Math.random() > 0.5
      if (success) {
        resolve(true) // Proceed to close and emit confirm
      } else {
        alert('Async validation failed, popconfirm will stay open.')
        resolve(false) // Prevent closing
      }
    }, 2000)
  })
}

const handleConfirm = () => {
  console.log('Confirmed!')
}
</script>
