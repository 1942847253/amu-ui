/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "virtual:amu-docs-nav" {
  export type NavItem = {
    name: string;
    title: string;
    route: string;
  };

  export type NavMeta = {
    components: NavItem[];
  };

  const nav: NavMeta;
  export default nav;
}

declare module "virtual:amu-docs-api" {
  export type LocalizedDesc = string | Record<string, string>;

  export type PropRow = {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description?: LocalizedDesc;
  };

  export type EventRow = {
    name: string;
    description?: LocalizedDesc;
    parameters?: string;
  };

  export type SlotRow = {
    name: string;
    description?: LocalizedDesc;
  };

  export type ApiMeta = {
    components: Record<string, Record<string, { props: PropRow[]; events: EventRow[]; slots: SlotRow[] }>>;
  };

  const api: ApiMeta;
  export default api;
}
