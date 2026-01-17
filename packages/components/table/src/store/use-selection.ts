import { ref, computed, toRef, unref, watch } from 'vue'
import type { TableProps } from '../props'

export function useSelection(props: TableProps, data: any, emit: any) {
  const selection = ref<any[]>([])
  
  watch(
    selection, 
    (val) => {
        emit('selection-change', val)
    },
    { deep: true }
  )
  
  // 获取行唯一标识
  const getRowKey = (row: any, index: number) => {
    const { rowKey } = props
    if (typeof rowKey === 'string') {
      return row[rowKey]
    }
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    return index // 兜底使用索引（不推荐用于生产）
  }

  // 判断某行是否选中
  const isRowSelected = (row: any, index: number) => {
    const key = getRowKey(row, index)
    return selection.value.some((item, i) => getRowKey(item, i) === key)
  }

  // 切换行选中状态
  const toggleRowSelection = (row: any, selected?: boolean) => {
    // 如果未传入 selected，则取反
    const isSelected = isRowSelected(row, -1) // -1 index here assumes key doesn't depend on index
    const shouldSelect = selected === undefined ? !isSelected : selected

    if (shouldSelect && !isSelected) {
      selection.value.push(row)
    } else if (!shouldSelect && isSelected) {
      const key = getRowKey(row, -1)
      const idx = selection.value.findIndex((item, i) => getRowKey(item, i) === key)
      if (idx > -1) {
        selection.value.splice(idx, 1)
      }
    }
  }

  // 全选/取消全选
  const toggleAllSelection = () => {
    // 简单策略：如果当前选中数量等于当前页数据量，则清空；否则全选当前页
    // 这里依赖传入的 data (可能是当前页数据，也可能是全量数据，取决于分页策略)
    const currentData = unref(data)
    if (!currentData || currentData.length === 0) return

    const isAllSelected = selection.value.length === currentData.length && selection.value.length > 0;
    
    if (isAllSelected) {
        clearSelection()
    } else {
        // 全选当前视图数据
        selection.value = [...currentData]
    }
  }
  
  // 清空
  const clearSelection = () => {
    selection.value = []
  }

  // 计算属性：是否全选状态（用于表头 Checkbox）
  // 注意：这里仅判断当前 View Data 是否都在 selection 中
  const isAllSelected = computed(() => {
    const currentData = unref(data)
    if (!currentData || currentData.length === 0) return false
    // 检查每一行是否都在 selection 中
    // 性能优化：如果 selection 长度小于 data 长度，肯定没全选
    if (selection.value.length < currentData.length) return false
    
    return currentData.every((row: any) => 
        selection.value.some((sel: any) => getRowKey(sel, -1) === getRowKey(row, -1))
    )
  })

  // 计算属性：是否半选状态
  const isIndeterminate = computed(() => {
    const currentData = unref(data)
    if (!currentData || currentData.length === 0) return false;
    
    // 有选中的，但不是全部
    const selectedCountInCurrentPage = currentData.filter((row: any) => 
        selection.value.some((sel: any) => getRowKey(sel, -1) === getRowKey(row, -1))
    ).length
    
    return selectedCountInCurrentPage > 0 && selectedCountInCurrentPage < currentData.length
  })

  return {
    selection,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    isRowSelected,
    isAllSelected,
    isIndeterminate
  }
}
