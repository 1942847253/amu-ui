<template>
  <div 
    class="amu-table"
    :class="[
      `amu-table--${props.size}`,
      { 'amu-table--border': props.border },
      { 'amu-table--stripe': props.stripe },
      { 'is-scrolling-left': scrollPosition.left },
      { 'is-scrolling-right': scrollPosition.right }
    ]"
    :style="wrapperStyle"
    v-loading="props.loading"
    :amu-loading-text="props.loadingText"
    :amu-loading-background="props.loadingBackground"
    :amu-loading-size="props.loadingSize"
    :amu-loading-spinner="typeof props.loadingSpinner === 'string' ? props.loadingSpinner : undefined"
  >
    <!-- Hidden slots for column collection -->
    <div class="hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>

    <!-- Main Header -->
    <div 
        class="amu-table__header-wrapper" 
        ref="headerWrapper"
        :style="{ paddingRight: gutterWidth + 'px' }"
    >
      <table class="amu-table__header" cellspacing="0" cellpadding="0" border="0" :style="{ width: store.tableWidth.value, minWidth: minTableWidth, tableLayout: 'fixed' }">
        <colgroup>
           <col 
             v-for="(col, index) in (store.fullRenderColumns.value as any[])" 
             :key="index" 
             :style="{ 
               width: col.width ? col.width + 'px' : (col.minWidth ? col.minWidth + 'px' : (col.fixed ? '80px' : undefined))
             }" 
           >
        </colgroup>
        <TableHeader />
      </table>
    </div>

    <!-- Main Body -->
    <div 
      class="amu-table__body-wrapper" 
      ref="bodyWrapper"
      :style="bodyStyle"
    >
      <VirtualScroller 
        v-if="props.virtual"
        ref="scrollbarRef"
        :items="store.tableData.value"
        :item-height="props.rowHeight"
        :enabled="true"
        @scroll="onScroll"
        v-slot="{ data }"
      >
        <table class="amu-table__body" cellspacing="0" cellpadding="0" border="0" :style="{ width: store.tableWidth.value, minWidth: minTableWidth, tableLayout: 'fixed' as const }">
           <colgroup>
             <col 
               v-for="(col, index) in (store.fullRenderColumns.value as any[])" 
               :key="index" 
               :style="{ 
                 width: col.width ? col.width + 'px' : (col.minWidth ? col.minWidth + 'px' : (col.fixed ? '80px' : undefined))
               }"
             >
           </colgroup>
           <TableBody :data="data" />
        </table>
      </VirtualScroller>
      
      <AmuScrollbar v-else ref="scrollbarRef" @scroll="onScroll">
        <table class="amu-table__body" cellspacing="0" cellpadding="0" border="0" :style="{ width: store.tableWidth.value, minWidth: minTableWidth, tableLayout: 'fixed' }">
          <colgroup>
               <col 
                 v-for="(col, index) in (store.fullRenderColumns.value as any[])" 
                 :key="index" 
                 :style="{ 
                   width: col.width ? col.width + 'px' : (col.minWidth ? col.minWidth + 'px' : (col.fixed ? '80px' : undefined))
                 }"
               >
          </colgroup>
          <TableBody :data="store.tableData.value" />
        </table>

        <!-- Empty Block -->
        <div v-if="!store.tableData.value.length" class="amu-table__empty">
          <slot name="empty">暂无数据</slot>
        </div>
      </AmuScrollbar>
    </div>

    <!-- Pagination -->
    <div 
      v-if="props.pagination && typeof props.pagination === 'object'" 
      class="amu-table__pagination"
    >
       <AmuPagination 
          v-bind="props.pagination" 
          @change="handlePageChange"
       />
    </div>

    <!-- Tooltip -->
    <AmuPopup 
        v-model="tooltipVisible"
        :virtual-ref="tooltipVirtualRef || undefined"
        trigger="manual"
        placement="top"
        :show-arrow="true"
        class="amu-table__tooltip-popup"
    >
        {{ tooltipContent }}
    </AmuPopup>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
import { tableProps, tableEmits } from './props'
import { createStore } from './store'
import TableHeader from './components/table-header'
import TableBody from './components/table-body'
import VirtualScroller from './components/virtual-scroller.vue'
import { AmuPopup } from '../../popup'
import { AmuLoadingDirective as vLoading } from '../../loading'
import { AmuPagination } from '../../pagination'
import Sortable from 'sortablejs'

