<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <amu-breadcrumb separator=">">
      <amu-breadcrumb-item>首页</amu-breadcrumb-item>
      <amu-breadcrumb-item>活动管理</amu-breadcrumb-item>
      <amu-breadcrumb-item>活动列表</amu-breadcrumb-item>
      <amu-breadcrumb-item>详情</amu-breadcrumb-item>
    </amu-breadcrumb>

    <amu-breadcrumb :separator-icon="IconArrowRight">
      <amu-breadcrumb-item>首页</amu-breadcrumb-item>
      <amu-breadcrumb-item>活动管理</amu-breadcrumb-item>
      <amu-breadcrumb-item>活动列表</amu-breadcrumb-item>
      <amu-breadcrumb-item>详情</amu-breadcrumb-item>
    </amu-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { AmuBreadcrumb, AmuBreadcrumbItem } from 'amu-ui/breadcrumb'
import { IconArrowRight } from '@amu-ui/icons'
</script>
