<template>
  <div class="radio-main">
    <input
      :class="disabled && checked ? 'checked' : ''"
      type="radio"
      @click="changeChecked"
      :id="valueSlot"
      name="radio"
      :checked="checked"
      :disabled="disabled"
    />
    <label :for="valueSlot">
      <span style="margin-left: 3px">{{ valueSlot && valueSlot }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  inject,
} from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
    },
    value: {
      type: [Number, String],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["updateRadioValue"],
  setup(props, { emit }) {
    const modelValue = inject("modelValue");
    const instance = getCurrentInstance()!;
    const valueSlot = ref<string>("");
    const checked = ref<boolean>(false);
    onMounted(() => {
      checked.value = modelValue === props.value ? true : false;
      valueSlot.value = instance.slots.default!()[0].children as string;
    });

    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue === props.value ? true : false;
      }
    );

    const changeChecked = () => {
      emit("updateRadioValue", props.value);
    };

    return {
      checked,
      valueSlot,
      changeChecked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
.radio-main {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 14px;
  margin-right: 25px;
  color: $text-color-black;
  width: max-content;
}
input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
input[type="radio"] + label {
  display: inline-block;
  height: 13px;
  line-height: 13px;
  /* 小写英文开头 */
  /* line-height: 10px; */
  cursor: pointer;
  position: relative;
  user-select: none;
}
input[type="radio"] + label:not(:nth-of-type(6)) {
  margin-top: 13px;
  margin-bottom: 13px;
}
input[type="radio"]:disabled + label {
  cursor: not-allowed;
  color: #999;
  border-color: #ccc !important;
}
input[type="radio"] + label::before {
  content: "";
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 8px;
  vertical-align: top;
  margin-right: 0.2em;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}
input[type="radio"]:not(:disabled) + label:hover::before {
  border-color: $primary-color;
}
input[type="radio"]:checked + label::before {
  border-color: $primary-color;
  background-color: $primary-color;
}
input[type="radio"] + label::after {
  content: "";
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 5.5px;
  top: 58%;
  transform: translateY(-50%) scale(0);
  transition: transform 0.2s ease-in-out;
}
input[type="radio"]:checked + label::after {
  transform: translateY(-50%) scale(1);
  transition: transform 0.2s ease-in-out;
}
input[type="radio"]:disabled + label::before,
input[type="radio"]:disabled.checked + label::before {
  border-color: #ccc;
  background-color: #f2f2f2;
}
input[type="radio"]:disabled.checked + label::after {
  border-color: #ccc;
  background-color: #ccc;
  transform: translateY(-50%) scale(1);
}
</style>