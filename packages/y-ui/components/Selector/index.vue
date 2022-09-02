<template>
  <div class="selector" v-focus>
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
      :isSearch="isSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
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
  emits: ["setItemValue"],
  setup(props, { emit }) {
    const state = reactive({
      inputValue: "",
      searchValue: "",
    });
    const setItemValue = (item) => {
      state.inputValue = item.text + " ";
      setTimeout(() => {
        state.inputValue = item.text;
      });
      emit("setItemValue", item);
    };

    const searchOptions = (value: string) => {
      state.searchValue = value;
    };

    return {
      setItemValue,
      searchOptions,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.selector {
  position: relative;
  width: 300px;
}
</style>
