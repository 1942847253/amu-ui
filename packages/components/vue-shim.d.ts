declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
}

declare interface Window {
  $: any
}

declare global{
  namespace JSX {
     interface IntrinsicElements {
         div: {};
     }
 }
}

