<template>
  <div>
    <AmuTable 
      height="400" 
      :data="bigData" 
      virtual
      :row-height="50"
      border
      stripe
    >
      <AmuTableColumn type="index" label="#" width="60" fixed="left" />
      <AmuTableColumn prop="id" label="ID" width="100" />
      <AmuTableColumn prop="name" label="Name" width="200" />
      <AmuTableColumn prop="email" label="Email" width="300" />
      <AmuTableColumn prop="role" label="Role" width="150" />
      <AmuTableColumn prop="address" label="Address" width="400" show-overflow-tooltip />
      <AmuTableColumn label="Action" width="150" fixed="right">
        <template #default>
           <AmuButton size="small">Edit</AmuButton>
        </template>
      </AmuTableColumn>
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const generateData = (length: number) => {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    name: `User ${idx + 1}`,
    email: `user${idx + 1}@example.com`,
    role: idx % 2 === 0 ? 'Admin' : 'User',
    address: 'No. 189, Grove St, Los Angeles No. 189, Grove St, Los Angeles'
  }))
}

const bigData = ref(generateData(10000))
</script>
