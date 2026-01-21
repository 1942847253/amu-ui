import type { InjectionKey, Component } from 'vue'

export interface BreadcrumbContext {
  separator: string
  separatorIcon?: string | Component
}

export const breadcrumbKey: InjectionKey<BreadcrumbContext> = Symbol('breadcrumbKey')
