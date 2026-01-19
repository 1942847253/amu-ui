import { defineComponent, h, inject, ref } from 'vue'
import { TABLE_INJECTION_KEY } from '../store'
import { AmuCheckbox } from '../../../checkbox' // Correct path to checkbox component
import FilterPanel from './filter-panel.vue'

export default defineComponent({
  name: 'AmuTableHeader',
  setup() {
    const store = inject(TABLE_INJECTION_KEY) as any

    const draggingColumn = ref<any>(null)
    const draggingStartX = ref(0)
    const draggingStartWidth = ref(0) // Width of column being dragged

    const handleMouseDown = (event: MouseEvent, column: any) => {
        if (!store.props.resizable || !column.resizable) return
        
        event.preventDefault()
        event.stopPropagation()
        
        draggingColumn.value = column
        draggingStartX.value = event.clientX
        
        // Find DOM width
        const th = (event.target as HTMLElement).closest('th')
        if (th) {
            draggingStartWidth.value = th.offsetWidth
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = 'col-resize'
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!draggingColumn.value) return
        
        const delta = event.clientX - draggingStartX.value
        let newWidth = draggingStartWidth.value + delta
        
        const minWidth = draggingColumn.value.minWidth 
           ? parseInt(String(draggingColumn.value.minWidth), 10) 
           : 80 // Default min width
        
        if (newWidth < minWidth) newWidth = minWidth
        
        store.resizeColumn(draggingColumn.value.id, newWidth)
    }

    const handleMouseUp = (event: MouseEvent) => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        
        if (draggingColumn.value) {
            store.emit('header-dragend', 
                draggingStartWidth.value + (event.clientX - draggingStartX.value),
                draggingStartWidth.value,
                draggingColumn.value,
                event
            )
            draggingColumn.value = null
        }
    }

    return () => {
      const { fullRenderColumns, headerRows, handleSort, sortState, toggleAllSelection, isAllSelected, isIndeterminate } = store
      
      const renderHeaderCell = (column: any) => {
        return (
          <th 
            class={[
              'amu-table__cell', 
              { 'is-sortable': column.sortable, 'amu-table__cell-selection': column.type === 'selection' },
              column.isLastLeft ? 'is-last-left' : '',
              column.isFirstRight ? 'is-first-right' : '',
              column.isRightEdge ? 'is-right-edge' : ''
            ]}
            colspan={column.colSpan}
            rowspan={column.rowSpan}
            style={{ 
                width: typeof column.width === 'number' ? `${column.width}px` : column.width,
                textAlign: column.headerAlign || column.align || 'left',
                position: column.fixed ? 'sticky' : undefined,
                left: (column.fixed === 'left' || column.fixed === true) ? `${column.renderLeft}px` : undefined,
                right: column.fixed === 'right' ? `${column.renderRight}px` : undefined,
                zIndex: column.fixed ? 2 : undefined,
                background: 'var(--amu-color-bg-elevated)', // Handle sticky bg transparency
            }}
            onClick={() => column.sortable && handleSort(column, column.prop)}
          >
            <div class="cell">
              { column.type === 'selection' ? (
                 <AmuCheckbox 
                    modelValue={isAllSelected.value}
                    indeterminate={isIndeterminate.value}
                    onChange={toggleAllSelection}
                    onClick={(e: Event) => e.stopPropagation()}
                 />
              ) : (
                <>
                  {column.renderHeader ? column.renderHeader({ column, $index: 0 }) : (column.label || '')}
                  {column.sortable && (
                     <span class="caret-wrapper">
                        <i class={['sort-caret', 'ascending', { active: sortState.value.prop === column.prop && sortState.value.order === 'ascending' }]}></i>
                        <i class={['sort-caret', 'descending', { active: sortState.value.prop === column.prop && sortState.value.order === 'descending' }]}></i>
                     </span>
                  )}
                  {column.filters && (
                      <FilterPanel column={column} />
                  )}
                </>
              )}
            </div>
            { /* Resize Handle */ }
            { 
               store.props.border && 
               store.props.resizable && 
               column.resizable !== false && 
               (!column.children || !column.children.length) && // Only leaf nodes
               (
                 <div 
                    class="amu-table__column-resize-proxy" 
                    onMousedown={(e) => handleMouseDown(e, column)}
                    onClick={(e) => e.stopPropagation()}
                 />
               )
            }
          </th>
        )
      }

      return (
        <thead class="amu-table__header">
          {
            headerRows.value.map((row: any[], rowIndex: number) => (
               <tr class="amu-table__row" key={rowIndex}>
                 { row.map((col: any) => renderHeaderCell(col)) }
               </tr>
            ))
          }
        </thead>
      )
    }
  }
})
