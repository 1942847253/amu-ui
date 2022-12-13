<template>
  <div clas="selector-input">
    <YInput
      v-model="value"
      isSelector
      :isSearch="false"
      @input="searchOptions"
      @focus="firstBurlSearch"
      @blur="setValue()"
      @change="(val) => updateInputValue(val)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  ref,
  Ref,
  watch,
} from "vue";
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
  emits: ["searchOptions", "blurInitValue"],
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
      updateLocalValue()
    };
    return {
      value,
      setValue,
      searchOptions,
      updateInputValue,
      firstBurlSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