defineOptions({
  name: 'AmuTable'
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const store = createStore(props, emit)
const headerWrapper = ref<HTMLElement>()
const bodyWrapper = ref<HTMLElement>()
const scrollPosition = ref({ left: false, right: false }) // Default false
const scrollbarRef = ref() 
const gutterWidth = ref(0) // Scrollbar gutter

// Tooltip logic
const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipVirtualRef = ref<HTMLElement | null>(null)

watch(() => store.tooltipState.value, (val) => {
   if (val) {
      tooltipVirtualRef.value = val.el
      tooltipContent.value = val.content
      tooltipVisible.value = true
   } else {
       tooltipVisible.value = false
       tooltipVirtualRef.value = null
   }
})

// Sync back when closed by click-outside
watch(tooltipVisible, (val) => {
    if (!val && store.tooltipState.value) {
        store.setTooltip(null)
    }
})

const handlePageChange = (current: number, pageSize: number) => {
    emit('page-change', current, pageSize)
}

const updateScrollState = () => {
    const wrap = scrollbarRef.value?.wrap
    if (wrap) {
      const scrollLeft = wrap.scrollLeft
      const maxScroll = wrap.scrollWidth - wrap.clientWidth
      
      // Calculate Gutter (Native scrollbar width detection)
      gutterWidth.value = wrap.offsetWidth - wrap.clientWidth

      // Check if scrollable
      if (maxScroll > 0) {
          scrollPosition.value.left = scrollLeft > 0
          scrollPosition.value.right = scrollLeft < maxScroll - 1
      } else {
          scrollPosition.value.left = false
          scrollPosition.value.right = false
      }
    }
}

const onScroll = ({ scrollLeft }: { scrollLeft: number }) => {
  if (headerWrapper.value) {
    headerWrapper.value.scrollLeft = scrollLeft
  }
  updateScrollState()
  store.setTooltip(null)
}

onMounted(() => {
    nextTick(() => {
        updateScrollState()
    })
})

// Watch data/columns changes to re-calc scroll state
watch(
    [store.tableData, store.fullRenderColumns], 
    () => {
       nextTick(() => updateScrollState())
    },
    { deep: true } // Columns array structure might change deeply? fullRenderColumns is computed ref
)


const minTableWidth = computed(() => {
  if (store.tableWidth.value !== '100%') return undefined
  const total = store.fullRenderColumns.value.reduce((acc: number, col: any) => {
    if (col.width) return acc + parseInt(String(col.width), 10)
    if (col.minWidth) return acc + parseInt(String(col.minWidth), 10)
    return acc + 80
  }, 0)
  return `${total}px`
})

const formatStyleSize = (val: string | number | undefined) => {
  if (val === undefined || val === '') return undefined
  if (typeof val === 'number') return `${val}px`
  if (/^\d+$/.test(val)) return `${val}px`
  return val
}

const wrapperStyle = computed(() => {
  return {
    height: formatStyleSize(props.height),
    maxHeight: formatStyleSize(props.maxHeight)
  }
})

const bodyStyle = computed(() => {
  // If height or maxHeight is provided, adapt overflow
  // With AmuScrollbar, we always want hidden on the wrapper
  return { 
    overflow: 'hidden'
  } 
})

// TODO: Sync scroll logic between header and body if body scrolls horizontally

// Drag & Drop
let sortable: Sortable | null = null

const initSortable = () => {
    if (sortable) sortable.destroy()
    if (!props.draggable) return
    if (props.virtual) return // Virtual scroll not supported yet

    const el = bodyWrapper.value?.querySelector('.amu-table__body tbody') as HTMLElement
    if (!el) return

    const options: any = {
        animation: 150,
        onEnd: (evt: any) => {
             const { newIndex, oldIndex } = evt
             if (newIndex === oldIndex) return
             
             const list = store.tableData.value
             emit('row-drag-end', {
                 newIndex,
                 oldIndex,
                 newRow: list[newIndex],
                 oldRow: list[oldIndex],
                 list
             })
        }
    }
    
    if (el.querySelector('.amu-table__drag-handle')) {
        options.handle = '.amu-table__drag-handle'
    }

    sortable = Sortable.create(el, options)
}

watch(() => props.draggable, initSortable)

onMounted(() => {
    nextTick(() => {
        initSortable()
    })
})

onBeforeUnmount(() => {
    if (sortable) sortable.destroy()
})
</script>

<style>
/* Simplified CSS for demo */
.amu-table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background-color: var(--amu-color-bg);
  font-size: 14px;
  color: var(--amu-color-text);
  
  /* Flex Layout for Fixed Header */
  display: flex;
  flex-direction: column;

  /* Fallback & Component Level Variables */
  --amu-table-border-color: var(--amu-color-border);
  --amu-table-header-bg: var(--amu-color-bg-fill); 
  --amu-table-row-hover-bg: var(--amu-color-bg-fill);
  --amu-table-stripe-bg: #fafafa; /* Light mode default */
  --amu-table-text-secondary: var(--amu-color-text-default);
  --amu-table-placeholder-color: #c0c4cc;
  --amu-table-row-selected-bg: #E8F3FF;

  --amu-table-expand-icon-color: var(--amu-color-text-default);
  --amu-table-expanded-cell-bg: var(--amu-color-bg-fill);
}

.amu-table__expand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  color: var(--amu-table-expand-icon-color);
}

