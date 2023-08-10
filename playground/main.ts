import { createApp } from "vue";
import App from "./app.vue";
//import AmuUI from "../packages/amu-ui";
import AmuUI from '@amu-ui/components'
// import AmuUI from "../packages/amu-ui/es";

const app = createApp(App);
app.use(AmuUI);
app.mount("#app");
