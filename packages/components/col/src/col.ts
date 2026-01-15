import { defineComponent, computed, h, inject, type CSSProperties } from 'vue'
import { colProps, type ColSizeObject } from './props'
import { ROW_CONTEXT_KEY } from '../../row/src/props'
import './style.css'

export default defineComponent({
  name: 'AmuCol',
  props: colProps,
  setup(props, { slots }) {
    const { gutter, columns } = inject(ROW_CONTEXT_KEY, {
      gutter: computed(() => [0, 0] as [number, number]),
      columns: computed(() => 24)
    })
    
    const style = computed<CSSProperties>(() => {
      const styles: CSSProperties = {}
      const [gutterH, gutterV] = gutter.value
      
      // Gutter padding
      if (gutterH > 0) {
        styles.paddingLeft = `${gutterH / 2}px`
        styles.paddingRight = `${gutterH / 2}px`
      }
      
      // Flex prop
      if (props.flex) {
        styles.flex = typeof props.flex === 'number' ? `${props.flex} ${props.flex} auto` : props.flex
      }
      
      // Min/Max Width
      if (props.minWidth) styles.minWidth = typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth
      if (props.maxWidth) styles.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth

      return styles
    })

    const classes = computed(() => {
      const classList: (string | Record<string, boolean>)[] = ['amu-col']
      
      const span = props.span ?? columns.value
      if (span !== undefined) classList.push(`amu-col-${span}`)

      if (props.offset) classList.push(`amu-col-offset-${props.offset}`)
      if (props.push) classList.push(`amu-col-push-${props.push}`)
      if (props.pull) classList.push(`amu-col-pull-${props.pull}`)
      if (props.order) classList.push(`amu-col-order-${props.order}`)
      
      // Responsive
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
      sizes.forEach((size) => {
        const sizeProp = props[size]
        if (typeof sizeProp === 'number') {
          classList.push(`amu-col-${size}-${sizeProp}`)
        } else if (typeof sizeProp === 'object' && sizeProp !== null) {
          const { span, offset, push, pull, order } = sizeProp
          if (span !== undefined) classList.push(`amu-col-${size}-${span}`)
          if (offset !== undefined) classList.push(`amu-col-${size}-offset-${offset}`)
          if (push !== undefined) classList.push(`amu-col-${size}-push-${push}`)
          if (pull !== undefined) classList.push(`amu-col-${size}-pull-${pull}`)
          if (order !== undefined) classList.push(`amu-col-${size}-order-${order}`)
        }
      })
      
      return classList
    })

    return () => {
      return h(
        props.tag,
        {
          class: classes.value,
          style: style.value
        },
        slots.default?.()
      )
    }
  }
})
