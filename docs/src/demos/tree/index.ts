import Basic from './basic.vue?raw';
import Checkable from './checkable.vue?raw';
import Virtual from './virtual.vue?raw';
import Draggable from './draggable.vue?raw';
import CustomIcon from './custom-icon.vue?raw';
import ShowLine from './show-line.vue?raw';

import BasicComp from './basic.vue';
import CheckableComp from './checkable.vue';
import VirtualComp from './virtual.vue';
import DraggableComp from './draggable.vue';
import CustomIconComp from './custom-icon.vue';
import ShowLineComp from './show-line.vue';

export const demos = [
  {
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '基础的树形结构展示。',
      'en-US': 'Basic tree structure.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    title: {
      'zh-CN': '可选择',
      'en-US': 'Checkable'
    },
    description: {
      'zh-CN': '适用于需要选择层级数据的场景。',
      'en-US': 'Suitable for selecting hierarchical data.'
    },
    code: Checkable,
    component: CheckableComp
  },
  {
    title: {
      'zh-CN': '虚拟滚动 (大数据量)',
      'en-US': 'Virtual Scrolling'
    },
    description: {
      'zh-CN': '支持承载 10w+ 节点，开启 `virtual` 属性即可。',
      'en-US': 'Support 100k+ nodes by enabling `virtual` prop.'
    },
    code: Virtual,
    component: VirtualComp
  },
  {
    title: {
      'zh-CN': '拖拽排序',
      'en-US': 'Draggable'
    },
    description: {
      'zh-CN': '节点可以拖拽排序。',
      'en-US': 'Nodes can be dragged and dropped.'
    },
    code: Draggable,
    component: DraggableComp
  },
  {
    title: {
      'zh-CN': '自定义图标',
      'en-US': 'Custom Icon'
    },
    description: {
      'zh-CN': '使用 slot 自定义展开/折叠图标。',
      'en-US': 'Customize expand/collapse icon using slot.'
    },
    code: CustomIcon,
    component: CustomIconComp
  },
  {
    title: {
      'zh-CN': '连接线',
      'en-US': 'Show Line'
    },
    description: {
      'zh-CN': '在左侧显示连接线。',
      'en-US': 'Show vertical connecting lines.'
    },
    code: ShowLine,
    component: ShowLineComp
  }
];

export const meta = {
  description: {
    'zh-CN': '用清晰的层级结构展示信息，可展开或折叠。',
    'en-US': 'Display information in a clear hierarchical structure.'
  }
};
