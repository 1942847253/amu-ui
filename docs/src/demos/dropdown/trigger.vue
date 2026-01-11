<template>
  <AmuSpace>
    <AmuDropdown trigger="hover">
      <AmuButton>Hover Me</AmuButton>
      <template #overlay>
        <AmuDropdownMenu>
          <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
          <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
        </AmuDropdownMenu>
      </template>
    </AmuDropdown>
    
    <AmuDropdown trigger="contextmenu">
      <AmuButton type="primary">
        Right Click Me
      </AmuButton>
      <template #overlay>
        <AmuDropdownMenu>
          <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
          <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
        </AmuDropdownMenu>
      </template>
    </AmuDropdown>
  </AmuSpace>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuSpace } from 'amu-ui'
</script>
