<template>
  <div class="y-selector" ref="selectRef" v-focus>
    <SelectorInput
      :placeholder="placeholder"
      :inputValue="inputValue"
      :isSearch="isSearch"
      @searchOptions="searchOptions"
    />
    <Menu
      @setItemValue="setItemValue"
      :options="options"
      :searchValue="searchValue"
      :inputValue="inputValue"
      :isSearch="isSearch"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import SelectorInput from "./Input/Input.vue";
import Menu from "./Menu/Menu.vue";
import focus from "../../directives/focus";
import { IOptionItem } from "./baseData";
export default defineComponent({
  name: "Selector",
  components: {
    SelectorInput,
    Menu,
  },
  directives: {
    focus,
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
    const selectRef = ref(null);
    const state = reactive({
      inputValue: "",
      searchValue: "",
    });

    onBeforeMount(() => {
      initInputValue();
    });

    const initInputValue = () => {
      const targetOptionsItem = props.options!.find(
        (item) => item.value === props.modelValue
      );
      if (targetOptionsItem) {
        state.inputValue = targetOptionsItem.text;
      }
    };

    watch(
      () => props.modelValue,
      () => {
        initInputValue();
      }
    );

    const setItemValue = (item: IOptionItem) => {
      state.inputValue = item.text + "  ";
      setTimeout(() => {
        state.inputValue = item.text;
      });
      emit("update:modelValue", item.value);
      emit("setItemValue", item);
    };

    const searchOptions = (value: string) => {
      state.searchValue = value;
    };

    return {
      selectRef,
      setItemValue,
      searchOptions,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>