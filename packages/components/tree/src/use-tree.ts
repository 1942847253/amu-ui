import { ref, computed, watch, nextTick, reactive } from 'vue';
import type { SetupContext } from 'vue';
import type { TreeOption, TreeNode, TreeKey } from './types';
import type { TreeProps, TreeEmits } from './props';

let seed = 0;
const getSeedId = () => `amu-tree-node-${seed++}`;

export function useTree(props: TreeProps, emit: (event: any, ...args: any[]) => void) {
  const nodeMap = ref<Map<TreeKey, TreeNode>>(new Map());
  const expandedKeys = ref<Set<TreeKey>>(new Set(props.defaultExpandedKeys));
  const checkedKeys = ref<Set<TreeKey>>(new Set(props.defaultCheckedKeys));
  const selectedKeys = ref<Set<TreeKey>>(new Set(props.defaultSelectedKeys));
  const indeterminateKeys = ref<Set<TreeKey>>(new Set());
  
  // 内部辅助：获取 Key
  const getKey = (option: TreeOption): TreeKey => {
    if (!option) return '';
    const key = option[props.nodeKey || 'key'];
    // 如果没有 Key，则临时生成一个，但注意：这会改变原始数据吗？
    // 不应该修改原始数据。我们在内部维护一个 WeakMap 吗？
    // 或者直接返回一个默认值？
    // 简单起见，如果 key 缺失，在这个 scope 内我们应当生成一个。
    // 但是 getKey 会被多次调用，必须保持稳定。
    // 所以需要在 transformData 遍历时就定下来 Key。
    return key !== undefined ? key : ''; 
  };

  // 1. 数据扁平化与初始化
  const createTreeNode = (option: TreeOption, level: number, parent: TreeNode | null): TreeNode => {
    let key = getKey(option);
    if (key === '') {
        // Fallback to internal ID if key is missing in data
        // We store it on the rawNode to persist it? 
        // Modifying raw data is bad.
        // But if we don't, we can't map it back reliably without an external map.
        // Let's assume for now we use a symbol or internal prop if possible, 
        // or just use a generated ID if the user didn't provide one, but we need to store it somewhere.
        // A cleaner way: Store it in a WeakMap<Option, Key>
        if (!option._amuTreeKey) {
            Object.defineProperty(option, '_amuTreeKey', {
                value: getSeedId(),
                enumerable: false,
                writable: true,
                configurable: true
            });
        }
        key = option._amuTreeKey as string;
    }

    const childrenOptions = option[props.childrenField || 'children'] as TreeOption[] || [];
    
    // 状态初始化
    const isExpanded = expandedKeys.value.has(key);
    const isChecked = checkedKeys.value.has(key);
    const isSelected = selectedKeys.value.has(key);

    const node: TreeNode = reactive({
      key,
      label: option[props.labelField || 'label'],
      level,
      rawNode: option,
      loading: false,
      disabled: !!option[props.disabledField || 'disabled'],
      expanded: isExpanded,
      selected: isSelected,
      checked: isChecked,
      indeterminate: false, // 初始先 false，后面 compute
      parentKey: parent ? parent.key : null,
      children: [], // 稍后填充
      isLeaf: option.isLeaf ?? childrenOptions.length === 0,
      visible: true,
      isLast: false,
      hasLine: []
    });

    return node;
  };

  const transformData = (options: TreeOption[], level = 0, parent: TreeNode | null = null, ancestorsLines: boolean[] = []): TreeNode[] => {
    return options.map((option, index) => {
      const isLast = index === options.length - 1;
      const node = createTreeNode(option, level, parent);
      node.isLast = isLast;
      node.hasLine = ancestorsLines; // Copy? Arrays are ref in JS? No, ancestorsLines is new arr passed down.

      nodeMap.value.set(node.key, node);
      
      const childrenOptions = option[props.childrenField || 'children'] as TreeOption[];
      if (childrenOptions && childrenOptions.length > 0) {
        // Pass down new ancestors status: if I'm last, next level will have empty space at my column.
        // ancestorsLines for children = [...ancestorsLines, isLast]
        // If isLast is true, it means empty space (true=blank).
        // If isLast is false, it means vertical line (false=line).
        // So we just push isLast.
        node.children = transformData(childrenOptions, level + 1, node, [...ancestorsLines, isLast]);
      }
      
      return node;
    });
  };

  // 监听 data 变化重建索引
  const roots = ref<TreeNode[]>([]);
  
  watch(() => props.data, (newData) => {
    nodeMap.value.clear();
    // 保留 expanded/checked 等状态？
    // 通常全量 data 变更是重置，由 defaultKeys 控制
    // 用户若需保留，需自行维护 defaultKeys
    roots.value = transformData(newData || []);
    // 初始计算 Check 状态（如果是受控模式，可能不需要自动计算，但这里为了方便，可以算一次）
    if (!props.checkStrictly) {
       initCheckStatus();
    }
  }, { immediate: true, deep: false }); // deep false, 假设 data 引用变化才重算，大规模数据下 deep watch 太慢

  // 2. 状态计算逻辑
  // 重新计算所有节点的 indeterminate 状态和 checked 状态 (自下而上)
  // 这在初始化或 checkedKeys 外部变更时调用
  function initCheckStatus() {
     // TODO: 遍历所有节点做 check 逻辑校验，比较耗时，暂略，简单实现：
     // 根据 checkedKeys 重新刷一遍
  }

  // 3. 核心计算属性：Visible Nodes for Virtual List
  // 将树拍平成列表，只包含 visible (expanded path) && !filtered
  const flattenVisibleNodes = computed(() => {
    const result: TreeNode[] = [];
    
    const traverse = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (!node.visible) continue; // 过滤掉不显示的（search filter）
        
        result.push(node);
        
        if (node.expanded && !node.loading) {
           traverse(node.children);
        }
      }
    };
    
    traverse(roots.value);
    return result;
  });

  // 4. Actions
  const setExpanded = (key: TreeKey, expanded: boolean) => {
      const node = nodeMap.value.get(key);
      if(!node) return;

      node.expanded = expanded;
      if(expanded) {
          expandedKeys.value.add(key);
      } else {
          expandedKeys.value.delete(key);
      }
      emit('update:expandedKeys', Array.from(expandedKeys.value));
      emit(expanded ? 'expand' : 'collapse', node, null);
  };
  
  const toggleExpand = (node: TreeNode) => {
    if (node.disabled) return;
    
    // 手风琴模式：关闭同级其他节点
    if (props.accordion && !node.expanded && node.parentKey !== null) {
       const parent = nodeMap.value.get(node.parentKey);
       if(parent) {
           parent.children.forEach(sibling => {
               if(sibling.key !== node.key && sibling.expanded) {
                   setExpanded(sibling.key, false);
               }
           });
       } else {
           // Root level accordion
           roots.value.forEach(sibling => {
               if(sibling.key !== node.key && sibling.expanded) {
                   setExpanded(sibling.key, false);
               }
           });
       }
    }

    // Lazy Load
    if (props.lazy && !node.isLeaf && !node.children.length && !node.expanded && !node.loading) {
        // First expansion needs load
        node.loading = true;
        node.expanded = true; // 先展开显示 loading
        
        const resolve = (data: TreeOption[]) => {
            node.loading = false;
            if(data && data.length) {
                // Append children
                // Note: We need to respect the key mapping
                const childrenNodes = transformData(data, node.level + 1, node);
                node.children = childrenNodes;
                node.rawNode[props.childrenField || 'children'] = data;
            } else {
                node.isLeaf = true;
            }
        };

        if(props.load) {
            props.load(node, resolve);
        }
    } else {
        setExpanded(node.key, !node.expanded);
    }
  };

  const updateCheckStateUpward = (node: TreeNode) => {
     if (props.checkStrictly || !node.parentKey) return;
     const parent = nodeMap.value.get(node.parentKey);
     if(!parent) return;

     const children = parent.children;
     const allChecked = children.every(c => c.checked);
     const someChecked = children.some(c => c.checked || c.indeterminate);

     if (parent.checked !== allChecked) {
         parent.checked = allChecked;
         if(allChecked) {
             checkedKeys.value.add(parent.key);
             indeterminateKeys.value.delete(parent.key);
         } else {
             checkedKeys.value.delete(parent.key);
         }
     }

     if(allChecked) {
         parent.indeterminate = false;
     } else {
         parent.indeterminate = someChecked;
         if(someChecked) indeterminateKeys.value.add(parent.key);
         else indeterminateKeys.value.delete(parent.key);
     }

     updateCheckStateUpward(parent);
  };

  const updateCheckStateDownward = (node: TreeNode, checked: boolean) => {
      if (props.checkStrictly) return;
      node.children.forEach(child => {
          if (child.disabled) return; 
          child.checked = checked;
          child.indeterminate = false;
          if(checked) checkedKeys.value.add(child.key);
          else checkedKeys.value.delete(child.key);
          
          updateCheckStateDownward(child, checked);
      });
  };

  const toggleCheck = (node: TreeNode, checked: boolean) => {
      if(node.disabled) return;
      
      node.checked = checked;
      node.indeterminate = false;
      if(checked) checkedKeys.value.add(node.key);
      else checkedKeys.value.delete(node.key);

      // Downward
      updateCheckStateDownward(node, checked);
      // Upward
      updateCheckStateUpward(node);

      emit('update:checkedKeys', Array.from(checkedKeys.value));
      emit('check', Array.from(checkedKeys.value), { checked, node, event: null });
  };

  const toggleSelect = (node: TreeNode, event: Event) => {
      if (!props.selectable || node.disabled) return;

      const selected = !node.selected;
      if (props.multiple) {
          node.selected = selected;
          if (selected) selectedKeys.value.add(node.key);
          else selectedKeys.value.delete(node.key);
      } else {
          // Single select
          if(selected) {
              // Clear others
              selectedKeys.value.forEach(k => {
                  const n = nodeMap.value.get(k);
                  if(n) n.selected = false;
              });
              selectedKeys.value.clear();
              selectedKeys.value.add(node.key);
              node.selected = true;
          } else {
              selectedKeys.value.delete(node.key);
              node.selected = false;
          }
      }

      emit('update:selectedKeys', Array.from(selectedKeys.value));
      emit('select', Array.from(selectedKeys.value), { selected, node, event });
  };

  const handleNodeClick = (node: TreeNode, event: Event) => {
      // 1. Select
      toggleSelect(node, event);

      // 2. Check if checkOnClickNode
      if (props.checkable && props.checkOnClickNode && !node.disabled) {
          toggleCheck(node, !node.checked);
      }
      
      emit('node-click', node, event);
  };

  // --- Drag & Drop ---
  const dragState = reactive({
      draggingNode: null as TreeNode | null,
      dropNode: null as TreeNode | null,
      dropType: null as 'before' | 'after' | 'inner' | null,
      showIndicator: false,
      indicatorTop: 0
  });

  const handleDragStart = (node: TreeNode, e: DragEvent) => {
      if (!props.draggable) return;
      dragState.draggingNode = node;
      if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
      }
      emit('node-drag-start', node, e);
  };

  const handleDragOver = (node: TreeNode, e: DragEvent) => {
      if (!props.draggable || !dragState.draggingNode) return;
      e.preventDefault();
      if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
      }
      
      const targetEl = e.currentTarget as HTMLElement;
      const rect = targetEl.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const height = rect.height;
      const threshold = height * 0.25;
      
      let type: 'before' | 'after' | 'inner';
      
      if (offsetY < threshold) {
          type = 'before';
      } else if (offsetY > height - threshold) {
          type = 'after';
      } else {
          type = 'inner';
      }
      
      // prohibit dropping on self or children (simple key check for self, need recursion for children)
      // For now, prevent self
      if (node.key === dragState.draggingNode.key) {
          dragState.showIndicator = false;
          return;
      }
      // TODO: Prevent dropping parent into child
      // Simple traversal up from 'node' (drop target) to see if 'draggingNode' is ancestor
      let current = node;
      let isValid = true;
      while (current.parentKey) {
          if (current.parentKey === dragState.draggingNode.key) {
              isValid = false;
              break;
          }
          const p = nodeMap.value.get(current.parentKey);
          if (!p) break;
          current = p;
      }
      if (!isValid) {
          dragState.showIndicator = false;
          return;
      }
      
      dragState.dropNode = node;
      dragState.dropType = type;
      
      const rowTop = targetEl.offsetTop; 
      if (type === 'before') {
          dragState.indicatorTop = rowTop;
      } else if (type === 'after') {
          dragState.indicatorTop = rowTop + height;
      } else {
          // inner
          dragState.indicatorTop = -9999;
      }
      dragState.showIndicator = type !== 'inner';
      
      emit('node-drag-over', node, e);
  };

  const handleDragEnd = (node: TreeNode, e: DragEvent) => {
      dragState.draggingNode = null;
      dragState.dropNode = null;
      dragState.showIndicator = false;
      emit('node-drag-end', node, e);
  };

  const updateLevel = (node: TreeNode, newLevel: number) => {
      node.level = newLevel;
      if (node.children) {
          node.children.forEach(child => updateLevel(child, newLevel + 1));
      }
  };

  const handleDrop = (node: TreeNode, e: DragEvent) => {
      if (!props.draggable || !dragState.draggingNode || !dragState.dropNode || !dragState.dropType) return;
      
      e.preventDefault();
      e.stopPropagation();

      const draggingNode = dragState.draggingNode;
      const dropNode = dragState.dropNode;
      const type = dragState.dropType;

      // 1. Remove from source
      const oldParentKey = draggingNode.parentKey;
      const oldParent = oldParentKey ? nodeMap.value.get(oldParentKey) : null;
      const sourceList = oldParent ? oldParent.children : roots.value;
      const idx = sourceList.findIndex(n => n.key === draggingNode.key);
      if (idx > -1) sourceList.splice(idx, 1);
      
      // Update raw data (source)
      const rawSourceList = oldParent 
          ? (oldParent.rawNode[props.childrenField || 'children'] as TreeOption[]) 
          : props.data;
      if (Array.isArray(rawSourceList)) {
          // We use logic to find by key reference?
          // Since we might have generated key, finding by object ref is safer if possible, 
          // or we trust the index if synchronization is perfect.
          // Let's use index from sourceList if we trust they are 1:1.
          // They should be 1:1 if transformData is pure.
          // However, safe way is finding the object
           const rawIdx = rawSourceList.indexOf(draggingNode.rawNode);
           if (rawIdx > -1) rawSourceList.splice(rawIdx, 1);
      }

      // 2. Insert into target
      let newParent: TreeNode | null = null;
      let targetList: TreeNode[];
      let insertIndex: number;
      
      if (type === 'inner') {
          newParent = dropNode;
          targetList = newParent.children;
          insertIndex = targetList.length;
          newParent.expanded = true;
          newParent.isLeaf = false;
      } else {
          const dropParentKey = dropNode.parentKey;
          newParent = dropParentKey ? nodeMap.value.get(dropParentKey)! : null;
          targetList = newParent ? newParent.children : roots.value;
          const dropIdx = targetList.findIndex(x => x.key === dropNode.key);
          insertIndex = type === 'before' ? dropIdx : dropIdx + 1;
      }
      
      // Update Node
      draggingNode.parentKey = newParent ? newParent.key : null;
      updateLevel(draggingNode, newParent ? newParent.level + 1 : 0);
      targetList.splice(insertIndex, 0, draggingNode);
      

      // Update raw data (target)
      let rawTargetList: TreeOption[];
      if (newParent) {
          if (!newParent.rawNode[props.childrenField || 'children']) {
              newParent.rawNode[props.childrenField || 'children'] = [];
          }
          rawTargetList = newParent.rawNode[props.childrenField || 'children'] as TreeOption[];
      } else {
          rawTargetList = props.data;
      }
      
      if (Array.isArray(rawTargetList)) {
          rawTargetList.splice(insertIndex, 0, draggingNode.rawNode);
      }
      
      emit('node-drop', draggingNode, dropNode, type, e);
      // NOTE: We don't emit 'update:data' because props mutation is tricky, 
      // but since we mutated component internal state, the view updates. 
      // User who provided 'data' prop (array) will see their array mutated.
  };

  // Searching / Filtering
  const filter = (query: string) => {
      if(!props.filterMethod) return;
      
      const traverseVisible = (node: TreeNode): boolean => {
          // 当前节点是否匹配
          const matches = props.filterMethod!(query, node);
          node.visible = matches;
          
          let hasVisibleChild = false;
          // check children
          node.children.forEach(child => {
              const childVisible = traverseVisible(child);
              if (childVisible) {
                  hasVisibleChild = true;
                  node.visible = true; // 只要有子节点可见，父节点就可见
              }
          });

          if(matches || hasVisibleChild) {
              // Expand parent path if we want to show results
              if(query && node.parentKey) {
                  const parent = nodeMap.value.get(node.parentKey);
                  if(parent && !parent.expanded) {
                      setExpanded(parent.key, true);
                  }
              }
          }
          
          return node.visible;
      };

      roots.value.forEach(root => traverseVisible(root));
  };
  
  // Expose
  return {
    nodeMap,
    flattenVisibleNodes,
    toggleExpand,
    toggleCheck,
    toggleSelect,
    handleNodeClick,
    dragState,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    filter
  };
}
