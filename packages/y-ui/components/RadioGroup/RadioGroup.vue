<template>
  <div class="y-radio-group">
    <YRadio
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :disabled="item.disabled"
      @updateRadioValue="updateRadioValue"
      >{{ item.label }}
    </YRadio>
  </div>
</template>

<script lang="ts">
import { TOptionsItem } from "typings";
import { provide } from "vue";
import { defineComponent, onMounted, PropType } from "vue";
import YRadio from "../Radio/index.vue";

export default defineComponent({
  props: {
    modelValue: {
      type: [Number, String],
    },
    options: {
      type: Array as PropType<TOptionsItem[]>,
      default: [],
    },
  },
  components: {
    YRadio,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const updateRadioValue = (value: string | number) => {
      emit("update:modelValue", value);
      emit("change", value);
    };
    provide("modelValue", props.modelValue);
    return {
      updateRadioValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.y-radio-group {
  display: flex;
  margin-left: -2px;
}
</style>