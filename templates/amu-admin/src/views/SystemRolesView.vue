<template>
  <AmuCard>
    <template #title>角色管理</template>

    <AmuTable :data="tableData" border>
      <AmuTableColumn prop="name" label="角色名称" />
      <AmuTableColumn prop="code" label="角色编码" />
      <AmuTableColumn prop="members" label="成员数量" />
      <AmuTableColumn prop="updatedAt" label="更新时间" />
    </AmuTable>
  </AmuCard>
</template>

<script setup lang="ts">
import { AmuCard } from 'amu-ui/card'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'

interface RoleRow {
  name: string
  code: string
  members: number
  updatedAt: string
}

defineOptions({
  name: 'SystemRoles'
})

const tableData: RoleRow[] = [
  { name: '超级管理员', code: 'admin', members: 2, updatedAt: '2026-02-01 11:00' },
  { name: '运营角色', code: 'operator', members: 12, updatedAt: '2026-02-10 18:21' },
  { name: '审计角色', code: 'auditor', members: 4, updatedAt: '2026-02-18 09:32' }
]
</script>
