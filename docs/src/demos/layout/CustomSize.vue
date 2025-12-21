<template>
  <amu-layout style="min-height: 400px">
    <amu-header
      :height="80"
      style="background: #7dbcea; color: #fff; display: flex; align-items: center; justify-content: center"
    >
      Custom Height Header (80px)
    </amu-header>
    <amu-layout>
      <amu-sider
        :width="250"
        style="background: #3ba0e9; color: #fff; display: flex; align-items: center; justify-content: center"
      >
        Custom Width Sider (250px)
      </amu-sider>
      <amu-content style="background: #108ee9; color: #fff; text-align: center; line-height: 200px">
        Content
      </amu-content>
    </amu-layout>
    <amu-footer
      :height="100"
      style="background: #7dbcea; color: #fff; display: flex; align-items: center; justify-content: center"
    >
      Custom Height Footer (100px)
    </amu-footer>
  </amu-layout>
</template>

<script setup lang="ts">
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from 'amu-ui/layout'
</script>
