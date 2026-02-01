<template>
  <AmuDescriptions title="标签插槽" border colon :column="2">
    <AmuDescriptionsItem>
      <template #label>
        <span>负责人</span>
      </template>
      张晓峰
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>联系方式</span>
      </template>
      13800000000
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>状态</span>
      </template>
      正常
    </AmuDescriptionsItem>
    <AmuDescriptionsItem>
      <template #label>
        <span>说明</span>
      </template>
      支持 `label` 插槽自定义标签。
    </AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
