<template>
  <div class="switch-content">
    <input
      :disabled="disable"
      type="checkbox"
      :checked="modelValue"
      @input="switchChange"
      :class="`switch-component ${getSwitchSize(size)} ${disable && 'switch-disable'}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
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
    const getSwitchSize = (size) => {
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

    const switchChange = (e) => {
      emit("update:modelValue", e.target.checked);
    };

    return {
      switchChange,
      getSwitchSize,
    };
  },
});
</script>

<style scoped lang="scss">
.switch-content {
  .switch-component {
    position: relative;
    background-color: #cfcfcf;
    border-radius: 25px;
    border: none;
    outline: none;
    -webkit-appearance: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .switch-disable {
    cursor: not-allowed;
    background-color: #e4e4e4;
  }

  /* 按钮 */
  .switch-component::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 1px;
    width: 47%;
    height: 100%;
    background-color: #fff;
    border-radius: 50%;

    transition: all 0.2s ease;
  }

  /* checked状态时，背景颜色改变 */
  .switch-component:checked {
    background-color: #007dfb;
  }

  /* checked状态时，按钮位置改变 */
  .switch-component:checked::after {
    left: 52%;
  }

  .size-default {
    width: 42px;
    height: 20px;
  }

  .size-small {
    width: 34px;
    height: 17px;
  }

  .size-large {
    width: 50px;
    height: 22.5px;
  }
}
</style>
