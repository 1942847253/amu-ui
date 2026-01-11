<template>
  <AmuDropdown @select="handleSelect">
    <AmuButton type="primary">
      Command & Icons
    </AmuButton>
    <template #overlay>
      <AmuDropdownMenu>
        <AmuDropdownItem icon="edit" :command="{ action: 'edit' }">Edit</AmuDropdownItem>
        <AmuDropdownItem icon="share-2" command="share">Share</AmuDropdownItem>
        <AmuDropdownItem icon="trash" command="delete" disabled>Delete</AmuDropdownItem>
        <AmuDropdownItem divided icon="settings" command="settings">Settings</AmuDropdownItem>
        <AmuDropdownItem icon="log-out" command="logout">Logout</AmuDropdownItem>
      </AmuDropdownMenu>
    </template>
  </AmuDropdown>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuMessage } from 'amu-ui'

const handleSelect = (command: any) => {
  AmuMessage.info(`Command: ${JSON.stringify(command)}`)
}
</script>
