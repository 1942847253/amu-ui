<template>
  <div class="amu-dropdown-menu" role="menu" :tabindex="-1">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { dropdownMenuProps } from './props'

defineOptions({
  name: 'AmuDropdownMenu',
})

defineProps(dropdownMenuProps)
</script>
