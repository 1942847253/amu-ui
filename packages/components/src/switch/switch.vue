<template>
  <div class="switch-content">
    <input
      :disabled="disable"
      type="checkbox"
      :checked="modelValue"
      @input="switchChange"
      :class="`switch-component ${getSwitchSize(size)} ${
        disable && 'switch-disable'
      }`"
    />
  </div>
</template>

<script lang="ts">
import "./style/index.less";
import { defineComponent, InputHTMLAttributes } from "vue";
import {} from "./types";

export default defineComponent({
  name: "YSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const getSwitchSize = (size: string) => {
      switch (size) {
        case "small":
          return "size-small";
        case "default":
          return "size-default";
        case "large":
          return "size-large";
        default:
          return "size-default";
      }
    };

    const switchChange = (e: Event) => {
      emit("update:modelValue", (e.target as InputHTMLAttributes)!.checked);
    };

    return {
      switchChange,
      getSwitchSize,
    };
  },
});
</script>
