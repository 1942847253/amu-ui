<template>
  <AmuDescriptions title="订单信息" border>
    <AmuDescriptionsItem label="产品">云数据库</AmuDescriptionsItem>
    <AmuDescriptionsItem label="计费方式">包年包月</AmuDescriptionsItem>
    <AmuDescriptionsItem label="自动续费">是</AmuDescriptionsItem>
    <AmuDescriptionsItem label="下单时间">2018-04-24 18:00:00</AmuDescriptionsItem>
    <AmuDescriptionsItem label="使用时间" :span="2">2019-04-24 18:00:00</AmuDescriptionsItem>
    <AmuDescriptionsItem label="状态" :span="3">
      <AmuTag color="green" bordered>运行中</AmuTag>
    </AmuDescriptionsItem>
    <AmuDescriptionsItem label="成交金额">¥80.00</AmuDescriptionsItem>
    <AmuDescriptionsItem label="优惠">¥20.00</AmuDescriptionsItem>
    <AmuDescriptionsItem label="应付">¥60.00</AmuDescriptionsItem>
    <AmuDescriptionsItem label="配置信息">
      数据盘类型：MongoDB
      <br />
      数据库版本：3.4
      <br />
      规格：dds.mongo.mid
      <br />
      存储空间：10 GB
      <br />
      复制因子：3
      <br />
      区域：华东 1
      <br />
    </AmuDescriptionsItem>
  </AmuDescriptions>
</template>

<script setup lang="ts">
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
import { AmuTag } from 'amu-ui/tag'
</script>
