// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
// import AmuUI from "amu-ui";
// import AmuUI from '../../../../packages/components'
// import '../../../../y-ui/dist/assets/index.css';

import AmuUI from '../../../../packages/components/index'
import '../../../../packages/components/assets/theme/index.css'
import './style.less';
// 主题样式

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    app.use(AmuUI);
  },
};
