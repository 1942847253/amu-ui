import type { InjectionKey, Ref, ComputedRef } from 'vue'

export interface MenuContext {
  mode: ComputedRef<'vertical' | 'horizontal' | 'inline'>
  theme: ComputedRef<'light' | 'dark'>
  collapsed: ComputedRef<boolean>
  // Whether to show as collapsed mode (vertical -> collapsed)
  isCollapsed: ComputedRef<boolean>
  selectedKeys: Ref<string[]>
  openKeys: Ref<string[]>
  activePath?: ComputedRef<string>
  handleSelect: (key: string) => void
  handleOpenChange: (key: string) => void
  addSubMenu: (item: any) => void
  removeSubMenu: (item: any) => void
}

export const MenuContextKey: InjectionKey<MenuContext> = Symbol('menuContext')

export interface SubMenuContext {
  level: number
  mouseInChild: Ref<boolean> // For hover delay logic usually
}
export const SubMenuContextKey: InjectionKey<SubMenuContext> = Symbol('subMenuContext')
