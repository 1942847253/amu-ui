<template>
  <div class="page-container">
    <AmuCard class="page-card">
      <template #title>用户管理</template>
      <template #extra>
        <AmuSpace>
          <AmuInput v-model="keyword" placeholder="搜索姓名" clearable />
          <AmuButton v-permission="'system:user:view'" type="primary">新建用户</AmuButton>
        </AmuSpace>
      </template>
      <AmuTable :data="tableData" border stripe>
        <AmuTableColumn prop="name" label="姓名" />
        <AmuTableColumn prop="role" label="角色">
          <template #default="{ row }">
            <AmuTag :type="row.role === '管理员' ? 'primary' : 'default'">{{ row.role }}</AmuTag>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="status" label="状态">
          <template #default="{ row }">
            <AmuTag :type="row.status === '启用' ? 'success' : 'danger'">{{ row.status }}</AmuTag>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="createdAt" label="创建时间" />
      </AmuTable>
    </AmuCard>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuCard } from 'amu-ui/card'
import { AmuInput } from 'amu-ui/input'
import { AmuSpace } from 'amu-ui/space'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuTag } from 'amu-ui/tag'
import { computed, ref } from 'vue'

interface UserRow {
  name: string
  role: string
  status: string
  createdAt: string
}

defineOptions({
  name: 'SystemUsers'
})

const keyword = ref('')

const rawData: UserRow[] = [
  { name: '张三', role: '管理员', status: '启用', createdAt: '2026-01-02 10:20' },
  { name: '李四', role: '运营', status: '启用', createdAt: '2026-01-08 09:10' },
  { name: '王五', role: '访客', status: '禁用', createdAt: '2026-02-10 13:45' }
]

const tableData = computed(() => {
  if (!keyword.value) return rawData
  return rawData.filter((item) => item.name.includes(keyword.value))
})
</script>
