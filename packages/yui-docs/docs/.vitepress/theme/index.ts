// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import YUI from '../../../../y-ui';
// import '../../../../y-ui/dist/assets/index.css';
import './style.less';
// 主题样式

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    app.use(YUI);
  },
};
