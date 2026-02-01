<template>
  <AmuSpace direction="vertical" fill>
    <AmuRadioGroup v-model="size" type="button">
      <AmuRadio label="large">大</AmuRadio>
      <AmuRadio label="default">中</AmuRadio>
      <AmuRadio label="small">小</AmuRadio>
    </AmuRadioGroup>

    <AmuDescriptions title="自定义尺寸" :size="size" border>
      <template #extra>
        <AmuButton type="primary" size="small">编辑</AmuButton>
      </template>
      <AmuDescriptionsItem label="产品">云数据库</AmuDescriptionsItem>
      <AmuDescriptionsItem label="计费">包年包月</AmuDescriptionsItem>
      <AmuDescriptionsItem label="时间">18:00:00</AmuDescriptionsItem>
      <AmuDescriptionsItem label="成交">¥80.00</AmuDescriptionsItem>
      <AmuDescriptionsItem label="优惠">¥20.00</AmuDescriptionsItem>
      <AmuDescriptionsItem label="应付">¥60.00</AmuDescriptionsItem>
    </AmuDescriptions>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
import { AmuButton } from 'amu-ui/button'
import { AmuRadioGroup, AmuRadio } from 'amu-ui/radio'
import { AmuSpace } from 'amu-ui/space'

const size = ref('default')
</script>
