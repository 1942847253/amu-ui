<script lang="ts" setup>
import { ref } from 'vue'
import { IconSettings, IconSearch } from '@amu-ui/icons'

const activeKey = ref('settings')
</script>

<template>
  <amu-tabs v-model="activeKey">
    <amu-tab-pane name="settings">
      <template #title>
        <span style="display: flex; align-items: center; gap: 8px">
            <amu-icon><IconSettings /></amu-icon> Settings
        </span>
      </template>
      Settings Content
    </amu-tab-pane>
    <amu-tab-pane name="search">
       <template #title>
         <span style="display: flex; align-items: center; gap: 8px">
            <amu-icon><IconSearch /></amu-icon> Search
         </span>
      </template>
      Search Content
    </amu-tab-pane>
    
    <template #extra>
      <amu-button size="sm">Extra Action</amu-button>
    </template>
  </amu-tabs>
</template>
