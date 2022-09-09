<template>
  <div class="main">
    <input
      @click="changeChecked"
      class="checkbox"
      :id="valueSlot"
      type="checkbox"
      :checked="checked"
    />
    <label :for="valueSlot">
      <span style="margin-left: 4px">{{ valueSlot && valueSlot }}</span>
    </label>
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
      type: [String, Number],
    },
  },
  emits: ["update:modelValue",'updateCheckedGroup'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!;
    const valueSlot = ref<string>("");
    const checked = ref<boolean>(false);

    onMounted(() => {
      if (Array.isArray(props.modelValue)) {
        checked.value =
          props.modelValue.indexOf(props.value) !== -1 ? true : false;
      } else {
        checked.value = props.modelValue;
      }
      if (instance.slots.default) {
        valueSlot.value = instance.slots.default()[0].children as string;
      }
    });

    const changeChecked = () => {
      checked.value = !checked.value;
      if (typeof props.modelValue === "boolean") {
        emit("update:modelValue", checked.value);
      } else {
        let updateCheckedGroup = [];
        if (checked.value) {
          updateCheckedGroup = [...new Set([...props.modelValue, props.value])];
        } else {
          updateCheckedGroup = props.modelValue;
          if (props.modelValue.includes(props.value)) {
            updateCheckedGroup = updateCheckedGroup.filter(
              (item) => item !== props.value
            );
          }
        }
        emit("updateCheckedGroup", updateCheckedGroup);
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
@import "../../assets/index.scss";

.main {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 14px;
  margin-right: 25px;
}

input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type="checkbox"] + label {
  cursor: pointer;
  position: relative;
  line-height: 13px;
  user-select: none;
  color: $text-color-black;
}

input[type="checkbox"] + label:not(:nth-of-type(1)) {
  margin-top: 29px;
  margin-bottom: 29px;
}

input[type="checkbox"]:checked + label {
  color: $primary-color;
}

input[type="checkbox"]:disabled + label {
  cursor: not-allowed;
  color: #999;
}

input[type="checkbox"] + label::before {
  content: "";
  display: inline-block;
  box-sizing: content-box;
  width: 13px;
  height: 13px;
  border-radius: 2px;
  vertical-align: top;
  margin-right: 0.2em;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

input[type="checkbox"]:not(:disabled) + label:hover::before {
  border-color: $primary-color;
}

input[type="checkbox"] + label::after {
  content: "";
  display: inline-block;
  width: 4px;
  height: 8px;
  border: 1px solid #fff;
  border-top: 0;
  border-left: 0;
  position: absolute;
  left: 5px;
  top: 2px;
  transform: rotate(45deg) scale(0);
  transition: all 0.2s ease-in-out;
}

input[type="checkbox"]:checked + label::before {
  border-color: $primary-color !important;
  background-color: $primary-color;
}

input[type="checkbox"]:checked + label::after {
  transform: rotate(45deg) scale(1);
  transition: all 0.2s ease-in-out;
}

input[type="checkbox"]:disabled + label::before,
input[type="checkbox"]:disabled.checked + label::before {
  background-color: #f2f2f2;
}

input[type="checkbox"]:disabled.checked + label::after {
  border-color: #ccc;
  transform: rotate(45deg) scale(1);
}
</style>