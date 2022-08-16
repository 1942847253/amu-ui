import YButton from "./button";
import YCheckbox from "./checkbox";
import YCheckboxGroup from "./checkboxgroup";
import YSwitch from "./switch";
import { withInstall } from "../utils/index";
import { App } from "vue";

const components = {
  YButton,
  YCheckbox,
  YCheckboxGroup,
  YSwitch,
} as any;

export { YButton, YCheckbox, YCheckboxGroup, YSwitch };

export default {
  install(Vue: App<Element>) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key]);
    });
  },
};
