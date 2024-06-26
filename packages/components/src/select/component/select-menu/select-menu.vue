<template>
  <AScrollbar style="max-height: 215px;max-width: 223px;">
    <div class="selector-menu">
      <template v-if="searchData.length > 0">
        <div :class="`menu-item ${localValue === item.text ? 'menu-checked' : ''}`" @click="setItemValue(item)"
          @mousedown="" v-for="(item, index) in searchData" :key="index">
          <div class="label"> {{ item && item.text }}</div>
          <AIcon v-show="localValue === item.text" name="select-bold" />
        </div>
      </template>
      <NoDataTip v-else />
    </div>
  </AScrollbar>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref,
  watch,
  inject,
  Ref,
} from "vue";
import { IOptionItem } from "../../baseData";
import NoDataTip from "../select-tip/select-tip.vue";
import AIcon from "@components/icon";
import AScrollbar from "@components/scrollbar";
import "./style/index.less";

export default defineComponent({
  name: "SelectorMenu",
  components: {
    NoDataTip,
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
    localValue: {
      type: String,
      defualt: "",
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
    const shrinkSelectMenuFn = inject("shrinkSelectMenuFn", () => { }) as Function;
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
      emit("setItemValue", item);
      shrinkSelectMenuFn(false);
    };
    return {
      setItemValue,
      searchData,
    };
  },
});
</script>
