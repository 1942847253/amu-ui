<template>
  <div 
    class="amu-tree"
    :class="{ 
        'amu-tree--highlight-current': true,
        'amu-tree--virtual': virtual
    }"
    role="tree"
    :style="containerStyle"
    @scroll="handleScroll"
  >
    <!-- Virtual Scroll Phantom -->
    <div 
        v-if="virtual" 
        class="amu-tree-phantom" 
        :style="{ height: totalHeight + 'px' }"
    ></div>

    <TransitionGroup 
        tag="div"
        class="amu-tree-nodes"
        ref="listRef"
        :name="virtual ? '' : 'amu-tree-list'"
        :style="listStyle"
    >
      <div 
        v-if="renderNodes.length === 0" 
        class="amu-tree__empty-block"
        key="empty-block"
      >
        <span class="amu-tree__empty-text">
            <slot name="empty">No Data</slot>
        </span>
      </div>

      <TreeNodeComponent
        v-for="node in renderNodes"
        :key="node.key"
        :node="node"
        :checkable="checkable"
        :draggable="draggable"
        :show-line="showLine"
        :indent="indent"
        @toggle-expand="toggleExpand"
        @check="handleCheck"
        @node-click="handleNodeClick"
        @node-contextmenu="handleNodeContextmenu"
        @node-drag-start="handleDragStart"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      />
      
      <!-- Drop Indicator Line -->
       <div 
         v-show="dragState.showIndicator"
         class="amu-tree__drop-indicator"
         :style="indicatorStyle"
         key="drop-indicator"
       ></div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { provide, useSlots, ref, computed, onMounted, reactive, watch, TransitionGroup } from 'vue';
import { treeProps, treeEmits } from './props';
import { useTree } from './use-tree';
import TreeNodeComponent from './tree-node.vue';
import type { TreeNode, TreeKey } from './types';

defineOptions({
  name: 'AmuTree'
});

const props = defineProps(treeProps);
const emit = defineEmits(treeEmits);
const slots = useSlots();

// Provide slots to children
provide('treeSlots', slots);

const { 
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
} = useTree(props, emit);

// --- Virtual Scroll Logic ---
const listRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);

const totalHeight = computed(() => flattenVisibleNodes.value.length * props.itemHeight);

const visibleRange = computed(() => {
    if (!props.virtual) {
        return { start: 0, end: flattenVisibleNodes.value.length };
    }
    
    const count = Math.ceil(props.height / props.itemHeight) + 5; // buffer
    const start = Math.floor(scrollTop.value / props.itemHeight);
    const end = Math.min(start + count, flattenVisibleNodes.value.length);
    return { start, end };
});

const renderNodes = computed(() => {
    if (!props.virtual) return flattenVisibleNodes.value;
    
    return flattenVisibleNodes.value.slice(visibleRange.value.start, visibleRange.value.end);
});

const containerStyle = computed(() => {
    if(props.virtual) {
        return {
            height: props.height + 'px',
            overflowY: 'auto' as const,
            position: 'relative' as const
        };
    }
    return {};
});

const listStyle = computed(() => {
    if(props.virtual) {
        return {
            transform: `translateY(${visibleRange.value.start * props.itemHeight}px)`,
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%'
        };
    }
    return {};
});

const handleScroll = (e: Event) => {
    if (!props.virtual) return;
    const target = e.target as HTMLElement; // Actually, the event is on container in template? No, I put scroll on `nodes` but wait.
    // If virtual, structure should be: 
    // Container (overflow: auto, relative, height fixed)
    //   -> Phantom (height = total)
    //   -> List (absolute top: 0, width: 100%, transform translateY)
    
    // My template structure above is:
    // Container (role=tree, style=height...) -> this should be the scroller if virtual
    // Phantom
    // Nodes (transform)
    
    // So handleScroll should be on Container (the root div).
    // Let me fix the template structure in my mind.
    // Currently template put scroll on `.amu-tree-nodes`? No, `.amu-tree-nodes` is inner.
    // If I put overflow on `.amu-tree`, then `.amu-tree` scrolls. Phantom expands it.
    // So `.amu-tree` handles scroll. 
    scrollTop.value = (e.target as HTMLElement).scrollTop;
};
// Correction: In template I put @scroll on .amu-tree-nodes, this is wrong if .amu-tree is the container.
// I will bind @scroll to the root div in the updated template below (I can't edit existing text in this api call easily but I am creating the file now).
// Actually, let's fix the template logic in the `create_file` payload.

// --- Event Proxies ---
const handleCheck = (node: TreeNode, checked: boolean) => {
    toggleCheck(node, checked);
};

// handleNodeClick is provided by useTree now
// const handleSelect = (node: TreeNode, e: Event) => {
//    toggleSelect(node, e);
// };

const handleNodeContextmenu = (e: MouseEvent, node: TreeNode) => {
    emit('node-contextmenu', e, node);
};

const indicatorStyle = computed(() => ({
    top: dragState.indicatorTop + 'px',
    left: '0px',
    right: '0px'
}));

// Fix Scroll Logic Location
// If virtual: root is scroller.
// If NOT virtual: root scrolls too if height set? Or user wraps it?
// Let's assume root is scroller if height is set or virtual.
const onRootScroll = (e: Event) => {
    if (props.virtual) {
        scrollTop.value = (e.target as HTMLElement).scrollTop;
    }
};

defineExpose({
    filter,
    // expose other methods if needed
});
</script>
