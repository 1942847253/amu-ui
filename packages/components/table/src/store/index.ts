import { provide, inject, computed, ref } from 'vue'
import type { TableProps } from '../props'
import { useColumns } from './use-columns'
import { useData } from './use-data'
import { useSelection } from './use-selection'
import { useExpand } from './use-expand'

export const TABLE_INJECTION_KEY = Symbol('AmuTable')
export const TABLE_COLUMN_INJECTION_KEY = Symbol('AmuTableColumn')

export function createStore(props: TableProps, emit: any) {
  const { 
    columns, flatColumns, fixedLeftColumns, fixedRightColumns, notFixedColumns, fullRenderColumns, tableWidth, setColumns, insertColumn, resizeColumn, removeColumn, headerRows 
  } = useColumns(props)
  
  const { tableData, sortState, filters, handleSort, handleFilterChange } = useData(props, columns, emit)

  const {
    selection,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    isRowSelected,
    isAllSelected,
    isIndeterminate
  } = useSelection(props, tableData, emit)

  const { expandedRowKeys, isRowExpanded, toggleRowExpansion } = useExpand(props, emit)

  // Tooltip State
  const tooltipState = ref<{ el: HTMLElement, content: string } | null>(null)
  
  const setTooltip = (el: HTMLElement | null, content: string = '') => {
    if (!el) {
      tooltipState.value = null
    } else {
      tooltipState.value = { el, content }
    }
  }

  const store = {
    props,
    columns,
    flatColumns,
    fullRenderColumns,
    tableWidth, 
    fixedLeftColumns, 
    fixedRightColumns,
    notFixedColumns,
    setColumns,
    insertColumn,
    resizeColumn,
    removeColumn,
    headerRows,
    
    tableData,
    sortState,
    filters,
    handleSort,
    handleFilterChange,

    selection,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    isRowSelected,
    isAllSelected,
    isIndeterminate,

    expandedRowKeys,
    isRowExpanded,
    toggleRowExpansion,

    tooltipState,
    setTooltip: (el: HTMLElement | null, content: string = '') => {
        if (tooltipState.value?.el === el) {
             tooltipState.value = null
        } else {
             if (el) {
               tooltipState.value = { el, content }
             } else {
               tooltipState.value = null
             }
        }
    }
  }

  provide(TABLE_INJECTION_KEY, store)

  return store
}

export function useTableStore() {
  return inject(TABLE_INJECTION_KEY) as ReturnType<typeof createStore>
}
