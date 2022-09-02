<template>
  <div class="selector-menu" ref="menuListRef">
    <template v-if="searchData.length > 0">
      <div
        :class="`menu-item ${searchValue === item.text ? 'menu-checked' : ''}`"
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
    options: {
      type: Array as PropType<IOptionItem[]>,
      default() {
        return [
          {
            id: 1,
            value: "1",
            text: "选项一",
          },
          {
            id: 1,
            value: "2",
            text: "选项二",
          },
          {
            id: 1,
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
      }
    );

    const filterData = (value) => {
      if (value.length == 0) {
        return (searchData.value = props.options);
      }
      searchData.value = props.options.filter((item) => {
        return item.text.toLowerCase().includes(value.trim().toLowerCase());
      });
    };
    const setItemValue = (item) => {
      setTimeout(() => {
        menuListRef.value.style.display = "none";
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
.selector-menu {
  z-index: 1000;
  position: absolute;
  width: 100%;
  max-height: 300px;
  display: none;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1),
    0 0 4px 0 rgba(0, 0, 0, 0.1) !important;
  margin-top: 3px;
  .menu-item {
    margin-bottom: 2px;
    font-size: 13px;
    padding: 8px 8px;
  }
  .menu-item:hover {
    background-color: #f5f5f5;
  }
  .menu-checked {
    color: #409eff;
    font-weight: 550;
  }
}
</style>
