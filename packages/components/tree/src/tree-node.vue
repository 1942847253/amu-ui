<template>
  <div
    class="amu-tree-node"
    :class="{
      'is-expanded': node.expanded,
      'is-current': node.selected,
      'is-checked': node.checked,
      'is-disabled': node.disabled,
      'is-leaf': node.isLeaf
    }"
    :style="{ paddingLeft: showLine ? '0' : (node.level * (indent || 18)) + 'px' }"
    @click.stop="handleContentClick"
    @contextmenu="handleContextMenu"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragend="handleDragEnd"
    :draggable="draggable && !node.disabled"
  >
    <!-- Show Line Indentation -->
    <span v-if="showLine" class="amu-tree-node__indent">
        <span 
          v-for="(isBlank, idx) in node.hasLine" 
          :key="idx" 
          class="amu-tree-node__indent-block"
          :class="{ 'is-blank': isBlank }"
        ></span>
    </span>

    <!-- 展开/折叠箭头 -->
    <div 
      class="amu-tree-node__expand-icon" 
      @click.stop="handleExpandClick"
      :class="{ 
          'is-leaf': node.isLeaf, 
          'expanded': node.expanded,
          'is-show-line': showLine
      }"
    >
      <RenderIcon :node="node" v-if="$slots.icon || (inject('treeSlots') as any)?.icon" />
      
      <template v-else>
         <!-- ShowLine Mode Custom Icon -->
         <span v-if="showLine && !node.isLeaf" class="amu-tree-node__line-icon">
            {{ node.expanded ? '-' : '+' }}
         </span>

         <span v-else-if="node.loading" class="amu-tree-node__loading-icon">
             <AmuIcon><IconLoading /></AmuIcon>
         </span>
         <AmuIcon v-else-if="!node.isLeaf">
            <IconChevronRight />
         </AmuIcon>
      </template>
    </div>

    <!-- 复选框 -->
    <AmuCheckbox
      class="amu-tree-node__checkbox"
      v-if="checkable"
      :model-value="node.checked"
      :indeterminate="node.indeterminate"
      :disabled="node.disabled"
      @change="handleCheckChange"
      @click.stop
    />

    <!-- 节点内容 -->
    <div class="amu-tree-node__content">
       <RenderNode :node="node" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, h, defineComponent } from 'vue';
import { AmuIcon } from '../../icon';
import { AmuCheckbox } from '../../checkbox';
// 我们假设这几个 icon 存在，如果不存在，我稍后会用 svg 替换
// 实际上 AmuUI 的 icons 应该是动态注册的，或者我们直接用 SVG string
// 为了不依赖具体 icon 名字，我还是写个简单 SVG 吧，或者依赖 slot
import { TreeNode } from './types';

// 临时 SVG 组件，防止 IconChevronRight 不存在
const IconChevronRight = defineComponent({
  render() {
    return h('svg', { viewBox: "0 0 1024 1024", width: "1em", height: "1em" }, [
        h('path', { d: "M384 192v640l384-320.064z", fill: "currentColor" })
    ]);
  }
});
const IconLoading = defineComponent({
    render() {
        return h('svg', { viewBox:"0 0 1024 1024", width:"1em", height:"1em", class:"is-loading" }, [
      h('path', { d:"M512 64c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z", fill:"currentColor", opacity:"0.25" }),
            h('path', { d:"M512 140c205.4 0 372 166.6 372 372 0 205.4-166.6 372-372 372V140z", fill:"currentColor", opacity:"0.5" }) // Simplified loading
        ]);
    }
});

const props = defineProps<{
  node: TreeNode;
  checkable: boolean;
  draggable: boolean;
  showLine?: boolean;
  indent?: number;
}>();

const emit = defineEmits<{
  (e: 'toggle-expand', node: TreeNode): void;
  (e: 'check', node: TreeNode, checked: boolean): void;
  (e: 'node-click', node: TreeNode, event: Event): void;
  // Drag events - native proxies
  (e: 'node-drag-start', node: TreeNode, event: DragEvent): void;
  (e: 'node-drag-over', node: TreeNode, event: DragEvent): void;
  (e: 'node-drop', node: TreeNode, event: DragEvent): void;
  (e: 'node-drag-end', node: TreeNode, event: DragEvent): void;
  (e: 'node-contextmenu', event: MouseEvent, node: TreeNode): void;
}>();

// Render Helper Component to support slots
const RenderNode = defineComponent({
    props: ['node'],
    setup(props) {
        const treeSlots = inject('treeSlots') as any;
        return () => {
            if (treeSlots && treeSlots.default) {
                return treeSlots.default({ node: props.node });
            }
            return h('span', { class: 'amu-tree-node__label' }, props.node.label);
        }
    }
});

const RenderIcon = defineComponent({
    props: ['node'], // Accept full node
    setup(props) {
        const treeSlots = inject('treeSlots') as any;
        return () => {
             // If loading, prioritize loading icon, OR let user override it entirely?
             // Usually loading is distinct. But user asked for customization of expand icon.
             // If user provides 'icon' slot, we use it.
             if (treeSlots && treeSlots.icon) {
                 return treeSlots.icon({ node: props.node, expanded: props.node.expanded });
             } 
             return null; // Fallback to template default
        }
    }
});


const handleExpandClick = () => {
  if (props.node.isLeaf) return;
  emit('toggle-expand', props.node);
};

const handleCheckChange = (checked: boolean) => {
  emit('check', props.node, checked);
};

const handleContentClick = (e: Event) => {
  emit('node-click', props.node, e);
};

const handleContextMenu = (e: MouseEvent) => {
  emit('node-contextmenu', e, props.node);
};

// Drag Handlers
const handleDragStart = (e: DragEvent) => {
    emit('node-drag-start', props.node, e);
}
const handleDragOver = (e: DragEvent) => {
    emit('node-drag-over', props.node, e);
}
const handleDrop = (e: DragEvent) => {
    emit('node-drop', props.node, e);
}
const handleDragEnd = (e: DragEvent) => {
    emit('node-drag-end', props.node, e);
}
</script>
