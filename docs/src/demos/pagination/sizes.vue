<template>
  <AmuSpace direction="vertical" size="large">
      <AmuPagination size="small" :total="50" />
      <AmuPagination size="default" :total="50" />
      <AmuPagination size="large" :total="50" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { AmuPagination } from 'amu-ui/pagination'
import { AmuSpace } from 'amu-ui/space'
</script>
