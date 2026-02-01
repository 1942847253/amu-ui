<template>
  <AmuDescriptions title="基础信息" border>
    <template #extra>
      <AmuButton type="primary" size="small">编辑</AmuButton>
    </template>
    <AmuDescriptionsItem label="企业名称">阿木科技</AmuDescriptionsItem>
    <AmuDescriptionsItem label="统一社会信用代码">91310000MA1K123456</AmuDescriptionsItem>
    <AmuDescriptionsItem label="法人代表">王小明</AmuDescriptionsItem>
    <AmuDescriptionsItem label="成立时间">2019-03-12</AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
import { AmuButton } from 'amu-ui/button'
</script>
