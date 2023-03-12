<template>
  <div class="selector-menu">
    <template v-if="searchData.length > 0">
      <div
        :class="`menu-item ${localValue === item.text ? 'menu-checked' : ''}`"
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
  inject,
  Ref,
} from "vue";
import { IOptionItem } from "../../baseData";
import NoDataTip from "../select-tip/select-tip.vue";
import './style/index.less';

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
    const shrinkSelectMenuFn = inject("shrinkSelectMenuFn") as Ref<Function>;
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
      shrinkSelectMenuFn.value(0, 0.2);
    };
    return {
      setItemValue,
      searchData,
    };
  },
});
</script>
