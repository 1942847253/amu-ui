<template>
  <button
    :disabled="disabled"
    :class="`y-button-${times} ${disabled && 'y-button-disabled'} ${
      !disabled && 'y-button'
    } ${!disabled && getButtonType(type)} ${getButtonSize(size)}`"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import "./style/index.less";
import { defineComponent, onMounted } from "vue";
import { buttonProps } from "./types";
import { uuid } from "@/utils";

export default defineComponent({
  name: "YButton",
  props: buttonProps,
  setup(props, { emit }) {
    const times = uuid();
    onMounted(() => {
      waterRipplePositon();
    });
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

    const waterRipplePositon = () => {
      const el = document.querySelector(`.y-button-${times}`) as any;
      el.addEventListener("mousedown", (e: any) => {
        const { left, top } = el.getBoundingClientRect();
        el.style = `--x:${e.clientX - left}px;--y:${e.clientY - top}px`;
      });
    };
    return {
      times,
      getButtonType,
      getButtonSize,
    };
  },
});
</script>
