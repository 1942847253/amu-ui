<template>
  <div class="y-selector-input">
    <YInput
      v-model="value"
      isSelector
      :isSearch="false"
      :readonly="isSearch ? false : true"
      :placeholder="placeholder"
      @input="searchOptions"
      @focus="firstBurlSearch"
      @blur="setValue()"
      @resetValue="resetValue"
      @change="(val) => updateInputValue(val)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref, watch } from "vue";
import YInput from "../../Input";
export default defineComponent({
  name: "SelectorInput",
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    inputValue: {
      type: String,
    },
    isSearch: {
      type: Boolean,
    },
  },
  emits: ["searchOptions", "blurInitValue", "resetValue"],
  components: {
    YInput,
  },
  setup(props, { emit }) {
    const value = ref(props.inputValue);

    const shrinkSelectMenuFn = inject("shrinkSelectMenuFn") as Ref<Function>;
    const updateInputValue = inject("updateInputValue") as Function;
    const updateLocalValue = inject("updateLocalValue") as Function;

    const searchOptions = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const val = target.value as string;
      emit("searchOptions", val);
    };

    watch(
      () => props.inputValue,
      (val) => {
        value.value = val;
      }
    );

    const firstBurlSearch = () => {
      shrinkSelectMenuFn.value(1, 0.15);
      emit("searchOptions", "");
    };

    const setValue = () => {
      updateLocalValue();
    };

    const resetValue = (value: string | number) => {
      emit("resetValue", value);
    };
    return {
      value,
      setValue,
      resetValue,
      searchOptions,
      updateInputValue,
      firstBurlSearch,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
