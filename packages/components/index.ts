import { App, Plugin } from "vue";
import * as components from "./src/index";
export * from "./src/index";
import { AMessage } from "./src/message";
import { AMessageBox } from "./src/message-box";

type TComponets = {
  [key: string]: Plugin;
};

export { AMessage, AMessageBox };

export default {
  install: (app: App) => {
    for (let c in components) {
      app.use((components as TComponets)[c]);
    }
  },
};
