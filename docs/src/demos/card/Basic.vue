<template>
  <amu-space direction="vertical" size="large">
    <amu-card title="Default Size Card" style="width: 360px">
      <template #extra>
        <amu-button type="text">More</amu-button>
      </template>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </amu-card>

    <amu-card size="small" title="Small Size Card" style="width: 360px">
      <template #extra>
        <amu-button type="text">More</amu-button>
      </template>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuCard, AmuButton, AmuSpace } from 'amu-ui'
</script>