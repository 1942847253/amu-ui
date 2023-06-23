<template>
  <div class="a-selector-input">
    <AInput
      v-model="value"
      isSelector
      :isSearch="false"
      :readonly="isSearch ? false : true"
      :placeholder="placeholder"
      :width="width"
      @input="searchOptions"
      @focus="firstBurlSearch"
      @blur="setValue()"
      @resetValue="resetValue"
      @change="(val:string) => updateInputValue(val)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref, watch } from "vue";
import AInput from "../../../Input";
import "./style/index.less";
export default defineComponent({
  name: "SelectInput",
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
    width:{
      type:String,
      default:''
    }
  },
  emits: ["searchOptions", "blurInitValue", "resetValue"],
  components: {
    AInput,
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
