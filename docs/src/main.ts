import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AmuUI from "amu-ui";
import AmuIcons from "@amu-ui/icons";

import "amu-ui/theme";
import "./highlight-theme.css";
import "./styles.css";

createApp(App).use(router).use(AmuUI).use(AmuIcons).mount("#app");
