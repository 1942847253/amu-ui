<template>
  <AmuPagination 
    v-model:current="current" 
    v-model:pageSize="pageSize" 
    :total="500" 
    show-size-changer 
    show-quick-jumper 
    show-total
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuPagination } from 'amu-ui/pagination'

const current = ref(1)
const pageSize = ref(10)
</script>
