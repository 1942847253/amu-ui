import { computed, ref, watch, nextTick, type SetupContext } from 'vue'
import type { PaginationProps, PaginationEmits } from './props'

export const usePagination = (
  props: PaginationProps,
  emit: SetupContext<PaginationEmits>['emit']
) => {
  // --- Page Size ---
  const internalPageSize = ref(props.pageSize ?? props.defaultPageSize)

  watch(() => props.pageSize, (val) => {
    if (val !== undefined) {
      internalPageSize.value = val
    }
  })

  // --- Total Pages ---
  const pageCount = computed(() => {
    const total = props.total
    const pageSize = internalPageSize.value
    if (total <= 0 || pageSize <= 0) return 0
    return Math.ceil(total / pageSize)
  })

  // --- Current Page ---
  const internalCurrent = ref(props.modelValue ?? props.current ?? props.defaultCurrent)

  watch(() => [props.modelValue, props.current], ([modelVal, currentVal]) => {
    const newVal = modelVal ?? currentVal
    if (newVal !== undefined && newVal !== internalCurrent.value) {
      internalCurrent.value = newVal
    }
  })

  // Ensure current page valid
  watch(pageCount, (val) => {
    if (internalCurrent.value > val && val > 0) {
      internalCurrent.value = val
      // Emit change if auto-corrected? Usually yes, but depends on requirement. 
      // The user requirement says: "total changes auto adjust current".
      // We should probably emit update event if it changed due to total change, 
      // but strictly speaking, it might trigger a loop if not careful.
      // Let's just correct internal value and emit update if needed.
      emitChange(val)
    }
  })

  // --- Actions ---
  const emitChange = (val: number) => {
    let newCurrent = val
    if (newCurrent < 1) newCurrent = 1
    if (newCurrent > pageCount.value && pageCount.value > 0) newCurrent = pageCount.value
    
    internalCurrent.value = newCurrent
    emit('update:modelValue', newCurrent)
    emit('change', newCurrent, internalPageSize.value)
  }

  const handleCurrentChange = (val: number) => {
    emitChange(val)
  }

  const hasPrev = computed(() => internalCurrent.value > 1)
  const hasNext = computed(() => internalCurrent.value < pageCount.value)

  const prev = () => {
    if (hasPrev.value) {
      handleCurrentChange(internalCurrent.value - 1)
    }
  }

  const next = () => {
    if (hasNext.value) {
      handleCurrentChange(internalCurrent.value + 1)
    }
  }

  const jumpTo = (page: number) => {
    handleCurrentChange(page)
  }

  // --- Page Size Change ---
  const handlePageSizeChange = (val: number) => {
    internalPageSize.value = val
    emit('update:pageSize', val)
    emit('pageSizeChange', val)
    
    // When size changes, total pages changes. 
    // We should check if current page is still valid.
    // Also user requirement: "Change pageSize auto return to first page" -> 
    // Wait, the requirement says "Change pageSize auto return to first page" OR "recalculate totalPages".
    // Requirement says: "改变 pageSize 自动回到第一页" (Change pageSize auto return to first page)
    // This is a specific behavior requested.
    
    if (internalCurrent.value !== 1) {
      handleCurrentChange(1)
    } else {
        // Even if it is 1, we might need to emit 'change' with new page size? 
        // The 'change' event signature is (page, pageSize).
        emit('change', 1, val)
    }
  }

  // --- Pagers Calculation ---
  const pagers = computed(() => {
    const pagerCount = props.pagerCount
    const currentPage = internalCurrent.value
    const totalPages = pageCount.value

    const showPrevMore = ref(false)
    const showNextMore = ref(false)
    
    if (totalPages <= pagerCount) {
        // Case 1: Total pages less than pagerCount -> Show all
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Case 2: Complex folding
    const halfPagerCount = (pagerCount - 1) / 2
    
    let showPrevMoreVal = false
    let showNextMoreVal = false

    if (currentPage > halfPagerCount + 2) {
        showPrevMoreVal = true
    }
    if (currentPage < totalPages - halfPagerCount - 1) {
        showNextMoreVal = true
    }

    const array: (number | 'prev-more' | 'next-more')[] = []
    
    // Always show first
    if (totalPages > 0) array.push(1)

    if (showPrevMoreVal && !showNextMoreVal) {
        // ... (near end)
        array.push('prev-more')
        const startPage = totalPages - (pagerCount - 2)
        for (let i = startPage; i < totalPages; i++) {
            array.push(i)
        }
    } else if (!showPrevMoreVal && showNextMoreVal) {
        // (near start) ...
        for (let i = 2; i < pagerCount; i++) {
            array.push(i)
        }
        array.push('next-more')
    } else if (showPrevMoreVal && showNextMoreVal) {
        // ... (middle) ...
        array.push('prev-more')
        const offset = Math.floor(pagerCount - 4) / 2 // -4 because: 1, ..., ..., last.
        // Actually for pagerCount=7: 1 ... 4 5 6 ... 100. Middle has 3 items?
        // 7 items: 1, ..., current-1, current, current+1, ..., last
        // So offset = (7 - 2 (ends) - 2 (dots)) / 2 = 1.5? No.
        // If pagerCount=7. We want 5 numbers + 2 dots? No, pagerCount is total BUTTONS.
        // 1, ..., a, b, c, ..., n. That is 7 items. a,b,c are 3 items.
        // So count = pagerCount - 4? No. count = pagerCount - 4 (1, n, 2 dots).
        const count = pagerCount - 4
        // If pagerCount=7, count=3. range is current-1 to current+1.
        // offset = (count - 1) / 2
        for (let i = currentPage - Math.floor((count - 1) / 2); i <= currentPage + Math.ceil((count - 1) / 2); i++) {
             array.push(i)
        }
        array.push('next-more')
    } else {
        // Should catch all above?
        // Fallback for edge cases like small pagerCount
        for (let i = 2; i < totalPages; i++) {
            array.push(i)
        }
    }

    // Always show last
    if (totalPages > 1) {
        array.push(totalPages)
    }

    return array
  })

  return {
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
    handleCurrentChange // expose for jumper
  }
}
