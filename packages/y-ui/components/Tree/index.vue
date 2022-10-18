<template>
  <Tree :data="treeData" :isSelect="isSelect" :props="props" :expand="expand" @checkedItem="checkedItem" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, provide, reactive, watch } from "vue";
import Tree from './Tree.vue';
import $bus from "../../bus/bus";
import { deepClone, uuid } from "./../../shared/utils";

export default defineComponent({
  name: "YTree",
  props: {
    data: {
      type: Array<any>,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "title",
          key: 'id',
        }
      }
    },
    nodeKey: {
      type: String,
      default: ''
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Tree,
  },
  emits: ['update:defaultCheckedKeys', 'operation', 'node-click', 'change', 'checked',],
  setup(props, { emit }) {
    const uniKey = uuid()
    const treeData = reactive(deepClone(props.data))
    const mainTreeKey = props.data[0].key
    const initDefaultChecked = (data: any, isParentChecked = false, pid = null) => {
      for (let i = 0; i < data.length; i++) {
        let isChecked = isParentChecked
        const item = data[i]
        item.checked = false;
        item.pid = pid
        item.expand = props.expand
        if (isChecked) {
          item.checked = true;
        } else if (props.defaultCheckedKeys.includes(item.key)) {
          item.checked = true;
          isChecked = true;
        }
        item.children && initDefaultChecked(item.children, isChecked, item.key)
      }


    }

    initDefaultChecked(treeData);

    onBeforeMount(() => {
      initEvent();
    })

    onBeforeUnmount(() => {
      $bus.$off('operation')
      $bus.$off('node-click')
      $bus.$off('change')
      $bus.$off('checked')
    })

    const initEvent = () => {
      $bus.$on('operation' + uniKey, ({ type, treeNode }: any) => {
        emit('operation', { type, treeNode })
      })

      $bus.$on('node-click' + uniKey, (item: any) => {
        emit('node-click', item)
      })

      $bus.$on('change' + uniKey, (item: any) => {
        emit('change', item)
      })

      $bus.$on('checked' + uniKey, (item: any) => {
        emit('checked', item)
      })

    }

    const checkedItem = (treeData: any) => {
      if (treeData[0].key !== mainTreeKey) return;
      let checkedKeys = props.defaultCheckedKeys
      emit('update:defaultCheckedKeys', checkedKeys)
    }
    provide('uniKey', uniKey);
    provide('default-checked-keys', props.defaultCheckedKeys);
    provide('node-key', props.nodeKey);
    provide('tree-data', treeData);
    provide('expand', props.expand)
    return {
      treeData,
      checkedItem
    }
  },


})
</script>