<template>
  <AmuTable :data="tableData" style="width: 100%">
    <AmuTableColumn prop="date" label="Date" width="180" />
    <AmuTableColumn prop="name" label="Name" width="180" />
    <AmuTableColumn prop="address" label="Address" />
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn } from 'amu-ui'

const tableData: any[] = []
</script>
