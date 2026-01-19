import { defineComponent, inject, onMounted, onBeforeUnmount, watch, provide, h } from 'vue'
import { TABLE_INJECTION_KEY, TABLE_COLUMN_INJECTION_KEY } from './store'
import { tableColumnProps, type TableColumn } from './props'

export default defineComponent({
  name: 'AmuTableColumn',
  props: tableColumnProps,
  setup(props, { slots }) {
    const store = inject(TABLE_INJECTION_KEY) as any
    const parentColumn = inject(TABLE_COLUMN_INJECTION_KEY, null) as TableColumn | null
    
    const column: TableColumn = { ...props } as any

    // 继承父级 fixed 属性 (用于多级表头固定列)
    // 注意：Vue Prop Boolean 类型缺省值为 false，需同时判断 false/undefined
    if ((!column.fixed || column.fixed === undefined) && parentColumn?.fixed) {
      column.fixed = parentColumn.fixed
    }
    
    // 如果有 slot
    // 注意：如果是多级表头，default slot 可能会包含子列组件，这时不应该把 default slot 当作 render 函数
    // 但是父级列会被 flatColumns 过滤掉，所以这里赋值 render 不会影响 body 渲染
    if (slots.default) {
      column.render = (data) => slots.default!(data)
    }
    
    if (slots.header) {
      column.renderHeader = (data) => slots.header!(data)
    }

    // 提供自己给子组件
    provide(TABLE_COLUMN_INJECTION_KEY, column)

    onMounted(() => {
        // Correct insertion: if parent exists, insert into parent.children
        // Note: index calculation might be tricky with async mounting, 
        // essentially just append for now.
        const parentChildren = parentColumn ? (parentColumn.children || []) : store.columns.value
        store.insertColumn(column, parentChildren.length, parentColumn)
    })

    onBeforeUnmount(() => {
        store.removeColumn(column.id, parentColumn)
    })
    
    // We must render default slot to trigger children setup
    return () => {
        try {
            // Attempt to render default slot without params to detect child columns
            // If it's a scoped slot expecting params (e.g. { row }), it might fail or return invalid vnodes.
            // But usually grouped columns don't use scoped params.
            const children = slots.default?.()
            return h('div', { style: { display: 'none' } }, children)
        } catch {
            // If rendering fails (e.g. destructuring undefined), it's likely a scoped slot for cell content,
            // which implies no child columns. Safe to ignore.
            return h('div', { style: { display: 'none' } })
        }
    }
  }
})
