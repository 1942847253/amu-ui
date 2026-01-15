import { defineComponent, computed, h, provide, inject, ref, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { rowProps, ROW_CONTEXT_KEY } from './props'
import { ResponsiveObserve, type ScreenMap, type Breakpoint } from '@amu-ui/utils'
import './style.css'

export default defineComponent({
  name: 'AmuRow',
  props: rowProps,
  setup(props, { slots }) {
    const screens = ref<ScreenMap>({})
    const token = ref<number>(-1)
    
    const parentRow = inject(ROW_CONTEXT_KEY, null)

    onMounted(() => {
      token.value = ResponsiveObserve.subscribe((map) => {
        screens.value = map
      })
    })

    onUnmounted(() => {
      ResponsiveObserve.unsubscribe(token.value)
    })

    const gutter = computed<[number, number]>(() => {
      let gutterProp = props.gutter
      
      if (gutterProp === undefined) {
        if (parentRow) return parentRow.gutter.value
        gutterProp = 0
      }
      
      if (typeof gutterProp === 'object' && !Array.isArray(gutterProp)) {
        const breakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const
        for (const bp of breakpoints) {
           if (screens.value[bp] && (gutterProp as any)[bp] !== undefined) {
             const val = (gutterProp as any)[bp]
             if (Array.isArray(val)) return val as [number, number]
             return [val, val] as [number, number]
           }
        }
        return [0, 0] as [number, number]
      }
      
      if (Array.isArray(gutterProp)) {
        return gutterProp as [number, number]
      }
      return [gutterProp, gutterProp] as [number, number]
    })

    const style = computed<CSSProperties>(() => {
      const [gutterH, gutterV] = gutter.value
      const styles: CSSProperties = {
        rowGap: gutterV > 0 ? `${gutterV}px` : undefined
      }
      
      if (gutterH > 0) {
        styles.marginLeft = `${gutterH / -2}px`
        styles.marginRight = `${gutterH / -2}px`
      }
      
      return styles
    })

    const classes = computed(() => {
      return [
        'amu-row',
        `is-justify-${props.justify}`,
        `is-align-${props.align}`,
        {
          'amu-row--wrap': props.wrap,
          'amu-row--no-wrap': !props.wrap,
          'amu-row--dense': props.dense,
          'amu-row--debug': props.debug
        }
      ]
    })

    provide(ROW_CONTEXT_KEY, {
      gutter,
      columns: computed(() => props.columns)
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
