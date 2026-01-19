import { ref, computed, watch, unref } from 'vue'
import type { TableColumn, TableProps } from '../props'

export function useColumns(props: TableProps) {
  const _columns = ref<TableColumn[]>([])
  
  // 扁平化列（处理多级表头时，body 只需要渲染最底层列）
  const flatColumns = computed(() => {
    const result: TableColumn[] = []
    const flatten = (cols: TableColumn[]) => {
      cols.forEach((col) => {
        if (col.children && col.children.length) {
          flatten(col.children)
        } else {
          result.push(col)
        }
      })
    }
    flatten(_columns.value)
    return result
  })

  // 左侧固定列
  const fixedLeftColumns = computed(() => {
    return flatColumns.value.filter((column) => column.fixed === true || column.fixed === 'left')
  })

  // 右侧固定列
  const fixedRightColumns = computed(() => {
    return flatColumns.value.filter((column) => column.fixed === 'right')
  })

  // 普通滚动列
  const notFixedColumns = computed(() => {
    return flatColumns.value.filter((column) => !column.fixed)
  })
  
  // 完整的渲染顺序列 (左 + 中 + 右)，同时附加样式计算
  // 注意：这里必须返回新对象以避免修改原始响应式对象的副作用
  const fullRenderColumns = computed(() => {
    const left = fixedLeftColumns.value
    const mid = notFixedColumns.value
    const right = fixedRightColumns.value
    
    // 计算左侧 Offset
    let leftOffset = 0
    const finalLeft = left.map((col, index) => {
       const widthVal = col.width 
         ? parseInt(String(col.width), 10) 
         : (col.minWidth ? parseInt(String(col.minWidth), 10) : 80)
       
       const newCol = { 
           ...col, 
           renderLeft: leftOffset,
           isLastLeft: index === left.length - 1 
       }
       leftOffset += widthVal
       return newCol
    })

    // 计算右侧 Offset (从右向左累加)
    let rightOffset = 0
    const finalRightReverse = [...right].reverse().map((col, index) => {
       const widthVal = col.width 
         ? parseInt(String(col.width), 10) 
         : (col.minWidth ? parseInt(String(col.minWidth), 10) : 80)

       const newCol = { 
           ...col, 
           renderRight: rightOffset,
           isFirstRight: index === right.length - 1 
       }
       rightOffset += widthVal
       return newCol
    })
    const finalRight = finalRightReverse.reverse()

    const result = [
      ...finalLeft,
      ...mid,
      ...finalRight
    ]

    // 标记最后一个 Fluid 列 (没有固定 width 的列)
    // 从后往前找
    for (let i = result.length - 1; i >= 0; i--) {
      if (!result[i].width) {
        (result[i] as any).isLastFluid = true
        break
      }
    }

    return result
  })

  // 缓存样式的 Map (用于从 Leaf 节点反推 Group 节点样式)
  const columnStyles = computed(() => {
     const styles = new Map<string, any>()
     fullRenderColumns.value.forEach(col => {
         if (col.id) {
             styles.set(col.id, {
                 fixed: col.fixed,
                 renderLeft: col.renderLeft,
                 renderRight: col.renderRight,
                 isLastLeft: col.isLastLeft,
                 isFirstRight: col.isFirstRight,
             })
         }
     })
     return styles
  })

  // 递归获取列样式 (含 Group 处理)
  const getColumnStyle = (col: TableColumn, styleMap: Map<string, any>): any => {
      // 1. Leaf Node: 查表返回
      if (!col.children || col.children.length === 0) {
          if (col.id && styleMap.has(col.id)) {
              return styleMap.get(col.id)
          }
          return {}
      }

      // 2. Group Node: 递归 children 计算
      const childStyles = col.children.map(child => getColumnStyle(child, styleMap))
      
      // Determine Fixed status: A group is fixed if ALL its children are fixed in the same way
      const firstFixed = childStyles[0].fixed
      const allSame = childStyles.every(s => s.fixed === firstFixed)
      const fixed = allSame ? firstFixed : undefined

      let renderLeft
      let renderRight
      let isLastLeft = false
      let isFirstRight = false

      if (fixed === 'left' || fixed === true) {
          renderLeft = childStyles[0].renderLeft
          isLastLeft = childStyles[childStyles.length - 1].isLastLeft
      }
      if (fixed === 'right') {
          // Parent's right offset is governed by its right-most child's offset
          renderRight = childStyles[childStyles.length - 1].renderRight
          isFirstRight = childStyles[0].isFirstRight
      }

      return {
          fixed,
          renderLeft,
          renderRight,
          isLastLeft,
          isFirstRight
      }
  }

  const convertToRows = (originColumns: TableColumn[]) => {
    let maxLevel = 1
    
    // 1. Calculate Level & MaxLevel & ColSpan
    const traverse = (column: TableColumn, parent?: TableColumn) => {
      if (parent) {
        column.level = parent.level! + 1
        if (maxLevel < column.level) {
          maxLevel = column.level
        }
      } else {
        column.level = 1
      }

      if (column.children && column.children.length > 0) {
        let colSpan = 0
        column.children.forEach((subColumn) => {
          traverse(subColumn, column)
          colSpan += subColumn.colSpan!
        })
        column.colSpan = colSpan
      } else {
        column.colSpan = 1
      }
    }

    originColumns.forEach((col) => {
      col.level = 1 // Init root level
      traverse(col)
    })

    // 2. Build rows
    const rows: TableColumn[][] = []
    for (let i = 0; i < maxLevel; i++) {
      rows.push([])
    }

    const getAllColumns = (columns: TableColumn[]) => {
      const result: TableColumn[] = []
      columns.forEach((column) => {
        if (column.children) {
          result.push(column)
          result.push(...getAllColumns(column.children))
        } else {
          result.push(column)
        }
      })
      return result
    }

    const allColumns = getAllColumns(originColumns)
    
    allColumns.forEach((column) => {
      if (column.children && column.children.length > 0) {
        column.rowSpan = 1
      } else {
        column.rowSpan = maxLevel - column.level! + 1
      }
      rows[column.level! - 1].push(column)
    })

    // Mark Right Edge for Header Border
    const markRightEdge = (cols: TableColumn[]) => {
       if (!cols.length) return
       const last = cols[cols.length - 1]
       last.isRightEdge = true
       if (last.children) {
           markRightEdge(last.children)
       }
    }
    markRightEdge(originColumns)

    return rows
  }

  // 计算表头行数据 (合并样式信息)
  const headerRows = computed(() => {
    const rawRows = convertToRows(_columns.value)
    const styles = columnStyles.value
    
    return rawRows.map(row => row.map(col => {
        const style = getColumnStyle(col, styles)
        return {
            ...col,
            ...style
        }
    }))
  })

  // 计算表格总宽度
  const tableWidth = computed(() => {
    const cols = fullRenderColumns.value
    if (cols.length === 0) return '100%'

    // 检查是否所有列都有宽度
    const flattenCols = cols
    let hasFluid = false
    let total = 0
    
    for (const col of flattenCols) {
       if (col.width) {
           total += parseInt(String(col.width), 10)
       } else if (col.minWidth) {
           hasFluid = true
           total += parseInt(String(col.minWidth), 10)
       } else {
           hasFluid = true
           total += 80 // 默认给流体列一个最小宽度估算
       }
    }

    // 如果总宽度很小，且有流体列，则让表格撑满容器
    // 但如果用户显式指定了所有列宽，且总和大于容器，我们需要一个能够触发滚动的值
    // 由于这里拿不到容器宽度，我们采取保守策略：
    // 如果没有流体列，或者 total 看起来很大，我们使用 min-width 策略？
    // 最稳妥的方式：返回 undefined，让样式控制？不，我们需要强一致性。
    
    // 策略：如果所有列都有宽度，则强制该宽度。
    // 如果有流体列，且 total 都不足（比如只有1个列），这很难办。
    
    // 简化方案：返回 total + 'px' 作为 min-width。
    // 这样 table-layout: fixed 会尊重大于 min-width 的值。
    return hasFluid ? '100%' : `${total}px`
  })

  const setColumns = (cols: TableColumn[]) => {
    // Default width for selection
    const normalize = (columns: TableColumn[]) => {
      columns.forEach((col) => {
        if ((col.type === 'selection' || col.type === 'expand') && !col.width) {
          col.width = 48
        }
        if (col.children) {
          normalize(col.children)
        }
      })
    }
    normalize(cols)
    _columns.value = cols
  }

  // 初始化时如果 props.columns 存在，则使用它
  watch(
    () => props.columns,
    (val) => {
      if (val && val.length) {
        setColumns(val)
      }
    },
    { deep: true, immediate: true }
  )

  let seed = 0
  const insertColumn = (column: TableColumn, index: number, parent?: TableColumn) => {
    // 确保有 ID
    if (!column.id) {
        column.id = `amu-col-${seed++}`
    }

    if ((column.type === 'selection' || column.type === 'expand') && !column.width) {
        column.width = 48
    }

    // 简单实现：这里通常配合 Slot 模式使用
    // 实际生产级库需要处理 Slot 收集逻辑，这里简化为响应式数组操作
    if (parent) {
      parent.children = parent.children || []
      parent.children.splice(index, 0, column)
    } else {
        _columns.value.splice(index, 0, column)
    }
  }

  const resizeColumn = (id: string, width: number) => {
      const findAndUpdate = (cols: TableColumn[]): boolean => {
          for (const col of cols) {
              if (col.id === id) {
                  col.width = width
                  return true
              }
              if (col.children && findAndUpdate(col.children)) {
                  return true
              }
          }
          return false
      }
      findAndUpdate(_columns.value)
  }

  const removeColumn = (id: string, parent?: TableColumn) => {
    if (parent) {
      if (parent.children) {
         const index = parent.children.findIndex(col => col.id === id)
         if (index > -1) parent.children.splice(index, 1)
      }
    } else {
       const index = _columns.value.findIndex(col => col.id === id)
       if (index > -1) _columns.value.splice(index, 1)
    }
  }

  return {
    columns: _columns,
    flatColumns,
    fixedLeftColumns,
    fixedRightColumns,
    notFixedColumns,
    fullRenderColumns,
    tableWidth,
    setColumns,
    insertColumn,
    resizeColumn,
    removeColumn,
    headerRows
  }
}
