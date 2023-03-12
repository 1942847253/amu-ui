<template>
  <div class="a-checkbox-group">
    <ACheckbox
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :disabled="item.disabled"
      v-model="modelValue"
      @updateCheckedGroup="updateCheckedGroup"
    >
      {{ item.label }}
    </ACheckbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ACheckbox from "../checkbox";
import './style/index.less';

type TOptionsItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export default defineComponent({
  name: "ACheckboxGroup",
  components: {
    ACheckbox,
  },
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    options: {
      type: Array as PropType<TOptionsItem[]>,
      default: [],
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const ChangeValue = (item: TOptionsItem) => {
      let valueList = [...props.modelValue];
      if (valueList.indexOf(item.value) === -1) {
        valueList.push(item.value);
      } else {
        valueList = valueList.filter((itemValue) => itemValue !== item.value);
      }
      emit("update:modelValue", valueList);
      emit("change", item);
    };
    const updateCheckedGroup = (valueList: Array<number | string>) => {
      emit("update:modelValue", valueList);
    };
    return {
      ChangeValue,
      updateCheckedGroup,
    };
  },
});
</script>
