<template>
  <div class="radio-main">
    <input
      :class="disabled && isChecked ? 'checked' : ''"
      type="radio"
      @click="changeChecked"
      :id="valueSlot"
      name="radio"
      :checked="isChecked"
      :value="value"
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
  onBeforeMount,
  ref,
  watch,
  inject,
} from "vue";
import './style/index.less';

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
    const isChecked = ref<boolean>(false);
    onBeforeMount(() => {
      isChecked.value = modelValue === props.value ? true : false;
      valueSlot.value = instance.slots.default!()[0].children as string;
    });

    watch(
      () => props.modelValue,
      () => {
        isChecked.value = props.modelValue === props.value ? true : false;
      },
      { deep: true }
    );

    const changeChecked = () => {
      emit("updateRadioValue", props.value);
    };

    return {
      isChecked,
      valueSlot,
      changeChecked,
    };
  },
});
</script>
