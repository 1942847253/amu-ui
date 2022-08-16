<template>
  <button
    v-waterRipple=""
    :disabled="disabled"
    :class="`${disabled && 'y-button-disabled'} ${
      !disabled && 'y-button'
    } ${!disabled && getButtonType(type)} ${getButtonSize(size)}`"
  >
   <slot></slot>
  </button>
</template>

<script lang="ts">
import "./style/index.less";
import { defineComponent, onMounted } from "vue";
import { buttonProps } from "./types";
import waterRipple from "../assets/directives/water-ripple";

export default defineComponent({
  name: "YButton",
  props: buttonProps,
  directives: {
    waterRipple,
  },
  setup(props, { emit }) {
    const getButtonType = (type: string | undefined) => {
      switch (type) {
        case "primary":
          return "button-primary";
        case "success":
          return "button-success";
        case "danger":
          return "button-danger";
        case "warning":
          return "button-warning";
        case "info":
          return "button-info";
        default:
          return "button-default";
      }
    };

    const getButtonSize = (size: string | undefined) => {
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
    return {
      getButtonType,
      getButtonSize,
    };
  },
});
</script>
