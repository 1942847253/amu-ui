<template>
  <AmuSpace>
    <AmuDropdown :hide-on-click="false">
      <AmuButton type="primary">Keep Open on Click</AmuButton>
      <template #overlay>
        <AmuDropdownMenu>
          <AmuDropdownItem>Item 1</AmuDropdownItem>
          <AmuDropdownItem>Item 2</AmuDropdownItem>
          <AmuDropdownItem>Item 3</AmuDropdownItem>
        </AmuDropdownMenu>
      </template>
    </AmuDropdown>

    <AmuDropdown auto-width placement="bottom">
      <AmuButton type="primary" style="width: 300px">Auto Width (Match Trigger)</AmuButton>
      <template #overlay>
        <AmuDropdownMenu>
          <AmuDropdownItem>Short</AmuDropdownItem>
          <AmuDropdownItem>This menu matches the trigger width</AmuDropdownItem>
        </AmuDropdownMenu>
      </template>
    </AmuDropdown>
  </AmuSpace>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuSpace } from 'amu-ui'
</script>
