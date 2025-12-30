<template>
  <amu-popconfirm
    title="Are you sure?"
    description="This action cannot be undone."
    icon="warning"
    @confirm="onConfirm"
  >
    <template #reference>
      <amu-button status="danger">Delete with Description</amu-button>
    </template>
  </amu-popconfirm>
</template>

<script setup lang="ts">
import { AmuPopconfirm, AmuButton } from 'amu-ui'

const onConfirm = () => {
  console.log('confirm')
}
</script>
