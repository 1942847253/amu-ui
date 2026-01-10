import type { PropType, ExtractPropTypes } from 'vue';
import type { TreeOption, TreeKey, TreeNode } from './types';

export const treeProps = {
  /**
   * @description 展示数据
   * @en Tree data
   */
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => [],
  },
  /**
   * @description 唯一标识的属性名
   * @en Unique key field name
   */
  nodeKey: {
    type: String,
    default: 'key',
  },
  /**
   * @description 标签显示的属性名
   * @en Label field name
   */
  labelField: {
    type: String,
    default: 'label',
  },
  /**
   * @description 子级数据的属性名
   * @en Children field name
   */
  childrenField: {
    type: String,
    default: 'children',
  },
  /**
   * @description 禁用状态的属性名
   * @en Disabled field name
   */
  disabledField: {
    type: String,
    default: 'disabled',
  },
  /**
   * @description 默认展开的节点的 key 的数组
   * @en Array of keys of initially expanded nodes
   */
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => [],
  },
  /**
   * @description 默认勾选的节点的 key 的数组
   * @en Array of keys of initially checked nodes
   */
  defaultCheckedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => [],
  },
  /**
   * @description 默认选中的节点的 key 的数组
   * @en Array of keys of initially selected nodes
   */
  defaultSelectedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => [],
  },
  /**
   * @description 节点是否可选择（Checkbox）
   * @en Whether nodes are checkable
   */
  checkable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 节点是否可被选中（高亮）
   * @en Whether nodes are selectable
   */
  selectable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否支持多选（高亮选择）
   * @en Whether to support multiple selection
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否每次只打开一个同级树节点
   * @en Whether to open only one node on the same level
   */
  accordion: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否懒加载子节点
   * @en Whether to lazy load nodes
   */
  lazy: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 加载子节点数据的方法
   * @en Method for loading data
   */
  load: {
    type: Function as PropType<(node: TreeNode, resolve: (data: TreeOption[]) => void) => void>,
  },
  /**
   * @description 对树节点进行筛选时执行的方法
   * @en Method to filter nodes
   */
  filterMethod: {
    type: Function as PropType<(query: string, node: TreeNode) => boolean>,
  },
  /**
   * @description 是否开启拖拽节点功能
   * @en Whether nodes are draggable
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否开启虚拟滚动 (大数据量推荐)
   * @en Whether to enable virtual scrolling (highly recommended for large datasets)
   */
  virtual: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 虚拟列表容器高度 (px)
   * @en Height of the virtual list container (px)
   */
  height: {
    type: Number,
    default: 500,
  },
  /**
   * @description 每一行的高度 (px) - 虚拟滚动时必须
   * @en Height of each item (px) - required for virtual scrolling
   */
  itemHeight: {
    type: Number,
    default: 32,
  },
  /**
   * @description 是否父子节点选中状态隔离
   * @en Whether parent and child check states are associated
   */
  checkStrictly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否在点击节点内容时选中节点
   * @en Whether to check node when clicking on node-content
   */
  checkOnClickNode: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示连接线
   * @en Whether to display connected lines
   */
  showLine: {
    type: Boolean,
    default: false
  },
  /**
   * @description 每一层的缩进宽度 (px)
   * @en Indentation width for each level (px)
   */
  indent: {
    type: Number,
    default: 18
  }
} as const;

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export const treeEmits = {
  /**
   * @description 选中值更新时触发
   * @en Triggered when selected keys update
   */
  'update:selectedKeys': (keys: TreeKey[]) => true,
  /**
   * @description 勾选值更新时触发
   * @en Triggered when checked keys update
   */
  'update:checkedKeys': (keys: TreeKey[]) => true,
  /**
   * @description 展开值更新时触发
   * @en Triggered when expanded keys update
   */
  'update:expandedKeys': (keys: TreeKey[]) => true,
  /**
   * @description 点击节点选择时触发
   * @en Triggered when a node is selected
   */
  select: (selectedKeys: TreeKey[], option: { selected: boolean; node: TreeNode; event: Event }) => true,
  /**
   * @description 点击复选框勾选时触发
   * @en Triggered when a node is checked
   */
  check: (checkedKeys: TreeKey[], option: { checked: boolean; node: TreeNode; event: Event }) => true,
  /**
   * @description 节点展开时触发
   * @en Triggered when a node is expanded
   */
  expand: (node: TreeNode, event: Event) => true,
  /**
   * @description 节点收起时触发
   * @en Triggered when a node is collapsed
   */
  collapse: (node: TreeNode, event: Event) => true,
  /**
   * @description 节点开始拖拽时触发
   * @en Triggered when node dragging starts
   */
  'drag-start': (node: TreeNode, event: DragEvent) => true,
  /**
   * @description 拖拽进入其他节点时触发
   * @en Triggered when dragging enters another node
   */
  'drag-enter': (node: TreeNode, event: DragEvent) => true,
  /**
   * @description 拖拽离开其他节点时触发
   * @en Triggered when dragging leaves another node
   */
  'drag-leave': (node: TreeNode, event: DragEvent) => true,
  /**
   * @description 在其他节点上方拖拽时触发（持续触发）
   * @en Triggered when dragging over another node
   */
  'drag-over': (node: TreeNode, event: DragEvent) => true,
  /**
   * @description 拖拽结束时触发
   * @en Triggered when dragging ends
   */
  'drag-end': (node: TreeNode, event: DragEvent) => true,
  /**
   * @description 拖拽释放时触发
   * @en Triggered when the drag drop event occurs
   */
  'drop': (draggingNode: TreeNode, dropNode: TreeNode, dropType: 'before' | 'after' | 'inner', event: DragEvent) => true,
  /**
   * @description 节点右键点击时触发
   * @en Triggered when a node is right-clicked
   */
  'node-contextmenu': (event: MouseEvent, node: TreeNode) => true,
  /**
   * @description 节点被点击时触发
   * @en Triggered when a node is clicked
   */
  'node-click': (node: TreeNode, event: Event) => true
};

export type TreeEmits = typeof treeEmits;

export const treeSlots = {
  /**
   * @description 自定义节点内容
   * @en Custom node content
   */
  default: (props: { node: TreeNode }) => true,
  /**
   * @description 自定义展开/折叠图标
   * @en Custom expand/collapse icon
   */
  icon: (props: { node: TreeNode, expanded: boolean }) => true,
  /**
   * @description 自定义开关切换器 (保留扩展位，暂未完全实现)
   * @en Custom toggle switcher (Reserved)
   */
  switcher: (props: { node: TreeNode, expanded: boolean }) => true
};
