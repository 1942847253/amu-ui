import type { InjectionKey, Ref } from 'vue'
import type { CollapseModelValue } from './props'

export interface CollapseContext {
  activeNames: Ref<(string | number)[]>
  handleItemClick: (name: string | number) => void
  arrowPlacement: Ref<'left' | 'right'>
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
