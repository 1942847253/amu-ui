<template>
  <div 
    class="amu-tabs"
    :class="[
      `amu-tabs--${type}`,
      `amu-tabs--${position}`,
      `amu-tabs--${size}`,
      `amu-tabs--surface-${surface}`
    ]"
  >
    <div class="amu-tabs__header" :class="[tabBarClass]">
      <div v-if="$slots.extra || tabBarExtraContent" class="amu-tabs__extra-left">
         <!-- Left Extra Content Reservation (if needed in future) -->
      </div>
      
      <div 
        class="amu-tabs__nav-wrap" 
        ref="navWrapRef" 
        :class="{ 
          'is-scrollable': isScrollable,
          'is-dragging': isDragging
        }"
      >
         <span class="amu-tabs__nav-prev" v-if="isScrollable" @click="scrollPrev">
           <AmuIcon><IconChevronLeft /></AmuIcon>
         </span>
         <span class="amu-tabs__nav-next" v-if="isScrollable" @click="scrollNext">
           <AmuIcon><IconChevronRight /></AmuIcon>
         </span>

         <div class="amu-tabs__nav-scroll" ref="navScrollRef" @mousedown="handleMouseDown">
            <div class="amu-tabs__nav" ref="navRef" role="tablist">
              <!-- Active Bar (Only for line type) -->
              <div 
                v-if="type === 'line'" 
                class="amu-tabs__active-bar"
                :style="activeBarStyle"
              ></div>

              <!-- Tabs -->
              <div 
                 v-for="(pane, index) in panes" 
                 :key="pane.name"
                 :class="[
                    'amu-tabs__item',
                    {
                      'is-active': pane.name === currentActiveKey,
                      'is-disabled': pane.props.disabled,
                      'is-closable': isClosable(pane)
                    }
                 ]"
                 role="tab"
                 :aria-selected="pane.name === currentActiveKey"
                 :tabindex="pane.props.disabled ? -1 : 0"
                 @click="handleTabClick(pane, $event)"
                 @keydown="handleKeyDown($event, index)"
                  :style="getTabStyle(index)"
                 :ref="el => setTabRef(el, pane.name)"
              >
                 <!-- Case: Line Type (Use AmuButton with Icon) -->
                 <template v-if="type === 'line'">
                    <AmuButton 
                      type="text" 
                      :disabled="pane.props.disabled" 
                      tabindex="-1"
                    >
                        <!-- Custom Icon Slot -->
                        <template #icon v-if="pane.props.icon || pane.slots?.icon">
                             <AmuIcon v-if="pane.props.icon">
                                 <component :is="pane.props.icon" />
                             </AmuIcon>
                             <AmuIcon v-else-if="pane.slots?.icon">
                                 <component :is="pane.slots.icon" />
                             </AmuIcon>
                        </template>

                        <!-- Title -->
                        <component :is="pane.slots.title" v-if="pane.slots?.title" />
                        <template v-else>{{ pane.props.title }}</template>
                    </AmuButton>
                 </template>

                 <!-- Case: Other Types (Manual Render) -->
                 <template v-else>
                     <!-- Icon -->
                     <span v-if="pane.props.icon || pane.slots?.icon" class="amu-tabs__icon">
                        <AmuIcon v-if="pane.props.icon">
                             <component :is="pane.props.icon" />
                        </AmuIcon>
                        <AmuIcon v-else-if="pane.slots?.icon">
                             <component :is="pane.slots.icon" />
                        </AmuIcon>
                     </span>
                     
                     <!-- Label -->
                     <span class="amu-tabs__label">
                         <component :is="pane.slots.title" v-if="pane.slots?.title" />
                         <template v-else>{{ pane.props.title }}</template>
                     </span>
                 </template>

                 <!-- Close Icon -->
                 <span 
                   v-if="isClosable(pane)" 
                   class="amu-tabs__close-icon"
                   @click.stop="handleTabRemove(pane, $event)"
                 >
                    <AmuIcon><IconX /></AmuIcon>
                 </span>
              </div>
            </div>
         </div>
      </div>

      <div 
        v-if="addable || editable"
        class="amu-tabs__item amu-tabs__new-tab"
        @click="handleAdd"
        tabindex="0"
        @keydown.enter="handleAdd"
      >
          <slot name="addIcon">
            <AmuIcon><IconPlus /></AmuIcon>
          </slot>
      </div>

      <div v-if="$slots.extra || tabBarExtraContent" class="amu-tabs__extra">
        <slot name="extra">{{ tabBarExtraContent }}</slot>
      </div>
    </div>

    <div class="amu-tabs__content">
       <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch, computed, nextTick, onMounted, onBeforeUnmount, type ComponentPublicInstance } from 'vue'
import { tabsProps, tabsEmits, tabsInjectionKey, type TabPaneContext } from './props'
import { IconX, IconPlus, IconChevronLeft, IconChevronRight } from '@amu-ui/icons'
import { AmuButton } from '../../button'
import { AmuIcon } from '../../icon'

