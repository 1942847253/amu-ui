<template>
  <div class="demo-input-icon">
    <div class="demo-input-row">
      <AmuInput placeholder="请输入用户名">
        <template #prefix>
          <AmuIcon>
            <IconUser />
          </AmuIcon>
        </template>
      </AmuInput>
      <AmuInput placeholder="请输入搜索内容">
        <template #suffix>
          <AmuIcon>
            <IconSearch />
          </AmuIcon>
        </template>
      </AmuInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconUser, IconSearch } from '@amu-ui/icons'
</script>

<style scoped>
.demo-input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}
</style>
