<template>
  <amu-popconfirm
    title="Are you sure?"
    @confirm="onConfirm"
  >
    <template #reference>
      <amu-button type="primary">Custom Buttons</amu-button>
    </template>
    <template #confirmBtn="{ handleConfirm }">
      <amu-button type="primary" status="danger" size="mini" @click="handleConfirm">Yes, Delete</amu-button>
    </template>
    <template #cancelBtn="{ handleCancel }">
      <amu-button size="mini" @click="handleCancel">No, Keep</amu-button>
    </template>
  </amu-popconfirm>
</template>

<script setup lang="ts">
import { AmuPopconfirm, AmuButton } from 'amu-ui'

const onConfirm = () => {
  console.log('confirm')
}
</script>
