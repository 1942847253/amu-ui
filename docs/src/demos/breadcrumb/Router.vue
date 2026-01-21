<template>
  <amu-breadcrumb :routes="routes" />
</template>

<script lang="ts" setup>
import { AmuBreadcrumb } from 'amu-ui/breadcrumb'
import { IconHome, IconUser, IconSettings } from '@amu-ui/icons'

const routes = [
  { path: '/', title: 'Home', icon: IconHome },
  { 
    title: 'User Center', 
    icon: IconUser,
    children: [
      { path: '/user/profile', title: 'Profile' },
      { path: '/user/settings', title: 'Settings' }
    ]
  },
  { title: 'Departments' },
  { path: '/detail', title: 'Detail', icon: IconSettings }
]
</script>
