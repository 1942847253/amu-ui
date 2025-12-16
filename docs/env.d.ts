/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:amu-docs-nav' {
  export type NavItem = {
    name: string
    title: string
    route: string
  }
  
  export type NavMeta = {
    components: NavItem[]
  }
  
  const nav: NavMeta
  export default nav
}

declare module 'virtual:amu-docs-api' {
  export type PropRow = {
    name: string
    type: string
    required: boolean
    default?: string
  }
  
  export type ApiMeta = {
    components: Record<string, { props: PropRow[] }>
  }
  
  const api: ApiMeta
  export default api
}
