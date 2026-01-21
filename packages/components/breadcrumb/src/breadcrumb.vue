<template>
  <div class="amu-breadcrumb" aria-label="Breadcrumb">
    <slot v-if="!routes || routes.length === 0" />
    <template v-else>
      <amu-breadcrumb-item
        v-for="(item, index) in displayRoutes"
        :key="item.path || index"
        :to="item.to || (item.clickable !== false ? item.path : undefined)"
        :replace="!!item.to"
        :routes="item.children"
      >
        <!-- Icon -->
        <template v-if="item.icon" #icon>
          <component :is="item.icon" v-if="typeof item.icon === 'object'" />
          <amu-icon v-else :name="String(item.icon)" />
        </template>
        
        <!-- Content/Title -->
        {{ item.title }}

        <!-- Dropdown for collapsed item -->
        <template v-if="item.meta?.isCollapsed" #overlay>
          <amu-dropdown-menu>
            <amu-dropdown-item 
              v-for="(sub, subIndex) in item.children" 
              :key="subIndex"
            >
              <component :is="sub.to || sub.path ? 'router-link' : 'span'" :to="sub.to || sub.path" style="text-decoration: none; color: inherit;">
                {{ sub.title }}
              </component>
            </amu-dropdown-item>
          </amu-dropdown-menu>
        </template>
      </amu-breadcrumb-item>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed, toRef } from 'vue'
import { breadcrumbProps } from './props'
import { breadcrumbKey } from './constants'
import AmuBreadcrumbItem from './breadcrumb-item.vue'
import { AmuIcon } from '../../icon'
import { AmuDropdownMenu, AmuDropdownItem } from '../../dropdown'
import type { BreadcrumbRoute } from './props'

defineOptions({
  name: 'AmuBreadcrumb',
})

const props = defineProps(breadcrumbProps)

provide(breadcrumbKey, {
  separator: props.separator,
  separatorIcon: props.separatorIcon,
})

const displayRoutes = computed(() => {
  if (!props.maxItems || !props.routes || props.routes.length <= props.maxItems) {
    return props.routes
  }

  // Logic: Always show first and last. Collapse in between if needed.
  // If maxItems is small (e.g. 3), show 1, collapsed, last.
  
  const startItem = props.routes[0]
  const endItem = props.routes[props.routes.length - 1]
  
  // Create a collapsed item representing the middle
  const collapsedItems = props.routes.slice(1, props.routes.length - 1)
  const collapsedNode: BreadcrumbRoute = {
    title: '...',
    children: collapsedItems,
    meta: { isCollapsed: true },
  }

  return [startItem, collapsedNode, endItem]
})
</script>

<style src="./style.css"></style>
