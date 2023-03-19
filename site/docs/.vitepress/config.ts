export default {
  base: process.env.NODE_ENV === "production" ? "/amu-ui/" : "/",
  themeConfig: {
    smoothScroll: true,
    siteTitle: false,
    logo: "/logo.PNG",
    footer: {
      copyright: "本文档仅供个人娱乐学习使用，切勿私自分享",
    },
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "组件", link: "/examples/button/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/1942847253/amu-ui" },
    ],
    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guild/installation",
            },
            {
              text: "快速开始",
              link: "/guild/quickstart",
            },
            {
              text: "组件示例",
              link: "/examples/button/",
            },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Basic 基础组件",
          items: [
            {
              text: "Button按钮",
              link: "/examples/button/",
            },
            {
              text: "Icon图标",
              link: "/examples/Icon/",
            },
          ],
        },
        {
          text: "Form 表单组件",
          items: [
            {
              text: "Checkbox 多选框",
              link: "/examples/checkbox/",
            },
            {
              text: "Radio 单选框",
              link: "/examples/radio/",
            },
            {
              text: "Selector 选择器",
              link: "/examples/Selector/",
            },
            {
              text: "Switch 开关",
              link: "/examples/switch/",
            },

            {
              text: "Tree 树形控件",
              link: "/examples/tree/",
            },
            {
              text: "Rate 评分",
              link: "/examples/Rate/",
            },
            {
              text: "DatePicker 日期选择器",
              link: "/examples/DatePicker/",
            },
            {
              text: "Input 输入框",
              link: "/examples/Input/",
            },
            {
              text: "Form 表单",
              link: "/examples/Form/",
            },
          ],
        },
        {
          text: "Data 数据展示",
          items: [
            {
              text: "Rotation 轮播图",
              link: "/examples/rotation/",
            },
            {
              text: "Table 表格",
              link: "/examples/table/",
            },
            {
              text: "Tag 标签",
              link: "/examples/tag/",
            },
            {
              text: "Collapse 折叠面板",
              link: "/examples/Collapse/",
            },
          ],
        },
        {
          text: "Navigation 导航",
          items: [
            {
              text: "Tabs 标签页",
              link: "/examples/Tabs/",
            },
            {
              text: "Menu 菜单",
              link: "/examples/Menu/",
            },
          ],
        },
        {
          text: "Feedback 反馈组件",
          items: [
            {
              text: "Message 消息提示",
              link: "/examples/message/",
            },
            {
              text: "Message Box 消息弹出框",
              link: "/examples/messagebox/",
            },
            {
              text: "Drawer 抽屉",
              link: "/examples/Drawer/",
            },
            {
              text: "Loading 加载",
              link: "/examples/Loading/",
            },
          ],
        },
      ],
    },
  },
};
