<template>
  <amu-breadcrumb>
    <amu-breadcrumb-item to="/">
      <template #icon><IconHome /></template>
      首页
    </amu-breadcrumb-item>
    <amu-breadcrumb-item to="/components">
      <template #icon><IconLayers /></template>
      组件
    </amu-breadcrumb-item>
    <amu-breadcrumb-item>
      <template #icon><IconSettings /></template>
      配置
    </amu-breadcrumb-item>
  </amu-breadcrumb>
</template>

<script lang="ts" setup>
import { AmuBreadcrumb, AmuBreadcrumbItem } from 'amu-ui/breadcrumb'
import { IconHome, IconLayers, IconSettings } from '@amu-ui/icons'
</script>
