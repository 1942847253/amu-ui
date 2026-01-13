<template>
  <nav 
    v-if="!simple" 
    :class="[
      'amu-pagination',
      `amu-pagination--${size}`,
      {
        'amu-pagination--background': background,
        'amu-pagination--disabled': disabled
      }
    ]" 
    role="navigation" 
    aria-label="pagination"
  >
    <!-- Total -->
    <span v-if="showTotal || $slots.totalRender" class="amu-pagination__total">
       <slot name="totalRender" :total="total" :range="range">
         {{ typeof showTotal === 'function' ? showTotal(total, range) : t('el.pagination.total').replace('{total}', total) }}
       </slot>
    </span>

    <!-- Prev -->
    <button 
      class="amu-pagination__prev" 
      :disabled="disabled || !hasPrev" 
      @click="prev"
      type="button"
      :aria-disabled="disabled || !hasPrev"
      aria-label="Previous Page"
    >
       <slot name="prevIcon">
          <AmuIcon><IconChevronLeft /></AmuIcon>
       </slot>
    </button>

    <!-- Pagers -->
    <ul class="amu-pagination__pager">
       <template v-for="(page, index) in pagers" :key="index">
         <li 
           v-if="typeof page === 'number'"
           :class="[
              'amu-pagination__item',
              {
                 'is-active': internalCurrent === page,
                 'is-disabled': disabled
              }
           ]"
           @click="onPagerClick(page)"
           role="button"
           :aria-current="internalCurrent === page ? 'page' : undefined"
           :tabindex="disabled ? -1 : 0"
           @keydown.enter="onPagerClick(page)"
         >
            <slot name="itemRender" :page="page" :active="internalCurrent === page">
                {{ page }}
            </slot>
         </li>
         
         <!-- More Prev -->
         <li 
           v-else-if="page === 'prev-more'"
           class="amu-pagination__item amu-pagination__more"
           @mouseenter="onMouseenter('prev')"
           @mouseleave="onMouseleave('prev')"
           @click="onMorePrevClick"
           role="button"
           aria-label="Previous 5 Pages"
           :tabindex="disabled ? -1 : 0"
         >
            <AmuIcon v-if="quickPrevHover"><IconChevronsLeft /></AmuIcon>
            <AmuIcon v-else><IconMoreHorizontal /></AmuIcon>
         </li>

         <!-- More Next -->
         <li 
           v-else-if="page === 'next-more'" 
           class="amu-pagination__item amu-pagination__more"
           @mouseenter="onMouseenter('next')"
           @mouseleave="onMouseleave('next')"
           @click="onMoreNextClick"
           role="button"
           aria-label="Next 5 Pages"
           :tabindex="disabled ? -1 : 0"
         >
            <AmuIcon v-if="quickNextHover"><IconChevronsRight /></AmuIcon>
            <AmuIcon v-else><IconMoreHorizontal /></AmuIcon>
         </li>
       </template>
    </ul>

    <!-- Next -->
    <button 
      class="amu-pagination__next" 
      :disabled="disabled || !hasNext" 
      @click="next"
      type="button"
      :aria-disabled="disabled || !hasNext"
      aria-label="Next Page"
    >
        <slot name="nextIcon">
          <AmuIcon><IconChevronRight /></AmuIcon>
       </slot>
    </button>

    <!-- Size Changer -->
    <span v-if="showSizeChanger" class="amu-pagination__sizes">
       <AmuSelect 
          :model-value="internalPageSize"
          :disabled="disabled"
          :size="selectSize" 
          placement="bottom"
          fit-input-width
          @change="(val: any) => handlePageSizeChange(val as number)"
          :options="sizeOptionsFormatted"
       />
    </span>

    <!-- Quick Jumper -->
    <span v-if="showQuickJumper" class="amu-pagination__jump">
        {{ t('el.pagination.goto') }}
        <div class="amu-pagination__editor">
           <AmuInput 
              v-model="jumperValue"
              :disabled="disabled"
              :size="inputSize"
              @change="handleJump"
           />
        </div>
        {{ t('el.pagination.pageClassifier') }}
    </span>
  </nav>

  <!-- Simple Mode -->
  <nav 
    v-else 
    :class="[
      'amu-pagination',
      'amu-pagination--simple',
      `amu-pagination--${size}`,
      {
        'amu-pagination--disabled': disabled
      }
    ]" 
    role="navigation"
  >
      <button 
        class="amu-pagination__prev" 
        :disabled="disabled || !hasPrev" 
        @click="prev"
        type="button"
      >
        <AmuIcon><IconChevronLeft /></AmuIcon>
      </button>
      <span class="amu-pagination__simple-pager">
         <AmuInput 
            :model-value="internalCurrent"
            :disabled="disabled"
            size="small"
            class="amu-pagination__simple-input"
            @change="(val: string | number) => jumpTo(Number(val))"
         />
         <span class="amu-pagination__slash">/</span>
         <span class="amu-pagination__simple-total">{{ pageCount }}</span>
      </span>
      <button 
        class="amu-pagination__next" 
        :disabled="disabled || !hasNext" 
        @click="next"
        type="button"
      >
         <AmuIcon><IconChevronRight /></AmuIcon>
      </button>

      <span v-if="showSizeChanger" class="amu-pagination__sizes">
         <AmuSelect 
            :model-value="internalPageSize"
            :disabled="disabled"
            size="small" 
            placement="bottom"
            fit-input-width
            @change="(val: any) => handlePageSizeChange(val as number)"
            :options="sizeOptionsFormatted"
         />
      </span>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { paginationProps, paginationEmits } from './props'
