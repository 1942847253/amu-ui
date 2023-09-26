declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
}

declare interface Window {
  $: {
    amuui: {
      zIndex: number
    }
  }
}

