import { defineComponent, h, inject } from 'vue'
import { TABLE_INJECTION_KEY } from '../store'
import { AmuCheckbox } from '../../../checkbox' // Correct path to checkbox component

export default defineComponent({
  name: 'AmuTableHeader',
  setup() {
    const store = inject(TABLE_INJECTION_KEY) as any

    return () => {
      const { fullRenderColumns, handleSort, sortState, toggleAllSelection, isAllSelected, isIndeterminate } = store
      
      const renderHeaderCell = (column: any) => {
        return (
          <th 
            class={[
              'amu-table__cell', 
              { 'is-sortable': column.sortable, 'amu-table__cell-selection': column.type === 'selection' },
              column.isLastLeft ? 'is-last-left' : '',
              column.isFirstRight ? 'is-first-right' : ''
            ]}
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
                </>
              )}
            </div>
          </th>
        )
      }

      return (
        <thead class="amu-table__header">
          <tr class="amu-table__row">
            { fullRenderColumns.value.map((col: any) => renderHeaderCell(col)) }
          </tr>
        </thead>
      )
    }
  }
})
