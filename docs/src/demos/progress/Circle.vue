<template>
  <amu-space wrap :size="20">
    <amu-progress type="circle" :percentage="0" />
    <amu-progress type="circle" :percentage="25" />
    <amu-progress type="circle" :percentage="100" status="success" />
    <amu-progress type="circle" :percentage="70" status="warning" />
    <amu-progress type="circle" :percentage="50" status="exception" />
  </amu-space>
</template>

<script lang="ts" setup>
import { AmuProgress, AmuSpace } from 'amu-ui'
</script>
