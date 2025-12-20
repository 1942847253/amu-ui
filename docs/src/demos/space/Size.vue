<template>
  <AmuSpace direction="vertical" :size="20">
    <AmuSpace size="small">
      <AmuButton type="primary">Small</AmuButton>
      <AmuButton >Small</AmuButton>
    </AmuSpace>
    <AmuSpace size="default">
      <AmuButton status="danger">Default</AmuButton>
      <AmuButton>Default</AmuButton>
    </AmuSpace>
    <AmuSpace size="large">
      <AmuButton type='outline'>Large</AmuButton>
      <AmuButton>Large</AmuButton>
    </AmuSpace>
    <AmuSpace :size="30">
      <AmuButton status="success">30px</AmuButton>
      <AmuButton>30px</AmuButton>
    </AmuSpace>
  </AmuSpace>
</template>

<script setup lang="ts">
import { AmuButton, AmuSpace } from 'amu-ui'
</script>
