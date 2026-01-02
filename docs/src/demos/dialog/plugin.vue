<template>
  <AmuSpace>
    <AmuButton type="primary" @click="openConfirm">Confirm Dialog</AmuButton>
    <AmuButton type="primary" @click="openFeedback">Feedback Dialog</AmuButton>
    <AmuButton type="primary" @click="openAsync">Async Dialog</AmuButton>
  </AmuSpace>
</template>

<script setup lang="ts">
import { Dialog, AmuButton, AmuSpace } from 'amu-ui'

const openConfirm = () => {
  Dialog({
    title: 'Confirm',
    description: 'Are you sure you want to delete this item?',
    type: 'confirm',
    onConfirm: () => {
      console.log('Confirmed')
    },
    onCancel: () => {
      console.log('Cancelled')
    }
  })
}

const openFeedback = () => {
  Dialog({
    title: 'Success',
    description: 'Operation successful!',
    type: 'feedback',
    icon: 'success'
  })
}

const openAsync = () => {
  Dialog({
    title: 'Async Operation',
    description: 'Please wait...',
    type: 'async',
    onConfirm: () => new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        console.log('Async done')
      }, 2000)
    })
  })
}
</script>
