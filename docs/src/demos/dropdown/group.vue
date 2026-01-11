<template>
  <AmuDropdown>
    <AmuButton type="primary">Group & Shortcuts</AmuButton>
    <template #overlay>
      <AmuDropdownMenu>
        <AmuDropdownItem is-title>File Management</AmuDropdownItem>
        <AmuDropdownItem shortcut="Ctrl+N">New File</AmuDropdownItem>
        <AmuDropdownItem shortcut="Ctrl+O">Open File...</AmuDropdownItem>
        <AmuDropdownItem divided is-title>Editing</AmuDropdownItem>
        <AmuDropdownItem shortcut="Ctrl+X" disabled>Cut</AmuDropdownItem>
        <AmuDropdownItem shortcut="Ctrl+C">Copy</AmuDropdownItem>
        <AmuDropdownItem shortcut="Ctrl+V">Paste</AmuDropdownItem>
        <AmuDropdownItem divided active>Current Selection</AmuDropdownItem>
      </AmuDropdownMenu>
    </template>
  </AmuDropdown>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton } from 'amu-ui'
</script>
