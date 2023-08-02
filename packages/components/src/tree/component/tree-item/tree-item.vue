<template>
  <div class="a-tree-menu">
    <div
      :class="`a-tree-list tree-ref-${uid}`"
      ref="treeRef"
      :node-key="item[nodeKey]"
      v-for="(item, index) in treeData"
      :key="item[props.key]"
    >
      <div
        class="a-tree-item"
        @click="(event) => changeStatus(event, index)"
        :class="['treeNode', { 'treeNode--select': item.onSelect }]"
      >
        <i
          v-show="item[props.children]"
          :class="[
            'iconfont icon-tree-retract',
            state.carets[state.tapScopes[index]],
          ]"
        />
        <ACheckBox
          v-if="isSelect"
          :stopLabelTrigger="true"
          style="margin-left: 5px"
          :default-value="item.checked"
          :indeterminate="item.indeterminate"
          @updateDefaultValue="
            (checked: boolean) => {
              checkedTreeItem(item, checked,index);
            }
          "
          @label-click="tap(item, index)"
        >
          <span @click="tap(item, index)" class="title">{{
            item[props.label]
          }}</span>
        </ACheckBox>
        <span @click="tap(item, index)" v-else>{{ item[props.label] }}</span>
      </div>

      <div
        class="a-tree-item-content"
        :style="{ gridTemplateRows: state.scopes[index] ? '1fr' : '0fr' }"
      >
        <a-tree-item
          :isSelect="isSelect"
          :data="item[props.children]"
        ></a-tree-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  inject,
  onBeforeMount,
  onMounted,
} from "vue";
import $bus from "../../../../bus/bus";
import ACheckBox from "@components/checkbox";
import { uuid } from "../../../../shared/utils";
import "./style/index.less";

const CARETS = { open: "caret-down", close: "caret-right" };
export default defineComponent({
  name: "ATreeItem",
  props: {
    data: {
      type: Array,
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
  },
  emits: ["checkedItem"],
  components: {
    ACheckBox,
  },
  setup(props, { emit }) {
    const uniKey = inject("uniKey");
    const uid = uuid();
    const nodeKey = inject("node-key") as string;
    const treeData = reactive(props.data) as any;
    const TtreeData = inject("tree-data");
    const state = reactive({
      carets: CARETS,
      tapScopes: {},
      scopes: {},
      height: 0,
    }) as any;

    onBeforeMount(() => {});

    onMounted(() => {});

    const checkedTreeItem = (item: any, checked: boolean, index: number) => {
      updateDefaultValue(item, checked);
      $bus.$emit("checked" + uniKey, item, index);
    };

    const updateDefaultValue = (item: any, checked: boolean) => {
      item.checked = checked;
      if (item.checked) {
        if (item.children && item.children.length > 0) {
          item.children.forEach((node: any) => {
            updateDefaultValue(node, true);
          });
        }
      } else {
        if (item.children && item.children.length > 0) {
          item.children.forEach((node: any) => {
            updateDefaultValue(node, false);
          });
        }
      }
      updateParentChecked(TtreeData, item, item.checked);
    };

    const updateParentChecked = (
      date: any,
      currentItem: any,
      currentChecked: boolean
    ) => {
      date.forEach((item: any) => {
        // 找到当前item的父级
        if (item.key === currentItem.pid) {
          let hasUnchecked = false;
          item.children &&
            (hasUnchecked = item.children.some(
              (i: any) => i.checked === false
            ));
          // 当前节点的子节点是否有未勾选项, 有未勾选当前节点则为未勾选
          if (hasUnchecked) {
            item.checked = false;
            // 当前节点的子节点有未选项，并且至少有一个勾选项或选中半选中项则当前节点为半选中
            if (
              item.children.some(
                (j: any) => j.checked === true || j.indeterminate === true
              )
            ) {
              item.indeterminate = true;
            } else {
              item.indeterminate = false;
            }
          } else {
            item.checked = currentChecked;
            item.indeterminate = false;
          }
          updateParentChecked(TtreeData, item, item.checked);
        }
        item.children &&
          updateParentChecked(item.children, currentItem, currentChecked);
      });
    };

    const operation = (type: any, treeNode: any) => {
      $bus.$emit("operation" + uniKey, { type, treeNode });
    };

    const tap = (item: any, index: any) => {
      $bus.$emit("node-click" + uniKey, item);
    };

    const changeStatus = (event: MouseEvent, index: string | number) => {
      const currentEl = event.target as unknown as HTMLElement;
      // 防止CheckBox的change事件触发tree的展开收起
      if (["LABEL", "INPUT"].includes(currentEl.nodeName)) return;
      $bus.$emit("change" + uniKey, props.data[index as any]);
      // 图标变化
      state.tapScopes[index] = state.tapScopes[index]
        ? state.tapScopes[index] === "open"
          ? "close"
          : "open"
        : "open";
      // 展开闭合
      state.scopes[index] = state.scopes[index] ? false : true;
    };

    return {
      treeData,
      uniKey,
      nodeKey,
      state,
      operation,
      tap,
      changeStatus,
      uid,
      updateDefaultValue,
      checkedTreeItem,
    };
  },
});
</script>
