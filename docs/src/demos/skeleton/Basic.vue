<template>
  <amu-space direction="vertical" fill>
    <p>Basic Skeleton:</p>
    <amu-skeleton />
    
    <p style="margin-top: 20px;">Skeleton with rows=3:</p>
    <amu-skeleton :rows="3" />
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuSkeleton, AmuSpace } from 'amu-ui'
</script>
