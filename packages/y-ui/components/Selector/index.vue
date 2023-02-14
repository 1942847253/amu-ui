<template>
  <div class="y-selector" :id="key" ref="selectRef">
    <SelectorInput
      :placeholder="placeholder"
      :inputValue="inputValue"
      :localValue="localValue"
      :isSearch="isSearch"
      @searchOptions="searchOptions"
      @resetValue="resetValue"
    />
    <ShrinkBox :contentID="key" :shrinkViewSwitch="shrinkViewSwitch">
      <Menu
        @setItemValue="setItemValue"
        :options="options"
        :searchValue="searchValue"
        :inputValue="inputValue"
        :localValue="localValue"
        :isSearch="isSearch"
      />
    </ShrinkBox>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onBeforeMount,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import SelectorInput from "./Input/Input.vue";
import Menu from "./Menu/Menu.vue";
import ShrinkBox from "../../components/ShrinkBox";
import { IOptionItem } from "./baseData";
import { uuid } from "../../shared/utils";
import { Function } from "@babel/types";
import $bus from "../../bus/bus";
export default defineComponent({
  name: "Selector",
  components: {
    SelectorInput,
    Menu,
    ShrinkBox,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array as PropType<IOptionItem[]>,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["setItemValue", "update:modelValue"],
  setup(props, { emit }) {
    const key = uuid();
    const prop = inject("prop") as string;
    const uniKey = inject("uniKey") as string;
    const shrinkSelectMenuFn = ref<Function>();
    provide("shrinkSelectMenuFn", shrinkSelectMenuFn);
    provide("updateInputValue", (val: string) => {
      state.inputValue = val;
    });
    provide("updateLocalValue", (val: string) => {
      state.inputValue = state.localValue;
    });
    const state = reactive({
      inputValue: "",
      searchValue: "",
      localValue: "",
    });

    onBeforeMount(() => {
      initInputValue();
    });

    const resetValue = (value: string | number) => {
      const item = props.options?.find((item) => item.value == value)!;
      setItemValue(item);
    };

    const initInputValue = () => {
      const targetOptionsItem = props.options!.find(
        (item) => item.value === props.modelValue
      );
      if (targetOptionsItem) {
        state.inputValue = targetOptionsItem.text;
        state.localValue = targetOptionsItem.text;
      }
    };

    const shrinkViewSwitch = (fn: Function) => {
      shrinkSelectMenuFn.value = fn;
    };

    watch(
      () => props.modelValue,
      () => {
        initInputValue();
      }
    );

    const setItemValue = (item: IOptionItem) => {
      state.inputValue = item.text;
      state.localValue = item.text;
      emit("update:modelValue", item.value);
      emit("setItemValue", item);
    };

    watch(
      () => state.inputValue,
      (val) => {
        if (val === "") {
          state.inputValue = state.localValue;
          if (state.localValue !== "") {
            setTimeout(() => {
              state.searchValue = "";
            });
          }
        }
      }
    );

    const searchOptions = (value: string) => {
      state.searchValue = value;
    };

    return {
      key,
      setItemValue,
      searchOptions,
      shrinkViewSwitch,
      resetValue,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
