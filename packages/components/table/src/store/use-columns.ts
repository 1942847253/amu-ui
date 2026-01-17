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
       const w = col.width ? parseInt(String(col.width), 10) : 100
       const newCol = { 
           ...col, 
           renderLeft: leftOffset,
           isLastLeft: index === left.length - 1 
       }
       leftOffset += w
       return newCol
    })

    // 计算右侧 Offset (从右向左累加)
    let rightOffset = 0
    // 反向遍历副本计算，但通过 map 生成的需要是正序的
    // Right columns: [A, B] -> B is rightmost (0 offset), A is left of B (width(B) offset)
    // Actually fixed='right' usually means last one is at Right:0.
    // If we have [R1, R2]. R1 is first in DOM. R2 is second.
    // Display: ... [R1] [R2] |
    // R2 right = 0.
    // R1 right = R2.width.
    
    // Create a copy to reverse iterate or just index logic
    const finalRightReverse = [...right].reverse().map((col, index) => {
       const w = col.width ? parseInt(String(col.width), 10) : 100
       const newCol = { 
           ...col, 
           renderRight: rightOffset,
           isFirstRight: index === right.length - 1 
       }
       rightOffset += w
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
    
    // 简单实现：这里通常配合 Slot 模式使用
    // 实际生产级库需要处理 Slot 收集逻辑，这里简化为响应式数组操作
    if (parent) {
      parent.children = parent.children || []
      parent.children.splice(index, 0, column)
    } else {
        _columns.value.splice(index, 0, column)
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
    insertColumn
  }
}