import { usePagination } from './use-pagination'
import { useLocale } from '@amu-ui/hooks'
import { 
  IconChevronLeft, 
  IconChevronRight, 
  IconChevronsLeft, 
  IconChevronsRight, 
  IconMoreHorizontal 
} from '@amu-ui/icons'
import { AmuIcon } from '../../icon'
import { AmuSelect } from '../../select'
import { AmuInput } from '../../input'

defineOptions({
  name: 'AmuPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)
const { t } = useLocale()

const {
  internalCurrent,
  internalPageSize,
  pageCount,
  pagers,
  hasPrev,
  hasNext,
  prev,
  next,
  jumpTo,
  handlePageSizeChange,
  handleCurrentChange
} = usePagination(props, emit)

// --- Interaction ---
const quickPrevHover = ref(false)
const quickNextHover = ref(false)

const onMouseenter = (direction: 'prev' | 'next') => {
  if (props.disabled) return
  if (direction === 'prev') quickPrevHover.value = true
  else quickNextHover.value = true
}

const onMouseleave = (direction: 'prev' | 'next') => {
  if (direction === 'prev') quickPrevHover.value = false
  else quickNextHover.value = false
}

const onPagerClick = (page: number) => {
  if (props.disabled) return
  handleCurrentChange(page)
}

const onMorePrevClick = () => {
  if (props.disabled) return
  jumpTo(internalCurrent.value - 5)
}

const onMoreNextClick = () => {
   if (props.disabled) return
   jumpTo(internalCurrent.value + 5)
}

// --- Jumper ---
const jumperValue = ref<string | number>(internalCurrent.value)

watch(internalCurrent, (val) => {
  jumperValue.value = val
})

const handleJump = () => {
   if (props.disabled) return
   const val = Number(jumperValue.value)
   if (!isNaN(val)) {
      jumpTo(val)
      // reset to valid if jumpTo corrected it (which it does internally, but doesn't return result)
      // internalCurrent watcher will fix jumperValue
   } else {
      jumperValue.value = internalCurrent.value
   }
}

// --- Helpers ---
const range = computed<[number, number]>(() => {
  const start = (internalCurrent.value - 1) * internalPageSize.value + 1
  const end = Math.min(internalCurrent.value * internalPageSize.value, props.total)
  return [start, end]
})

const componentSize = computed(() => {
  return props.size
})

const selectSize = computed(() => {
  return props.size
})

const inputSize = computed(() => {
  return props.size === 'default' ? 'medium' : props.size
})

const sizeOptionsFormatted = computed(() => {
  return props.pageSizeOptions.map(opt => ({
    label: `${opt} ${t('el.pagination.pagesize')}`,
    value: opt
  }))
})

</script>
