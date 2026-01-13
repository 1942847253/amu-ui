<template>
  <AmuPagination simple :total="50" />
  <div style="height: 20px;"></div>
  <AmuPagination simple show-size-changer :total="50" />
</template>

<script setup lang="ts">
import { AmuPagination } from 'amu-ui/pagination'
</script>
