<template>
  <AmuDescriptions title="跨列展示" border :column="3">
    <AmuDescriptionsItem label="产品">企业版云盘</AmuDescriptionsItem>
    <AmuDescriptionsItem label="规格">4 核 8G</AmuDescriptionsItem>
    <AmuDescriptionsItem label="地域">华东 1</AmuDescriptionsItem>
    <AmuDescriptionsItem label="备注" :span="2">
      该字段跨 2 列展示，适合较长文本描述。
    </AmuDescriptionsItem>
    <AmuDescriptionsItem label="创建人">李雷</AmuDescriptionsItem>
    <AmuDescriptionsItem label="生效时间" :span="3">
      2025-12-01 00:00:00 - 2026-12-01 00:00:00
    </AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
