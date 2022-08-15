<template>
  <div
    :style="{
      display: 'inline-flex',
      flexDirection: column ? 'column' : 'row',
    }"
  >
    <y-checkbox
      @click="Change(item)"
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-model="modelValue"
      >{{ item.label }}
    </y-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import YCheckbox from "../checkbox";
import "./style/index.less";
import { IOptions } from "./types";

export default defineComponent({
  name: "YCheckboxGroup",
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    options: {
      type: Array as PropType<IOptions[]>,
      default: [],
    },
    column: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    YCheckbox,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const Change = (item: IOptions) => {
      let valueList = [...props.modelValue];
      if (valueList.indexOf(item.value) === -1) {
        valueList.push(item.value);
      } else {
        valueList = valueList.filter((itemValue) => itemValue !== item.value);
      }

      emit("update:modelValue", valueList);
      emit("change", item);
    };
    return {
      Change,
    };
  },
});
</script>

<style lang="less" scoped></style>
