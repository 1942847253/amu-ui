<template>
  <button
    v-waterRipple="`${type === '' ? 'rgba(29, 29, 29, 0.365)' : '#ffffff42'}`"
    :disabled="disabled"
    :class="`${disabled && 'y-button-disabled'} ${!disabled && 'y-button'} ${
      !disabled && getButtonType(type)
    } ${getButtonSize(size)}`"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import waterRipple from "../../directives/water-ripple";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: () => "",
    },
    size: {
      type: String,
      default: () => "default",
    },
    disabled: {
      tpye: Boolean,
      default: () => false,
    },
  },
  directives: {
    waterRipple,
  },
  setup() {
    const getButtonType = (type: string) => {
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

    const getButtonSize = (size: string) => {
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

<style scoped lang="scss">
@import "../../assets/index.scss";

button {
  position: relative;
  user-select: none;
  outline: 0;
  border-radius: 3px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  margin-right: 12px;
  color: rgba(29, 29, 29, 0.165);
  box-shadow: rgba(99, 99, 99, 0.099) 0px 2px 8px 0px;
}

button:hover {
  opacity: 0.8;
}

button:active {
  opacity: 0.9;
}

.button-default {
  color: $text-color-black;
  border: none;
  background-color: $default-color;
}

.button-default:active {
  color: black;
}

.button-default:hover {
  color: black;
}

.y-button-disabled {
  color: #0000003e;
  border: none;
  background: #eeeeee;
  text-shadow: none;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.31);
  cursor: not-allowed;
}

.button-primary {
  border: none;
  background-color: $primary-color;
  color: $text-color-white;
}

.button-success {
  border: none;
  background-color: $success-color;
  color: $text-color-white;
}

.button-warning {
  border: none;
  background-color: $warning-color;
  color: $text-color-white;
}

.button-danger {
  border: none;
  background-color: $danger-color;
  color: $text-color-white;
}

.button-info {
  border: none;
  background-color: $info-color;
  color: $text-color-white;
}

.size-small {
  padding: 6px 12px;
  font-size: 12px;
}

.size-default {
  padding: 8px 15px;
  font-size: 14px;
}

.size-large {
  padding: 10px 18px;
  font-size: 14px;
}
</style>