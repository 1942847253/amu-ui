<template>
  <amu-layout style="min-height: 400px">
    <amu-sider
      v-model:collapsed="collapsed"
      collapsible
      :collapsed-width="0"
      style="background: #3ba0e9; color: #fff"
    >
      <div style="padding: 20px">
        <div style="margin-bottom: 10px">Menu Item 1</div>
        <div style="margin-bottom: 10px">Menu Item 2</div>
        <div style="margin-bottom: 10px">Menu Item 3</div>
      </div>
    </amu-sider>
    <amu-layout>
      <amu-header style="background: #7dbcea; color: #fff; display: flex; align-items: center">
        <span 
          style="cursor: pointer; margin-right: 16px; font-size: 18px" 
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? 'Menu' : 'Collapse' }}
        </span>
        Header
      </amu-header>
      <amu-content style="background: #108ee9; color: #fff; text-align: center; line-height: 200px">
        Content (侧边栏可完全收起)
      </amu-content>
      <amu-footer style="background: #7dbcea; color: #fff">Footer</amu-footer>
    </amu-layout>
  </amu-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from 'amu-ui/layout'

const collapsed = ref(false)
</script>
