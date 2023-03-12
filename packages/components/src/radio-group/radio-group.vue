<template>
  <div class="a-radio-group">
    <ARadio
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :disabled="item.disabled"
      @updateRadioValue="updateRadioValue"
      >{{ item.label }}
    </ARadio>
  </div>
</template>

<script lang="ts">
import { provide } from "vue";
import { defineComponent, PropType } from "vue";
import ARadio from "../radio";
import './style/index.less';

type TOptionsItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export default defineComponent({
  name:"ARadioGroup",
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
    ARadio,
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
