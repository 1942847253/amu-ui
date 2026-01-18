<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; align-items: center;">
      <AmuSwitch v-model="stripe" />
      <span style="margin: 0 8px">Stripe 斑马纹</span>
      <span style="margin: 0 10px"></span>
      <AmuSwitch v-model="border" />
      <span style="margin: 0 8px">Border 边框</span>
    </div>
    
    <AmuTable 
      :data="tableData" 
      :stripe="stripe" 
      :border="border"
    >
      <AmuTableColumn prop="name" label="用户姓名" width="120" />
      <AmuTableColumn prop="role" label="角色" width="120" />
      <AmuTableColumn prop="email" label="邮箱地址" width="220" />
      <AmuTableColumn prop="status" label="状态" width="100" />
      <AmuTableColumn prop="lastLogin" label="最后登录" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stripe = ref(true)
const border = ref(true)

const tableData = [
  { name: '王晨', role: '管理员', email: 'wangchen@example.com', status: '在线', lastLogin: '2024-03-15 10:23:45' },
  { name: '李晓', role: '普通用户', email: 'lixiao@example.com', status: '离线', lastLogin: '2024-03-14 18:00:12' },
  { name: '张伟', role: '运维', email: 'zhangwei@example.com', status: '忙碌', lastLogin: '2024-03-15 09:15:33' },
  { name: '赵敏', role: '普通用户', email: 'zhaomin@example.com', status: '在线', lastLogin: '2024-03-15 11:30:00' },
]
</script>
