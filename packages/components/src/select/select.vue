<template>
  <div class="a-selector" :id="key" ref="selectRef">
    <SelectorInput
      :placeholder="placeholder"
      :inputValue="inputValue"
      :localValue="localValue"
      :isSearch="isSearch"
      :width="width"
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
  onBeforeMount,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import SelectorInput from "./component/select-input/select-input.vue";
import Menu from "./component/select-menu/select-menu.vue";
import ShrinkBox from "../shrink-box";
import { IOptionItem } from "./baseData";
import { uuid } from "../../shared/utils";
import "./style/index.less";
export default defineComponent({
  name: "ASelect",
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
    width:{
      type:String,
      default:''
    }
  },
  emits: ["setItemValue", "update:modelValue"],
  setup(props, { emit }) {
    const key = uuid();
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
