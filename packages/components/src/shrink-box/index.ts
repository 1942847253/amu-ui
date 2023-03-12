import _ShrinkBox from "./shrink-box.vue";

import type { App, Plugin } from "vue";
type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name;
    console.log(name);

    //注册组件
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};
export const AShrinkBox = withInstall(_ShrinkBox);
export default AShrinkBox;
