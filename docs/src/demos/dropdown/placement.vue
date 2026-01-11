<template>
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px 0;">
    <!-- Top Row -->
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <AmuSpace>
        <AmuDropdown placement="top-start">
          <AmuButton>Top Start</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>
        
        <AmuDropdown placement="top">
          <AmuButton>Top Center</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>

        <AmuDropdown placement="top-end">
          <AmuButton>Top End</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>
      </AmuSpace>
    </div>

    <!-- Middle Row -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <AmuDropdown placement="left-start">
        <AmuButton>Left Start</AmuButton>
        <template #overlay>
          <AmuDropdownMenu>
            <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
            <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
            <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
          </AmuDropdownMenu>
        </template>
      </AmuDropdown>

      <AmuDropdown placement="right-start">
        <AmuButton>Right Start</AmuButton>
        <template #overlay>
          <AmuDropdownMenu>
            <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
            <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
            <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
          </AmuDropdownMenu>
        </template>
      </AmuDropdown>
    </div>

    <!-- Bottom Row -->
    <div style="display: flex; justify-content: center;">
      <AmuSpace>
        <AmuDropdown placement="bottom-start">
          <AmuButton>Bottom Start</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>
        
        <AmuDropdown placement="bottom">
          <AmuButton>Bottom Center</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>

        <AmuDropdown placement="bottom-end">
          <AmuButton>Bottom End</AmuButton>
          <template #overlay>
            <AmuDropdownMenu>
              <AmuDropdownItem>Menu Item 1</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 2</AmuDropdownItem>
              <AmuDropdownItem>Menu Item 3</AmuDropdownItem>
            </AmuDropdownMenu>
          </template>
        </AmuDropdown>
      </AmuSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuSpace } from 'amu-ui'
</script>