defineOptions({
  name: 'AmuTabs'
})

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const panes = ref<TabPaneContext[]>([])
const navWrapRef = ref<HTMLElement>()
const navScrollRef = ref<HTMLElement>()
const navRef = ref<HTMLElement>()
const currentActiveKey = ref<string | number>(props.modelValue ?? props.defaultActiveKey ?? '')
const isScrollable = ref(false)
const tabRefs = ref<Map<string | number, HTMLElement>>(new Map())
const isDragging = ref(false)
let startX = 0
let startScrollLeft = 0
let isDragEvent = false

const handleMouseDown = (e: MouseEvent) => {
  if (props.position === 'left' || props.position === 'right') return
  if (!isScrollable.value) return

  isDragging.value = true
  isDragEvent = false
  startX = e.pageX
  startScrollLeft = navScrollRef.value?.scrollLeft || 0

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  const currentX = e.pageX
  const distance = currentX - startX
  
  // Threshold to consider it as a drag
  if (Math.abs(distance) > 5) {
    isDragEvent = true
    if (navScrollRef.value) {
      navScrollRef.value.scrollLeft = startScrollLeft - distance
    }
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  
  // Use a timeout to reset drag status to ensure click event handler can read it
  setTimeout(() => {
    isDragEvent = false
  }, 0)
}

const handleTabClick = (pane: TabPaneContext, ev: Event) => {
  if (isDragEvent) {
    ev.stopPropagation()
    return
  }
  if (pane.props.disabled) return
  
  emit('tabClick', pane.name, ev)

  if (currentActiveKey.value !== pane.name) {
    changeTab(pane.name)
  }
}

// Register/Unregister Tabs
const registerTab = (pane: TabPaneContext) => {
  panes.value.push(pane)
  // Auto set active key if not set
  if (currentActiveKey.value === '' && panes.value.length > 0) {
     if (!props.modelValue) {
        currentActiveKey.value = panes.value[0].name
     }
  }
}

const unregisterTab = (name: string | number) => {
  const index = panes.value.findIndex(p => p.name === name)
  if (index !== -1) {
    panes.value.splice(index, 1)
  }
}

// Provide context
provide(tabsInjectionKey, {
  activeKey: currentActiveKey,
  tabs: panes,
  registerTab,
  unregisterTab,
  onTabClick: handleTabClick,
  onTabRemove: handleTabRemove
})

// Watchers
watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== currentActiveKey.value) {
    currentActiveKey.value = val
    scrollToActiveTab() 
  }
})

watch(() => panes.value.length, () => {
   nextTick(() => {
     updateScrollability()
     updateActiveBar()
     scrollToActiveTab()
   })
})

watch(() => [props.position, props.type, props.size], () => {
   nextTick(() => {
     updateScrollability()
     updateActiveBar()
     scrollToActiveTab()
   })
})

// Handlers
async function changeTab(key: string | number) {
  const shouldLeave = props.beforeLeave ? await props.beforeLeave(key, currentActiveKey.value!) : true
  if (shouldLeave) {
    currentActiveKey.value = key
    emit('update:modelValue', key)
    emit('change', key)
    updateActiveBar()
    // Scroll to active tab
    scrollToActiveTab()
  }
}

function handleTabRemove(pane: TabPaneContext, e: Event) {
  if (pane.props.disabled) return
  e.stopPropagation()
  emit('tabRemove', pane.name)
  emit('edit', pane.name, 'remove')
}

function handleAdd() {
  emit('tabAdd')
  emit('edit', undefined, 'add')
}

// Helpers
const isClosable = (pane: TabPaneContext) => {
  if (pane.props.closable !== undefined) return pane.props.closable
  if (props.type === 'editable-card' || props.editable) return true
  return props.closable
}

const getTabStyle = (index: number) => {
  if (props.gutter <= 0) return undefined
  if (props.type === 'card' || props.type === 'editable-card') return undefined
  if (index === panes.value.length - 1) return undefined

  if (props.position === 'left' || props.position === 'right') {
    return {
      marginBottom: `${props.gutter}px`
    }
  }

  return {
    marginInlineEnd: `${props.gutter}px`
  }
}

// Active Bar Logic
const activeBarStyle = ref({})
const updateActiveBar = () => {
    if (props.type !== 'line') return
    const el = tabRefs.value.get(currentActiveKey.value!)
    if (!el || !navRef.value) return 

    // Horizontal logic mainly, Vertical needs different calculation
    if (props.position === 'top' || props.position === 'bottom') {
        const offsetLeft = el.offsetLeft
        const width = el.offsetWidth
        activeBarStyle.value = {
            transform: `translateX(${offsetLeft}px)`,
            width: `${width}px`
        }
    } else {
        const offsetTop = el.offsetTop
        const height = el.offsetHeight
         activeBarStyle.value = {
            transform: `translateY(${offsetTop}px)`,
            height: `${height}px`
        }
    }
}

