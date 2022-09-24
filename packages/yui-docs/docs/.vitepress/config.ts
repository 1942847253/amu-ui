export default {
  themeConfig: {
    smoothScroll: true,
    siteTitle: false,
    logo: "/logo.png",
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "组件", link: "/examples/button/" },
    ],
    socialLinks: [{ icon: "github", link: "https://gitee.com/geeksdidi" }],
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
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "xx",
              link: "/xx",
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
          ],
        },
      ],
    },
  },
};
