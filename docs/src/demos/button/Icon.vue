<template>
  <div class="demo-button-icon">
    <AmuButton type="primary">
      <template #icon>
        <AmuIcon>
          <IconSearch />
        </AmuIcon>
      </template>
      Search
    </AmuButton>
    <AmuButton>
      <template #icon>
        <AmuIcon>
          <IconPlus />
        </AmuIcon>
      </template>
      Add
    </AmuButton>
    <AmuButton type="dashed">
      <template #icon>
        <AmuIcon>
          <IconUpload />
        </AmuIcon>
      </template>
      Upload
    </AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuButton, AmuIcon } from 'amu-ui'
import { IconSearch, IconUpload, IconPlus } from '@amu-ui/icons'
</script>

<style scoped>
.demo-button-icon {
  display: flex;
  gap: 16px;
}
</style>
