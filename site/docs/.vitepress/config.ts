export default {
  base: process.env.NODE_ENV === "production" ? "/amu-ui/" : "/",
  appearance: 'false',
  themeConfig: {
    smoothScroll: true,
    siteTitle: false,
    logo: "/logo.PNG",
    footer: {
      copyright: "本文档中的组件仅尚未稳定，仅供交流学习，请勿用于生产",
    },
    nav: [
      { text: '文档', link: '/guild/introduce' },
      { text: "组件", link: "/examples/button/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/1942847253/amu-ui" },
    ],
    sidebar: {
      "/guild/": [
        {
          text: '指南',
          items: [
            {
              text: '介绍',
              link: '/guild/introduce'
            },
            {
              text: '安装',
              link: '/guild/install'
            },
            {
              text: '使用',
              link: '/guild/quickstart'
            }
          ]
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
              link: "/examples/icon/",
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
              link: "/examples/selector/",
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
              link: "/examples/date-picker/",
            },
            {
              text: "Input 输入框",
              link: "/examples/Input/",
            },
            {
              text: "Input Number 数字输入框",
              link: "/examples/input-number/",
            },
            {
              text: "Form 表单",
              link: "/examples/Form/",
            },
            {
              text: 'Slider 滑块',
              link: "/examples/slider/"
            },
          ],
        },
        {
          text: "Data 数据展示",
          items: [
            {
              text: "Rotation 轮播图",
              link: "/examples/Rotation/",
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
            {
              text: "Pagination 分页",
              link: "/examples/pagination/",
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
            {
              text: "Breadcrumb 面包屑",
              link: "/examples/breadcrumb/",
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
              link: "/examples/message-box/",
            },
            {
              text: "Drawer 抽屉",
              link: "/examples/Drawer/",
            },
            {
              text: "Loading 加载",
              link: "/examples/Loading/",
            },
            {
              text: "Tooltip 文字提示",
              link: "/examples/tooltip/",
            },
          ],
        },
      ],
    },
  },
};
