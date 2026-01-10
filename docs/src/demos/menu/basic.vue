<template>
  <div class="menu-demo">
    <amu-menu :default-selected-keys="['1']" style="width: 240px;">
      <amu-menu-item index="1">Option 1</amu-menu-item>
      <amu-menu-item index="2">Option 2</amu-menu-item>
      <amu-sub-menu index="sub1" title="Navigation One">
        <template #title>Navigation One</template>
        <amu-menu-item index="3">Option 3</amu-menu-item>
        <amu-menu-item index="4">Option 4</amu-menu-item>
        <amu-sub-menu index="sub1-2" title="Sub Menu">
           <template #title>Sub Menu</template>
           <amu-menu-item index="5">Option 5</amu-menu-item>
           <amu-menu-item index="6">Option 6</amu-menu-item>
        </amu-sub-menu>
      </amu-sub-menu>
      <amu-sub-menu index="sub2" title="Navigation Two">
         <template #title>Navigation Two</template>
         <amu-menu-item index="7">Option 7</amu-menu-item>
         <amu-menu-item index="8">Option 8</amu-menu-item>
      </amu-sub-menu>
      <amu-menu-item index="9" disabled>Disabled</amu-menu-item>
    </amu-menu>
  </div>
</template>

<script setup lang="ts">
import { AmuMenu, AmuMenuItem, AmuSubMenu, AmuMenuGroup } from 'amu-ui/menu'
</script>
