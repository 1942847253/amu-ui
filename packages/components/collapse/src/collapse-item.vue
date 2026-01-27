<template>
  <div
    class="amu-collapse-item"
    :class="{
      'is-active': isActive,
      'is-disabled': disabled,
    }"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`amu-collapse-content-${name}`"
      :aria-describedby="`amu-collapse-content-${name}`"
    >
      <div
        class="amu-collapse-item__header"
        :class="{
          'is-active': isActive,
          'is-disabled': disabled,
          'is-arrow-left': arrowPlacement === 'left',
          'is-arrow-right': arrowPlacement === 'right',
        }"
        @click="handleHeaderClick"
        @keydown.space.enter.stop.prevent="handleHeaderClick"
        tabindex="0"
      >
        <!-- Arrow Left -->
        <div
          v-if="showArrow && arrowPlacement === 'left'"
          class="amu-collapse-item__arrow is-left"
          :class="{ 'is-active': isActive }"
          @click="handleIconClick"
        >
          <AmuIcon>
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </AmuIcon>
        </div>

        <!-- Title -->
        <div class="amu-collapse-item__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <!-- Extra -->
        <div class="amu-collapse-item__extra" v-if="$slots.extra">
          <slot name="extra" />
        </div>

        <!-- Arrow Right -->
        <div
          v-if="showArrow && arrowPlacement === 'right'"
          class="amu-collapse-item__arrow is-right"
          :class="{ 'is-active': isActive }"
          @click="handleIconClick"
        >
          <AmuIcon>
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </AmuIcon>
        </div>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <div
        class="amu-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :id="`amu-collapse-content-${name}`"
        :aria-hidden="!isActive"
      >
        <div class="amu-collapse-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { collapseItemProps } from './props'
import { collapseContextKey } from './constants'
import { AmuIcon } from '../../icon'

defineOptions({
  name: 'AmuCollapseItem',
})

const props = defineProps(collapseItemProps)
const collapse = inject(collapseContextKey)

const name = computed(() => {
  return props.name ?? Math.random().toString(36).slice(2, 9)
})

const isActive = computed(() => {
  return collapse?.activeNames.value.includes(name.value)
})

const arrowPlacement = computed(() => collapse?.arrowPlacement.value ?? 'right')

const handleHeaderClick = () => {
  if (props.disabled) return
  if (props.trigger === 'header') {
    collapse?.handleItemClick(name.value)
  }
}

const handleIconClick = (e: MouseEvent) => {
  if (props.disabled) return
  if (props.trigger === 'icon') {
    e.stopPropagation()
    collapse?.handleItemClick(name.value)
  }
}

// Animation hooks
const beforeEnter = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  el.style.height = '0'
  el.style.opacity = '0'
  el.style.overflow = 'hidden'
}

const enter = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  // Trigger reflow
  el.offsetHeight
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
}

const afterEnter = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  el.style.height = ''
  el.style.opacity = ''
  el.style.overflow = ''
}

const beforeLeave = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
}

const leave = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  // Trigger reflow
  el.offsetHeight
  el.style.height = '0'
  el.style.opacity = '0'
}

const afterLeave = (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  el.style.height = ''
  el.style.opacity = ''
  el.style.overflow = ''
}
</script>
