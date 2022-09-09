<template>
  <div class="y-checkbox-group">
    <YCheckbox
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-model="modelValue"
      @updateCheckedGroup="updateCheckedGroup"
    >
      {{ item.label }}
    </YCheckbox>
  </div>
</template>

<script lang="ts">
import { TCheckboxGroupItem } from "typings";
import { defineComponent, PropType } from "vue";
import YCheckbox from "../CheckBox/CheckBox.vue";

export default defineComponent({
  components: {
    YCheckbox,
  },
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    options: {
      type: Array as PropType<TCheckboxGroupItem[]>,
      default: [],
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const ChangeValue = (item: TCheckboxGroupItem) => {
      let valueList = [...props.modelValue];
      if (valueList.indexOf(item.value) === -1) {
        valueList.push(item.value);
      } else {
        valueList = valueList.filter((itemValue) => itemValue !== item.value);
      }
      console.log(valueList);

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

<style lang="scss" scoped>
.y-checkbox-group {
  display: flex;
}
</style>