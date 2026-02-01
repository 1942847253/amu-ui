<template>
  <AmuDescriptions
    title="自定义标签"
    border
    colon
    :column="2"
    labelAlign="right"
    contentAlign="left"
  >
    <AmuDescriptionsItem>
      <template #label>
        <span>账号</span>
      </template>
      amu-001
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>角色</span>
      </template>
      企业管理员
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>状态</span>
      </template>
      正常
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>备注</span>
      </template>
      支持 `label` 插槽与 `colon`
    </AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
