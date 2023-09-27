import { App, Plugin } from "vue";
import * as components from "./src/index";
export * from "./src/index";
import { AMessage } from "./src/message";
import { AMessageBox } from "./src/message-box";
import { Tooltip } from "./src/tooltip";

type TComponets = {
  [key: string]: Plugin;
};

export { AMessage, AMessageBox, Tooltip };

export default {
  install: (app: App) => {
    for (let c in components) {
      app.use((components as TComponets)[c]);
    }
  },
};

