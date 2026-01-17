import { defineComponent, inject, onMounted, onBeforeUnmount, watch } from 'vue'
import { TABLE_INJECTION_KEY } from './store'
import type { TableColumn } from './props'

export default defineComponent({
  name: 'AmuTableColumn',
  props: {
    type: String,
    prop: String,
    label: String,
    width: [String, Number],
    minWidth: [String, Number],
    sortable: {
      type: [Boolean, String],
      default: false
    },
    fixed: [Boolean, String],
    align: String,
    headerAlign: String,
    formatter: Function,
    resizable: {
      type: Boolean,
      default: true
    },
    showOverflowTooltip: Boolean,
    index: [Number, Function]
  },
  setup(props, { slots }) {
    const store = inject(TABLE_INJECTION_KEY) as any
    const column: TableColumn = { ...props } as any
    
    // 如果有 slot
    if (slots.default) {
      column.render = (data) => slots.default!(data)
    }
    if (slots.header) {
      column.renderHeader = (data) => slots.header!(data)
    }

    onMounted(() => {
        // Use length to append to the end, ensuring correct order
        store.insertColumn(column, store.columns.value.length)
    })
    
    // In real lifecycle, handle update and remove

    return () => null // Renderless
  }
})
