<template>
  <div class="switch-content">
    <input
      type="checkbox"
      @click="switchChange"
      :id="uuid"
      :checked="modelValue"
      :disabled="disabled"
      hidden
    />
    <label
      :style="`cursor: ${disabled ? 'not-allowed' : 'pointer'};opacity:${
        disabled && modelValue ? '0.5' : '1'
      }`"
      :openTitle="openTitle"
      :offTitle="offTitle"
      :for="uuid"
    ></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./style/index.less";
export default defineComponent({
  name: "ASwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
    openTitle: {
      type: String,
      default: "",
    },
    offTitle: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const uuid = Date.now() + Math.random() + "";
    const test = "是";
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
      const target = e.target as HTMLInputElement;
      emit("update:modelValue", target.checked);
    };

    return {
      test,
      uuid,
      switchChange,
      getSwitchSize,
    };
  },
});
</script>