.amu-table__expand-icon--expanded {
  transform: rotate(90deg);
}

.amu-table__expanded-cell {
  padding: 0;
  background-color: var(--amu-table-expanded-cell-bg); 
  border-bottom: 1px solid var(--amu-table-border-color);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-amu-theme]) .amu-table {
    --amu-table-stripe-bg: #2a2a2a; 
    --amu-table-row-selected-bg: rgba(22, 93, 255, 0.2);
  }
}
[data-amu-theme='dark'] .amu-table {
    --amu-table-stripe-bg: #2a2a2a;
    --amu-table-row-selected-bg: rgba(22, 93, 255, 0.2);
}

.amu-table__header-wrapper {
  overflow: hidden;
  border-bottom: 1px solid var(--amu-table-border-color);
  flex-shrink: 0;
}

.amu-table__body-wrapper {
  overflow: hidden; /* Changed from auto to hidden, let Scrollbar handle it */
  position: relative;
  flex: 1;
  min-height: 0; 
}

.amu-table__cell {
  padding: 8px 12px;
  border-bottom: 1px solid var(--amu-table-border-color);
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative; /* For Resize Proxy */
}

/* Resize Proxy */
.amu-table__column-resize-proxy {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  cursor: col-resize;
  z-index: 10;
  user-select: none;
}
.amu-table__column-resize-proxy:hover {
  border-right: 2px solid var(--amu-color-primary);
}

.amu-table__cell .cell {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 24px;
  line-height: 24px;
}

/* Size Variants */
.amu-table--small .amu-table__cell {
  padding: 4px 8px;
  font-size: 12px;
}

.amu-table--large .amu-table__cell {
  padding: 12px 16px;
  font-size: 16px;
}

.amu-table__header .amu-table__cell {
  color: var(--amu-table-text-secondary);
  font-weight: 600;
  background-color: var(--amu-table-header-bg);
  transition: background-color 0.2s;
}

.amu-table__header .amu-table__cell.is-sortable:hover {
  background-color: var(--amu-color-border) !important; /* Slightly darker than fill */
  cursor: pointer;
}

.caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 14px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}

.sort-caret.ascending {
  border-bottom-color: var(--amu-table-placeholder-color);
  top: -5px;
}
.sort-caret.descending {
  border-top-color: var(--amu-table-placeholder-color);
  bottom: -3px;
}
.sort-caret.ascending.active {
  border-bottom-color: var(--amu-color-primary);
}
.sort-caret.descending.active {
  border-top-color: var(--amu-color-primary);
}

/* Fixed Columns Shadows */
.is-scrolling-left .amu-table__cell.is-last-left::after {
  content: '';
  position: absolute;
  top: 0;
  right: -10px;
  bottom: 0;
  width: 10px;
  box-shadow: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 10;
}

.is-scrolling-right .amu-table__cell.is-first-right::after {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  bottom: 0;
  width: 10px;
  box-shadow: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 10;
}

[data-amu-theme='dark'] .is-scrolling-left .amu-table__cell.is-last-left::after,
[data-amu-theme='dark'] .is-scrolling-right .amu-table__cell.is-first-right::after {
    box-shadow: inset 10px 0 10px -10px rgba(255, 255, 255, 0.15);
}
[data-amu-theme='dark'] .is-scrolling-right .amu-table__cell.is-first-right::after {
    box-shadow: inset -10px 0 10px -10px rgba(255, 255, 255, 0.15);
}

/* Border Styles */
.amu-table--border {
  border: 1px solid var(--amu-table-border-color);
  /* Ensure bottom border is visible */
}

.amu-table--border .amu-table__cell {
  border-right: 1px solid var(--amu-table-border-color);
}

.amu-table--border .amu-table__cell.is-right-edge {
  border-right: none;
}

/* Fix double border at bottom if not virtual */
.amu-table--border .amu-table__body tr:last-child td {
  border-bottom: none;
}

/* Stripe Styles */
.amu-table__row--striped td {
  background-color: var(--amu-table-stripe-bg);
}

/* Selected Styles */
.amu-table__row--selected td {
  background-color: var(--amu-table-row-selected-bg);
}

/* Tooltip Styles */
.amu-table__cell .cell.amu-tooltip-cell {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Reset flex alignment for ellipsis */
  align-items: normal;
}

[data-amu-theme='dark'] .amu-table__tooltip-popup {
    --amu-popup-bg: #fff;
    --amu-popup-text-color: #303133;
}
.amu-table__tooltip-popup {
   padding: 8px 12px;
   font-size: 12px;
   line-height: 1.4;
   max-width: 400px;
   /* Popup component should handle basic styles, we override theme vars or specific props */
}

.amu-table__empty {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--amu-table-text-secondary);
  font-size: 14px;
  width: 100%;
}

.amu-table__pagination {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    background-color: var(--amu-color-bg);
}
</style>
