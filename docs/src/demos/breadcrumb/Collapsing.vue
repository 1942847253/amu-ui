<template>
  <div>
    <p>Max Items: 3</p>
    <amu-breadcrumb :routes="routes" :max-items="3" />
    
    <p style="margin-top: 20px;">Max Items: 4</p>
    <amu-breadcrumb :routes="routes" :max-items="4" />
  </div>
</template>

<script lang="ts" setup>
import { AmuBreadcrumb } from 'amu-ui/breadcrumb'

const routes = [
  { path: '/', title: 'Home' },
  { path: '/project', title: 'Project' },
  { path: '/project/ui', title: 'Components' },
  { path: '/project/ui/breadcrumb', title: 'Breadcrumb' },
  { path: '/project/ui/breadcrumb/detail', title: 'Detail' },
]
</script>
