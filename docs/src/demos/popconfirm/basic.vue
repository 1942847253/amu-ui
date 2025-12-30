<template>
  <amu-popconfirm
    title="Are you sure you want to delete this task?"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #reference>
      <amu-button type="primary">Delete</amu-button>
    </template>
  </amu-popconfirm>
</template>

<script setup lang="ts">
import { AmuPopconfirm, AmuButton } from 'amu-ui'

const onConfirm = () => {
  console.log('confirm')
}

const onCancel = () => {
  console.log('cancel')
}
</script>
