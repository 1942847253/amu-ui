import { defineComponent, h, inject } from 'vue'
import { TABLE_INJECTION_KEY } from '../store'
import { AmuCheckbox } from '../../../checkbox' // Correct path to checkbox component

export default defineComponent({
  name: 'AmuTableBody',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const store = inject(TABLE_INJECTION_KEY) as any

    return () => {
      const { fullRenderColumns, isRowSelected, toggleRowSelection, isRowExpanded, toggleRowExpansion } = store
      // data comes from VirtualScroller slot: { item: row, index: rowIndex }
      // OR direct data if not virtual

      const getSpan = (row: any, column: any, rowIndex: number, columnIndex: number) => {
        if (store.props.spanMethod) {
          const result = store.props.spanMethod({ row, column, rowIndex, columnIndex })
          if (Array.isArray(result)) {
            return { rowspan: result[0], colspan: result[1] }
          } else if (typeof result === 'object') {
            return { rowspan: result.rowspan, colspan: result.colspan }
          }
        }
        return { rowspan: 1, colspan: 1 }
      }

      const renderRow = (rowObj: any, mapIndex: number) => {
        // rowObj might be the row itself OR { item, index } wrapper from virtual scroller
        const row = rowObj.item || rowObj
        // If virtual, use absolute index; if not, use map index
        const rowIndex = rowObj.index !== undefined ? rowObj.index : mapIndex
        
        const isSelected = isRowSelected(row, rowIndex)
        const isExpanded = isRowExpanded(row)
        const isStriped = store.props.stripe && rowIndex % 2 === 1

        const rowParams = { row, rowIndex }

        const mainRow = (
          <tr 
            class={[
              'amu-table__row', 
              { 
                'amu-table__row--selected': isSelected,
                'amu-table__row--striped': isStriped
              }
            ]} 
            onClick={(e) => store.props.onRowClick && store.props.onRowClick(row, null, e)}
          >
            {fullRenderColumns.value.map((col: any, colIndex: number) => {
              const { rowspan, colspan } = getSpan(row, col, rowIndex, colIndex)
              if (!rowspan || !colspan) return null

              return (
              <td 
                rowspan={rowspan}
                colspan={colspan}
                class={[
                   'amu-table__cell', 
                   { 'amu-table__cell-selection': col.type === 'selection' },
                   { 'amu-table__cell-expand': col.type === 'expand' },
                   col.isLastLeft ? 'is-last-left' : '',
                   col.isFirstRight ? 'is-first-right' : '',
                   colIndex === fullRenderColumns.value.length - 1 ? 'is-right-edge' : ''
                ]}
                style={{
                  textAlign: col.align || 'left',
                  position: col.fixed ? 'sticky' : undefined,
                  left: (col.fixed === 'left' || col.fixed === true) ? `${col.renderLeft}px` : undefined,
                  right: col.fixed === 'right' ? `${col.renderRight}px` : undefined,
                  background: col.fixed ? (isStriped ? 'var(--amu-table-stripe-bg)' : 'var(--amu-color-bg)') : undefined,
                  zIndex: col.fixed ? 1 : undefined
                }}
              >
                 <div 
                    class={['cell', { 'amu-tooltip-cell': col.showOverflowTooltip }]}
                    onClick={(e: MouseEvent) => {
                      if (!col.showOverflowTooltip) return
                      const cell = e.currentTarget as HTMLElement
                      if (cell.scrollWidth > cell.clientWidth) {
                        e.stopPropagation()
                        store.setTooltip(cell, cell.innerText || cell.textContent)
                      }
                    }}
                 >
                   { col.type === 'selection' ? (
                      <AmuCheckbox 
                        modelValue={isSelected}
                        onChange={(val: any) => toggleRowSelection(row, val)}
                        onClick={(e: Event) => e.stopPropagation()}
                      />
                   ) : (
                     col.type === 'expand' ? (
                        (col.expandable && !col.expandable(row, rowIndex)) ? null : (
                          <div 
                              class={['amu-table__expand-icon', { 'amu-table__expand-icon--expanded': isExpanded }]}
                              onClick={(e) => {
                                  e.stopPropagation()
                                  toggleRowExpansion(row)
                              }}
                          >
                              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                                  <path d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" fill="currentColor"></path>
                              </svg>
                          </div>
                        )
                     ) : (
                        col.render ? col.render({ row, column: col, $index: rowIndex }) : (col.formatter ? col.formatter(row, col, row[col.prop], rowIndex) : row[col.prop])
                     )
                   )}
                 </div>
              </td>
            )
            })}
          </tr>
        )

        if (isExpanded) {
            const expandColumn = fullRenderColumns.value.find((col: any) => col.type === 'expand')
            if (expandColumn) {
                return [
                    mainRow,
                    <tr class="amu-table__row amu-table__row--expanded">
                        <td colspan={fullRenderColumns.value.length} class="amu-table__cell amu-table__expanded-cell">
                            { expandColumn.render ? expandColumn.render({ row, column: expandColumn, $index: rowIndex }) : null }
                        </td>
                    </tr>
                ]
            }
        }
        
        return mainRow
      }

      return (
        <tbody class="amu-table__body">
           { props.data.map((row, index) => renderRow(row, index)) }
        </tbody>
      )
    }
  }
})
