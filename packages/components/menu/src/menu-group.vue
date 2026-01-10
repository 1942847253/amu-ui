<template>
  <li class="amu-menu-group">
    <div class="amu-menu-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul class="amu-menu-group__list">
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { menuGroupProps } from './props'

defineOptions({
  name: 'AmuMenuGroup'
})

defineProps(menuGroupProps)
</script>
