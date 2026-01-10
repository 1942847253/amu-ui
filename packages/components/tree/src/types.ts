export type TreeKey = string | number;

export interface TreeOption {
  key?: TreeKey;
  label?: string;
  children?: TreeOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  [key: string]: any; // Allow custom props
}

export interface TreeNode extends Required<Pick<TreeOption, 'key' | 'label'>> {
  level: number;
  rawNode: TreeOption;
  loading: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  indeterminate: boolean;
  parentKey: TreeKey | null;
  children: TreeNode[]; // 即使 rawNode.children 是 TreeOption[]，但在内部我们会转成 TreeNode[]
  isLeaf: boolean;
  visible: boolean; // For filtering
  // showLine support
  isLast: boolean; 
  hasLine: boolean[]; // false: vertical line, true: empty
}

export interface TreeContext {
  props: any;
  slots: any;
  emit: any;
}
