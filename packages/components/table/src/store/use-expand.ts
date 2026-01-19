import { ref } from 'vue'

export function useExpand(props: any, emit: any) {
  const expandedRowKeys = ref<any[]>([])

  const getRowKey = (row: any) => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey(row)
    }
    return row[props.rowKey]
  }

  const isRowExpanded = (row: any) => {
    const key = getRowKey(row)
    return expandedRowKeys.value.includes(key)
  }

  const toggleRowExpansion = (row: any, expanded?: boolean) => {
    const key = getRowKey(row)
    const included = expandedRowKeys.value.includes(key)

    if (expanded === undefined) {
      expanded = !included
    }

    if (expanded && !included) {
      expandedRowKeys.value.push(key)
      emit('expand-change', row, true)
    } else if (!expanded && included) {
      const index = expandedRowKeys.value.indexOf(key)
      expandedRowKeys.value.splice(index, 1)
      emit('expand-change', row, false)
    }
  }

  return {
    expandedRowKeys,
    isRowExpanded,
    toggleRowExpansion
  }
}
