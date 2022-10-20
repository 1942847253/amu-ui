import { App } from "vue";
import YMessageBox from "./components/MessageBox/index";
import YMessage from "./components/Message/index";
import YSelector from "./components/Selector/index.vue";
import YRotation from "./components/Rotation/index.vue";
import YRotationItem from "./components/Rotation/RotationItem/RotationItem.vue";
import YTable from "./components/Table/index.vue";
import YTag from "./components/Tag/index.vue";
import YButton from "./components/Button/index.vue";
import YSwitch from "./components/Switch/index.vue";
import YRadio from "./components/Radio/index.vue";
import YRadioGroup from "./components/RadioGroup/RadioGroup.vue";
import YCheckbox from "./components/CheckBox/CheckBox.vue";
import YCheckboxGroup from "./components/CheckBoxGroup/CheckBoxGroup.vue";
import YTabs from "./components/Tabs";
import YTabsPanel from "./components/Tabs/Panel/index.vue";
import YTree from "./components/Tree/index.vue";
import YCollapse from "./components/Collapse";
import YCollapesItem from "./components/Collapse/CollapesItem/index.vue";

export {
  YMessageBox,
  YMessage,
  YSelector,
  YRotation,
  YRotationItem,
  YTable,
  YTag,
  YButton,
  YSwitch,
  YRadio,
  YRadioGroup,
  YCheckbox,
  YCheckboxGroup,
  YTabs,
  YTabsPanel,
  YTree,
  YCollapse,
  YCollapesItem,
};

const components = {
  YSelector,
  YRotation,
  YRotationItem,
  YTable,
  YTag,
  YButton,
  YSwitch,
  YRadio,
  YRadioGroup,
  YCheckbox,
  YCheckboxGroup,
  YTabs,
  YTabsPanel,
  YTree,
  YCollapse,
  YCollapesItem,
};

export default {
  install(Vue: App<Element>) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key]);
    });
  },
};
