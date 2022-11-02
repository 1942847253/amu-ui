<template>
  <div class="selector-menu" ref="menuListRef">
    <template v-if="searchData.length > 0">
      <div
        :class="`menu-item ${inputValue === item.text ? 'menu-checked' : ''}`"
        @click.stop="setItemValue(item)"
        @mousedown=""
        v-for="(item, index) in searchData"
        :key="index"
      >
        {{ item && item.text }}
      </div>
    </template>
    <NoDataTip v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref,
  watch,
  getCurrentInstance,
} from "vue";
import { IOptionItem } from "../baseData";
import NoDataTip from "../NoDataTip/NoDataTip.vue";

export default defineComponent({
  name: "SelectorMenu",
  components: {
    NoDataTip,
  },
  directives: {
    focus,
  },
  props: {
    inputValue: String,
    options: {
      type: Array as PropType<IOptionItem[]>,
      default: () => {
        return [
          {
            value: "1",
            text: "选项一",
          },
          {
            value: "2",
            text: "选项二",
          },
          {
            value: "3",
            text: "选项三",
          },
        ];
      },
    },
    searchValue: {
      type: String,
      default: "",
    },
    isSearch: {
      type: Boolean,
    },
  },
  emits: ["setItemValue"],
  setup(props, { emit }) {
    const searchData = ref<IOptionItem[]>([]);
    const menuListRef = ref() as any;
    onMounted(() => {
      searchData.value = props.options;
    });

    watch(
      () => props.searchValue,
      (value) => {
        props.isSearch && filterData(value);
      },
      { deep: true }
    );

    const filterData = (value: string) => {
      if (value.length === 0) {
        searchData.value = props.options;
        return;
      }
      searchData.value = props.options.filter((item) => {
        return item.text.toLowerCase().includes(value.trim().toLowerCase());
      });
    };
    const setItemValue = (item: IOptionItem) => {
      setTimeout(() => {
        menuListRef.value.style.transform = 'scaleY(0)'
        const onIconfont = menuListRef.value.parentNode
          .querySelector(".selector-input")
          .querySelector("span")!;
        onIconfont.className = "iconfont icon-xiangxia";
        onIconfont.style.transform = "rotate(0deg)";
      }, 50);
      emit("setItemValue", item);
    };
    return {
      menuListRef,
      setItemValue,
      searchData,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>