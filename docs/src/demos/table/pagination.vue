<template>
  <div class="table-pagination-demo">
    <AmuTable 
      :data="tableData" 
      :columns="columns" 
      :pagination="pagination"
      :loading="loading"
      @page-change="onPageChange"
      height="300"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuMessage } from 'amu-ui/message'

const columns = [
  { prop: 'date', label: 'Date', width: '180' },
  { prop: 'name', label: 'Name', width: '180' },
  { prop: 'address', label: 'Address' }
]

const loading = ref(false)
const tableData = ref([])

const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 100,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true
})

const fetchData = (page: number, size: number) => {
    return new Promise<{ list: any[], total: number }>((resolve) => {
        setTimeout(() => {
            // Simulate backend total count
            const total = 100 
            // Simulate data generation for current page
            const list = Array.from({ length: size }).map((_, index) => ({
                date: '2016-05-03',
                name: `Tom ${page}-${index + 1}`,
                address: `No. 189, Grove St, Los Angeles`
            }))
            
            resolve({
                list,
                total
            })
        }, 800)
    })
}

const loadData = async (page: number, size: number) => {
    loading.value = true
    try {
        const { list, total } = await fetchData(page, size)
        tableData.value = list
        pagination.current = page
        pagination.pageSize = size
        pagination.total = total
    } finally {
        loading.value = false
    }
}

const onPageChange = (current: number, pageSize: number) => {
    loadData(current, pageSize)
}

onMounted(() => {
    loadData(1, 10)
})
</script>

<style scoped>
.table-pagination-demo {
    width: 100%;
}
</style>
