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
export default defineComponent({
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

<style scoped lang="scss">
@import "../../assets/index.scss";
.switch-content {
  margin-right: 10px;
  padding: 10px 0;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  user-select: none;
  font: 12px / 1 Helvetica, sans-serif;
  label {
    position: relative;
    width: 40px;
    height: 20px;
    background: lightgrey;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  label[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  label::before,
  label::after {
    transition: all 0.3s;
    position: absolute;
  }
  label::before {
    content: attr(offTitle);
    top: 4px;
    left: 22px;
    color: white;
  }
  label::after {
    content: "";
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background: white;
  }
  input[type="checkbox"]:checked + label {
    background: $primary-color;
  }
  input[type="checkbox"]:checked + label::before {
    content: attr(openTitle);
    left: 6px;
  }
  input[type="checkbox"]:active + label::after {
    width: 23px;
  }
  input[type="checkbox"]:checked + label::after {
    left: 21px;
  }
  input[type="checkbox"]:checked:active + label::after {
    left: 16px;
  }
}
</style>
