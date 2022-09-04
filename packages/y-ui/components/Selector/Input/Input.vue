<template>
  <div class="selector-input">
    <label v-show="!inputValue" @click="blurInput" class="placeholder">{{
      placeholder
    }}</label>
    <input
      class="input"
      type="text"
      :value="inputValue"
      ref="input"
      :readonly="!isSearch"
      @input="searchOptions"
      @focus="firstBurlSearch"
      @blur="setValue(inputValue!)"
    />
    <span
      style="transform: translateX(-50 %) rotate(-90deg)"
      class="iconfont icon-xiangxia"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
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
  emits: ["searchOptions"],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const searchOptions = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const val = target.value as string;
      emit("searchOptions", val);
    };
    const firstBurlSearch = () => {
      emit("searchOptions", "");
    };

    const setValue = (value: string) => {
      const input = instance!.refs.input as HTMLInputElement;
      input.value = value;
    };

    const blurInput = () => {
      const input = instance!.refs.input as HTMLInputElement;
      input.focus();
    };
    return {
      setValue,
      blurInput,
      searchOptions,
      firstBurlSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>