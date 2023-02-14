<template>
  <div  class="y-table">
    <table :style="`width:${props.width}`" ref="tableRef">
    <thead :class="`${props.border ? '' : 't-head-falg'}`">
      <tr>
        <th
          :style="`width: ${
            props.tableData.length > 0 ? '' : '100vw'
          }; border: ${props.border && '1px solid #ebeef5'};`"
          v-for="info of props.tableColumn"
          :key="info.key"
        >
          {{ info.text }}
        </th>
      </tr>
    </thead>
    <tbody v-if="props.tableData.length > 0">
      <tr v-for="(item, index) of props.tableData" :key="item.id">
        <td
          v-for="(value, key) in item"
          :key="key"
          @click.stop="showEditInput($event, key, index)"
          :style="`width: ${
            getWidth(key) ? getWidth(key) + 'px' : ` calc(100vw)`
          }; border: ${props.border && '1px solid #ebeef5'};`"
        >
          <slot
            name="table"
            :tableColumn="getTargetColumn(key)"
            :tableData="item"
          >
            {{ !editInputApp && value }}</slot
          >
        </td>
        <td
        v-show="operationTd"
          :style="`white-space: nowrap;width:calc(100vw);border: ${
            props.border && '1px solid #ebeef5'
          };`"
        >
          <slot name="operation" :item="item" :index="index"></slot>
        </td>
      </tr>
    </tbody>
  
  </table>
    <div
      v-if="props.tableData.length === 0"
      class="no-data"
      :style="`border: ${props.border && '1px solid #ebeef5'};border-top:none`"
    >
      <span>
        暂无数据
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { App, createApp, reactive, ref, computed } from "vue";
import { editTdStat, initTdStats } from "./baseData";
import EditInput from "./EditInput/EditInput.vue";

let editInputApp: null | App<Element> = null; // 要编辑的td中的input元素
let target = null as any; // 要编辑的 td
let editRowTds = null as any; // 当前列的所有 td
window.addEventListener("click", () => removeEditInputApp(editInputApp), false);

const props = defineProps({
  tableData: {
    type: Array as any,
    default: () => [],
  },
  tableColumn: {
    type: Array as any,
    default: () => [],
  },
  width: {
    type: String,
    default: "100%",
  },
  border: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["editData"]);

// 编辑 td 后要emit出去的数据
const state = reactive({
  key: "",
  value: "",
  index: -1,
  text: "",
});
const tableRef = ref<null | HTMLTableElement>(null);

const operationTd = computed(()=>{
  let isOperationTd = false
  props.tableColumn.forEach((item:any)=>{
    if (item.key === 'operation'){
      isOperationTd = true
    }
  })
  return isOperationTd;
})
// 用于指定th表头宽度
const getWidth = (key) => {
  return props.tableColumn.find((item) => item.key === key).width || null;
};

const setValue = (value) => {
  state.value = value;
  emit("editData", state);
};

// 显示编辑
const showEditInput = (event: Event, key, index) => {
  event.stopPropagation();
  editInputApp && removeEditInputApp(editInputApp);
  if (!checkEditbale(key)) return;
  target = event.target as any;
  editRowTds = target.parentNode.parentNode.querySelectorAll(".td-content");
  const oFrag = document.createDocumentFragment() as any;
  editInputApp = createApp(EditInput, {
    value: target.innerText as string,
    setValue,
  });
  if (editInputApp) {
    editRowTds.forEach((td) => {
      editTdStat(td);
    });
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    target.querySelector(".edit-input").select();
  }
  setData({ index, key });
};

// 移除编辑框
const removeEditInputApp = (editInputApp) => {
  if (!editRowTds) return;
  editRowTds.forEach((td) => {
    initTdStats(td);
  });
  editInputApp && editInputApp.unmount();
};

const setData = ({ index, key }) => {
  state.text = props.tableColumn.find((item) => item.key === key).text;
  state.key = key;
  state.index = index;
};

const checkEditbale = (key: number) => {
  const { editable } = props.tableColumn.find((item) => item.key === key);
  return editable;
};

// 获取当前列的数据
const getTargetColumn = (key) => {
  return props.tableColumn.find((item) => item.key === key);
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
