<template>
  <AmuDropdown @select="handleSelect">
    <AmuButton type="primary" :icon="IconChevronDown">
      Dropdown Menu
      <AmuIcon :icon="IconChevronDown" />
    </AmuButton>
    <template #overlay>
      <AmuDropdownMenu>
        <AmuDropdownItem command="1">Action 1</AmuDropdownItem>
        <AmuDropdownItem command="2">Action 2</AmuDropdownItem>
        <AmuDropdownItem command="3" disabled>Disabled Action</AmuDropdownItem>
        <AmuDropdownItem divided command="4">Action 4</AmuDropdownItem>
      </AmuDropdownMenu>
    </template>
  </AmuDropdown>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuIcon, AmuMessage } from 'amu-ui'
import { IconChevronDown } from '@amu-ui/icons'
const handleSelect = (command: string | number | object | undefined) => {
  if (!command) return
  AmuMessage.info(`Clicked on item ${command}`)
}
</script>
