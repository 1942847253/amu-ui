<template>
  <div class="a-selector" :id="key" ref="selectRef">
    <Popover
      :visible="popoverVisible"
      trigger="click"
      :width="Number(width) + 22 + 'px'"
      @isClickElementInPopover="isClickElementInPopover"
    >
      <template #reference>
        <SelectorInput
          :placeholder="placeholder"
          :inputValue="inputValue"
          :localValue="localValue"
          :isSearch="isSearch"
          :width="width"
          @searchOptions="searchOptions"
          @resetValue="resetValue"
        />
      </template>
      <Menu
        @setItemValue="setItemValue"
        :options="options"
        :searchValue="searchValue"
        :inputValue="inputValue"
        :localValue="localValue"
        :isSearch="isSearch"
      />
    </Popover>
    <!-- 
    <ShrinkBox :contentID="key" :shrinkViewSwitch="shrinkViewSwitch">
    
    </ShrinkBox> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
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
import Popover from "@components/popover/popover";
import { IOptionItem } from "./baseData";
import { uuid } from "../../shared/utils";
import "./style/index.less";
export default defineComponent({
  name: "ASelect",
  components: {
    SelectorInput,
    Menu,
    ShrinkBox,
    Popover,
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
    width: {
      type: String,
      default: "200",
    },
  },
  emits: ["setItemValue", "update:modelValue"],
  setup(props, { emit }) {
    const key = uuid();
    const selectRef = ref<HTMLDivElement | null>();
    const popoverVisible = ref(false);
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

    const shrinkSelectMenuFn = (visible: boolean) => {
      console.log(visible);
      popoverVisible.value = visible;
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

    const isClickElementInPopover = (flag: boolean) => {
      console.log(flag);
      if (!flag) {
        popoverVisible.value = false;
      }
    };

    provide("shrinkSelectMenuFn", shrinkSelectMenuFn);
    provide("updateInputValue", (val: string) => {
      state.inputValue = val;
    });
    provide("updateLocalValue", async (val: string) => {
      state.inputValue = state.localValue;
    });

    return {
      key,
      selectRef,
      setItemValue,
      searchOptions,
      resetValue,
      popoverVisible,
      isClickElementInPopover,
      ...toRefs(state),
    };
  },
});
</script>
