<template>
  <TreeItem
    :data="treeData"
    :isSelect="isSelect"
    :props="props"
    :expand="expand"
    @checkedItem="checkedItem"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  reactive,
} from "vue";
import TreeItem from "./component/tree-item/tree-item.vue";
import $bus from "../../bus/bus";
import { deepClone, uuid } from "./../../shared/utils";
import "./style/index.less";

export default defineComponent({
  name: "ATree",
  props: {
    data: {
      type: Array<any>,
      default: () => [],
    },
    isSelect: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "title",
          key: "id",
        };
      },
    },
    nodeKey: {
      type: String,
      default: "",
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TreeItem,
  },
  emits: [
    "update:defaultCheckedKeys",
    "operation",
    "node-click",
    "change",
    "checked",
  ],
  setup(props, { emit }) {
    const uniKey = uuid();
    const treeData = reactive(deepClone(props.data));
    const mainTreeKey = props.data[0].key;
    
    const updateParentChecked = (
      date: any,
      currentItem: any,
      currentChecked: boolean
    ) => {
      date.forEach((item: any) => {
        // 找到当前item的父级
        if (item.key === currentItem.pid) {
          let hasUnchecked = false;
          item.children &&  ( hasUnchecked = item.children.some((i:any)=>i.checked === false) )
           // 当前节点的子节点是否有未勾选项, 有未勾选当前节点则为未勾选
          if ((hasUnchecked)) {
            item.checked = false;
            // 当前节点的子节点有未选项，并且至少有一个勾选项或选中半选中项则当前节点为半选中
            if (item.children.some((j: any) => (j.checked === true || j.indeterminate === true))) {
                item.indeterminate = true;       
              } else {
                item.indeterminate = false;
              }
          } else {
            item.checked = currentChecked;
            item.indeterminate = false;
          }
          updateParentChecked(treeData, item, item.checked);
        } 
        item.children &&
          updateParentChecked(item.children, currentItem, currentChecked);
      });
    };

    const initDefaultChecked = (
      data: any,
      isParentChecked = false,
      pid = null
    ) => {
      for (let i = 0; i < data.length; i++) {
        let isChecked = isParentChecked;
        const item = data[i];
        item.checked = false;
        item.pid = pid;
        item.expand = props.expand;
        item.indeterminate = false;
        // 处理全选、半选和未选中状态
        if (isChecked) {
          item.checked = true;
        } else if (props.defaultCheckedKeys.includes(item.key)) {
          item.checked = true;
          isChecked = true;
        } else {
          // 判断是否存在子节点被选中
          if (item.children) {
            let hasCheckedChildren = item.children.some((child: any) => {
              return props.defaultCheckedKeys.includes(child.key);
            });
            if (hasCheckedChildren) { 
              item.checked = false; // 设置为半选中状态
            }
          }
        }  
        item.children && initDefaultChecked(item.children, isChecked, item.key);
        updateParentChecked(treeData, item, item.checked);
      }
    };

    initDefaultChecked(treeData);

    onBeforeMount(() => {
      initEvent();
    });

    onBeforeUnmount(() => {
      $bus.$off("operation");
      $bus.$off("node-click");
      $bus.$off("change");
      $bus.$off("checked");
    });

    const initEvent = () => {
      $bus.$on("operation" + uniKey, ({ type, treeNode }: any) => {
        emit("operation", { type, treeNode });
      });

      $bus.$on("node-click" + uniKey, (item: any) => {
        emit("node-click", item);
      });

      $bus.$on("change" + uniKey, (item: any) => {
        emit("change", item);
      });

      $bus.$on("checked" + uniKey, (item: any) => {
        emit("checked", item);
      });
    };

    const checkedItem = (treeData: any) => {
      if (treeData[0].key !== mainTreeKey) return;
      let checkedKeys = props.defaultCheckedKeys;
      initDefaultChecked(treeData);
      emit("update:defaultCheckedKeys", checkedKeys);
    };
    provide("uniKey", uniKey);
    provide("default-checked-keys", props.defaultCheckedKeys);
    provide("node-key", props.nodeKey);
    provide("tree-data", treeData);
    provide("expand", props.expand);
    return {
      treeData,
      checkedItem,
    };
  },
});
</script>
