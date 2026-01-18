<template>
  <div class="table-pagination-demo">
    <AmuTable 
      :data="tableData" 
      :columns="columns" 
      :pagination="pagination"
      @page-change="onPageChange"
      height="300"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuMessage } from 'amu-ui/message'

const columns = [
  { prop: 'date', label: 'Date', width: '180' },
  { prop: 'name', label: 'Name', width: '180' },
  { prop: 'address', label: 'Address' }
]

const generateData = (page: number, size: number) => {
    return Array.from({ length: size }).map((_, index) => ({
        date: '2016-05-03',
        name: `Tom ${page}-${index + 1}`,
        address: `No. 189, Grove St, Los Angeles`
    }))
}

const tableData = ref(generateData(1, 10))

const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 100,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true
})

const onPageChange = (current: number, pageSize: number) => {
    AmuMessage.success(`Page: ${current}, Size: ${pageSize}`)
    pagination.current = current
    pagination.pageSize = pageSize
    // Simulate API call
    tableData.value = generateData(current, pageSize)
}
</script>

<style scoped>
.table-pagination-demo {
    width: 100%;
}
</style>