const setTabRef = (el: Element | ComponentPublicInstance | null, name: string | number) => {
   if (el) {
     tabRefs.value.set(name, el as HTMLElement)
   }
}

// Scrolling Logic (Simplified version)
const updateScrollability = () => {
    if (!navScrollRef.value || !navRef.value) return
    if (props.position === 'top' || props.position === 'bottom') {
         isScrollable.value = navScrollRef.value.scrollWidth > navScrollRef.value.clientWidth
    } else {
         isScrollable.value = navScrollRef.value.scrollHeight > navScrollRef.value.clientHeight
    }
}

const scrollPrev = () => {
  if (!navScrollRef.value) return
  const currentScrollLeft = navScrollRef.value.scrollLeft
  const currentScrollTop = navScrollRef.value.scrollTop
  const wrapWidth = navScrollRef.value.offsetWidth
  const wrapHeight = navScrollRef.value.offsetHeight
  
  if (props.position === 'top' || props.position === 'bottom') {
      navScrollRef.value.scrollTo({
        left: currentScrollLeft - wrapWidth,
        behavior: 'smooth'
      })
  } else {
      navScrollRef.value.scrollTo({
        top: currentScrollTop - wrapHeight,
        behavior: 'smooth'
      })
  }
}

const scrollNext = () => {
  if (!navScrollRef.value) return
  const currentScrollLeft = navScrollRef.value.scrollLeft
  const currentScrollTop = navScrollRef.value.scrollTop
  const wrapWidth = navScrollRef.value.offsetWidth
  const wrapHeight = navScrollRef.value.offsetHeight

  if (props.position === 'top' || props.position === 'bottom') {
      navScrollRef.value.scrollTo({
        left: currentScrollLeft + wrapWidth,
        behavior: 'smooth'
      })
  } else {
      navScrollRef.value.scrollTo({
        top: currentScrollTop + wrapHeight,
        behavior: 'smooth'
      })
  }
}

const scrollToActiveTab = () => {
   if (!navScrollRef.value || !currentActiveKey.value) return
   const activeTab = tabRefs.value.get(currentActiveKey.value)
   if (!activeTab) return

   const navScroll = navScrollRef.value
   
   if (props.position === 'top' || props.position === 'bottom') {
       const activeLeft = activeTab.offsetLeft
       const activeWidth = activeTab.offsetWidth
       const wrapWidth = navScroll.offsetWidth
       const currentScroll = navScroll.scrollLeft

       if (activeLeft < currentScroll) {
           navScroll.scrollTo({ left: activeLeft, behavior: 'smooth' })
       } else if (activeLeft + activeWidth > currentScroll + wrapWidth) {
           navScroll.scrollTo({ left: activeLeft + activeWidth - wrapWidth, behavior: 'smooth' })
       }
   } else {
       // Vertical TODO: support vertical smooth scroll if needed, currently manual scroll works
       const activeTop = activeTab.offsetTop
       const activeHeight = activeTab.offsetHeight
       const wrapHeight = navScroll.offsetHeight
       const currentScroll = navScroll.scrollTop

       if (activeTop < currentScroll) {
            navScroll.scrollTo({ top: activeTop, behavior: 'smooth' })
       } else if (activeTop + activeHeight > currentScroll + wrapHeight) {
            navScroll.scrollTo({ top: activeTop + activeHeight - wrapHeight, behavior: 'smooth' })
       }
   }
}

// Keyboard nav
function handleKeyDown(e: KeyboardEvent, index: number) {
    // Arrow keys logic
    let nextIndex = index
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        nextIndex = index + 1
        if (nextIndex >= panes.value.length) nextIndex = 0
    } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        nextIndex = index - 1
        if (nextIndex < 0) nextIndex = panes.value.length - 1
    }

    if (nextIndex !== index) {
        e.preventDefault()
        const nextPane = panes.value[nextIndex]
        changeTab(nextPane.name)
        // Focus usually
        const el = tabRefs.value.get(nextPane.name)
        el?.focus()
    }
}

// Resize Observer
let resizeObserver: ResizeObserver | null = null

const setupResizeObserver = () => {
  if (typeof ResizeObserver === 'undefined') return
  
  resizeObserver = new ResizeObserver(() => {
      updateScrollability()
      updateActiveBar()
  })

  if (navWrapRef.value) {
      resizeObserver.observe(navWrapRef.value)
  }
  if (navRef.value) {
      resizeObserver.observe(navRef.value)
  }
}

onMounted(() => {
    updateScrollability()
    updateActiveBar()
    setupResizeObserver()
    // Ensure active bar position is correct after font loading or other async tasks
    nextTick(() => {
        updateActiveBar()
    })
})

onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

</script>
