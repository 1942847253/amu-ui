<template>
  <AmuDescriptions
    title="冒号与对齐"
    border
    colon
    :labelWidth="100"
    labelAlign="right"
    contentAlign="left"
    :column="3"
  >
    <AmuDescriptionsItem label="姓名">赵四</AmuDescriptionsItem>
    <AmuDescriptionsItem label="部门">前端研发</AmuDescriptionsItem>
    <AmuDescriptionsItem label="职位">高级工程师</AmuDescriptionsItem>
    <AmuDescriptionsItem label="入职时间">2022-08-01</AmuDescriptionsItem>
    <AmuDescriptionsItem label="办公地">上海</AmuDescriptionsItem>
    <AmuDescriptionsItem label="状态">在职</AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
