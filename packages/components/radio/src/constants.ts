import type { InjectionKey, Ref } from 'vue'
import type { RadioGroupProps } from './props'

export const radioGroupKey: InjectionKey<{
  props: RadioGroupProps
  changeEvent: (val: string | number | boolean) => void
  name: Ref<string>
}> = Symbol('radioGroupKey')
