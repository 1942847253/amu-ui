<template>
  <AmuSpace size="large">
     <AmuRadioGroup v-model="placement" >
      <AmuRadio label="left">Left</AmuRadio>
      <AmuRadio label="right">Right</AmuRadio>
      <AmuRadio label="top">Top</AmuRadio>
      <AmuRadio label="bottom">Bottom</AmuRadio>
    </AmuRadioGroup>

    <AmuButton type="primary" @click="visible = true">Open {{ placement }} Drawer</AmuButton>
    
    <AmuDrawer
      v-model="visible"
      title="Placement"
      :placement="placement"
    >
      <p>Content...</p>
      <p>Content...</p>
    </AmuDrawer>
  </AmuSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { DrawerPlacement } from 'amu-ui/drawer'
import { AmuSpace } from 'amu-ui';

const visible = ref(false)
const placement = ref<DrawerPlacement>('right')
</script>
