import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AmuUI from "am-ui";

import "am-ui/theme";
import "highlight.js/styles/atom-one-light.css";
import "./styles.css";

createApp(App).use(router).use(AmuUI).mount("#app");
