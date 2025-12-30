<template>
  <amu-space>
    <amu-popconfirm
      title="Are you sure?"
      icon="info"
      @confirm="onConfirm"
    >
      <template #reference>
        <amu-button type="primary">Info</amu-button>
      </template>
    </amu-popconfirm>

    <amu-popconfirm
      title="Are you sure?"
      icon="warning"
      @confirm="onConfirm"
    >
      <template #reference>
        <amu-button status="warning">Warning</amu-button>
      </template>
    </amu-popconfirm>

    <amu-popconfirm
      title="Are you sure?"
      icon="error"
      @confirm="onConfirm"
    >
      <template #reference>
        <amu-button status="danger">Error</amu-button>
      </template>
    </amu-popconfirm>

    <amu-popconfirm
      title="Custom Color"
      icon="info"
      icon-color="#626aef"
      @confirm="onConfirm"
    >
      <template #reference>
        <amu-button>Custom Color</amu-button>
      </template>
    </amu-popconfirm>
  </amu-space>
</template>

<script setup lang="ts">
import { AmuPopconfirm, AmuButton, AmuSpace } from 'amu-ui'

const onConfirm = () => {
  console.log('confirm')
}
</script>
