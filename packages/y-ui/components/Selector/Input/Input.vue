<template>
  <div class="selector-input">
    <label class="placeholder">{{ placeholder }}</label>
    <input
      class="input"
      type="text"
      :value="inputValue"
      ref="input"
      :readonly="!isSearch"
      @input="searchOptions"
      @focus="searchOptions"
      @blur="setValue(inputValue)"
    />
    <span
      style="transform: translateX(-50 %) rotate(-90deg)"
      class="iconfont icon-xiangxia"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
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
    const searchOptions = (event) => {
      const val = event.target.value as string;
      emit("searchOptions", val);
    };

    const setValue = (value) => {
      const input: any = instance!.refs.input;
      if (input.value.length > 0) {
        input.value = value;
      }
    };
    return {
      setValue,
      searchOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../iconfont/iconfont.css";
.selector-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .input {
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    height: 30px;
    width: 100%;
    padding: 0 10px;
    outline: invert;
    outline-color: #409eff;
    outline-offset: 0.5px;
  }
  .placeholder {
    position: absolute;
    left: calc(10px);
    color: #c2c2c2;
    font-size: 13px;
  }
  .iconfont {
    position: absolute;
    right: calc(10px);
    color: #c2c2c2;
    pointer-events: none;
  }
  .iconfont-transform {
    transform: translateX(-50%) rotate(-90deg);
  }
}
</style>
