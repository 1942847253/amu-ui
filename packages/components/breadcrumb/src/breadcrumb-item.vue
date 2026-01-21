<template>
  <span class="amu-breadcrumb-item">
    <!-- Case 1: With Dropdown -->
    <amu-dropdown v-if="hasOverlay" trigger="hover">
      <template #default>
        <span
          class="amu-breadcrumb-item__link"
          :class="{ 'is-active': !to && !clickable }"
        >
          <slot name="icon" />
          <slot />
          <amu-icon name="down" style="margin-left: 4px; font-size: 12px;"/>
        </span>
      </template>
      <template #overlay>
        <slot name="overlay">
          <!-- Default renderer for routes prop -->
          <amu-dropdown-menu v-if="routes && routes.length">
            <amu-dropdown-item v-for="(sub, idx) in routes" :key="idx">
               <component 
                 :is="sub.to ? 'router-link' : 'span'" 
                 :to="sub.to"
                 style="text-decoration: none; color: inherit; display: block; width: 100%;"
               >
                 {{ sub.title }}
               </component>
            </amu-dropdown-item>
          </amu-dropdown-menu>
        </slot>
      </template>
    </amu-dropdown>

    <!-- Case 2: Simple Link/Text -->
    <component
      v-else
      :is="to ? 'router-link' : 'span'"
      :to="to"
      :replace="replace"
      class="amu-breadcrumb-item__link"
      :class="{ 'is-active': !to }"
    >
      <slot name="icon" />
      <slot />
    </component>

    <!-- Separator -->
    <span class="amu-breadcrumb-item__separator" role="presentation">
      <component :is="separatorIcon" v-if="separatorIcon" />
      <span v-else>{{ separator }}</span>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { inject, computed, useSlots } from 'vue'
import { breadcrumbItemProps, breadcrumbItemEmits } from './props'
import { breadcrumbKey } from './constants'
import { AmuIcon } from '../../icon'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem } from '../../dropdown'

defineOptions({
  name: 'AmuBreadcrumbItem',
})

const props = defineProps(breadcrumbItemProps)
const emit = defineEmits(breadcrumbItemEmits)
const slots = useSlots()

const parent = inject(breadcrumbKey, undefined)

const separator = computed(() => parent?.separator ?? '/')
const separatorIcon = computed(() => parent?.separatorIcon)

const hasOverlay = computed(() => {
  return !!slots.overlay || (!!props.routes && props.routes.length > 0)
})

const clickable = computed(() => !!props.to || !!props.routes?.length)
</script>
