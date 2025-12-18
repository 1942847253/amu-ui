import { defineComponent, provide, toRef } from 'vue'
import { localeContextKey } from '@amu-ui/hooks'
import { configProviderProps } from './props'

export default defineComponent({
  name: 'AmuConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const locale = toRef(props, 'locale')
    provide(localeContextKey, locale)
    
    return () => slots.default?.()
  }
})
