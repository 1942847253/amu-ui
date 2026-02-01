<template>
  <AmuDescriptions
    title="响应式列数"
    border
    colon
    :column="{ xs: 1, sm: 2, md: 3, lg: 4 }"
    :labelWidth="90"
  >
    <AmuDescriptionsItem label="姓名">张三</AmuDescriptionsItem>
    <AmuDescriptionsItem label="手机">13000000000</AmuDescriptionsItem>
    <AmuDescriptionsItem label="城市">深圳</AmuDescriptionsItem>
    <AmuDescriptionsItem label="职位">产品经理</AmuDescriptionsItem>
    <AmuDescriptionsItem label="公司">某科技公司</AmuDescriptionsItem>
    <AmuDescriptionsItem label="部门">业务中台</AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
</script>
