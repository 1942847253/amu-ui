<template>
  <AmuDescriptions title="样式定制" :column="2" border>
    <AmuDescriptionsItem
      label="等级"
      :labelStyle="{ fontWeight: 600 }"
      :contentStyle="{ fontWeight: 600 }"
    >
      S1
    </AmuDescriptionsItem>
    <AmuDescriptionsItem
      label="标签"
      :labelStyle="{ fontWeight: 600 }"
      :contentStyle="{ backgroundColor: 'var(--amu-color-bg-fill)', padding: '4px 8px', borderRadius: '4px' }"
    >
      核心客户
    </AmuDescriptionsItem>
    <AmuDescriptionsItem
      label="描述"
      :span="2"
      :contentStyle="{ color: 'var(--amu-color-text)' }"
    >
      通过 `labelStyle` 与 `contentStyle` 精细化控制展示样式。
    </AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
