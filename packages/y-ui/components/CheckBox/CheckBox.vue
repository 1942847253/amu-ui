<template>
  <div class="y-checked-content" @click="changeChecked">
    <span>
      <input class="checkbox" :id="valueSlot" type="checkbox" :checked="checked"
    /></span>
    <div :class="`label ${checked ? 'checked' : ''}`">
      <slot>{{ valueSlot && valueSlot }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: [],
    },
    value: {
      type: Number,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!;
    const valueSlot = ref<string>("");
    const checked = ref<boolean>(false);

    onMounted(() => {
      if (Array.isArray(props.modelValue)) {
        checked.value = props.modelValue.indexOf(props.value) !== -1 ? true : false;
      } else {
        checked.value = props.modelValue;
      }

      console.log();
      if (instance.slots.default) {
        valueSlot.value = instance.slots.default()[0].children as string;
      }
    });

    const changeChecked = () => {
      checked.value = !checked.value;
      if (typeof props.modelValue === "boolean") {
        emit("update:modelValue", checked.value);
      }
    };

    return {
      valueSlot,
      checked,
      changeChecked,
    };
  },
});
</script>

<style lang="scss" scoped>
.y-checked-content {
  cursor: pointer;
  display: inline-flex;
  white-space: nowrap;
  user-select: none;
  margin-right: 16px;
  height: 32px;
  input {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  .label {
    margin-left: 3px;
    font-size: 14px;
    margin-top: 0.5px;
  }
  .checked {
    color: #2a6ef8;
  }
}
</style>
