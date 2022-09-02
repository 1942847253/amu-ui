<template>
  <div class="y-checkbox-group">
    <y-checkbox
      @click="Change(item)"
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-model="modelValue"
      >{{ item.label }}
    </y-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    options: {
      type: Array as any,
      default: [],
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const Change = (item) => {
      let valueList = [...props.modelValue];
      if (valueList.indexOf(item.value) === -1) {
        valueList.push(item.value);
      } else {
        valueList = valueList.filter((itemValue) => itemValue !== item.value);
      }

      emit("update:modelValue", valueList);
      emit("change", item);
    };
    return {
      Change,
    };
  },
});
</script>

<style lang="scss" scoped>
.y-checkbox-group {
  display: flex;
}
</style>
