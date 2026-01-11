<template>
  <AmuDropdown>
    <AmuButton type="primary">Cascading Menu</AmuButton>
    <template #overlay>
      <AmuDropdownMenu>
        <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
        <AmuDropdownItem>
          Menu Item 2
          <template #submenu>
            <AmuDropdownMenu>
              <AmuDropdownItem>Sub Item 2-1</AmuDropdownItem>
              <AmuDropdownItem>
                Sub Item 2-2
                <template #submenu>
                  <AmuDropdownMenu>
                    <AmuDropdownItem>Sub Item 2-2-1</AmuDropdownItem>
                    <AmuDropdownItem>Sub Item 2-2-2</AmuDropdownItem>
                  </AmuDropdownMenu>
                </template>
              </AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdownItem>
        <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
      </AmuDropdownMenu>
    </template>
  </AmuDropdown>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton } from 'amu-ui'
</script>
