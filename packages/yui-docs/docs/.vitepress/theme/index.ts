// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import YUI from '../../../../y-ui';
// import '../../../../y-ui/dist/assets/index.css';
import './style.less';
// 主题样式

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(YUI);
  },
};
