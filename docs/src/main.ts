import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AmuUI from "amu-ui";

import "amu-ui/theme";
import "highlight.js/styles/atom-one-light.css";
import "./styles.css";

createApp(App).use(router).use(AmuUI).mount("#app");
