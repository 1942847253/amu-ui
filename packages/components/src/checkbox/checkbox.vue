<template>
  <div class="a-checked-main">
    <input
      :indeterminate="indeterminate"
      @change="changeChecked"
      :class="disabled && checked ? 'checked' : ''"
      :id="valueSlot"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
    />
    <label :for="valueSlot">
      <span @click="handleLabelClick" style="margin-left: 3px">{{
        valueSlot
      }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onBeforeMount,
  watch,
} from "vue";
import "./style/index.less";
export default defineComponent({
  name: "ACheckbox",
  props: {
    modelValue: {
      type: [Array, Boolean],
      default: [],
    },
    defaultValue: {
      type: [Array, Boolean],
    },
    value: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    stopLabelTrigger: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:modelValue",
    "updateCheckedGroup",
    "tree-checked",
    "updateDefaultValue",
    "label-click",
  ],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!;
    const valueSlot = ref<string>("");
    const checked = ref<boolean>(false);

    onBeforeMount(() => {
      if (instance.slots.default) {
        valueSlot.value = instance.slots.default()[0].children as string;
      }
      if (props.defaultValue) {
        checked.value = props.defaultValue as boolean;
        return;
      }
      if (Array.isArray(props.modelValue)) {
        checked.value =
          props.modelValue.indexOf(props.value) !== -1 ? true : false;
      } else {
        checked.value = props.modelValue;
      }
    });

    watch(
      () => props.defaultValue,
      (val) => {
        checked.value = val as boolean;
      }
    );

    const changeChecked = (event: Event) => {
      checked.value = !checked.value;
      emit("tree-checked");
      emit("updateDefaultValue", checked.value);
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

    const handleLabelClick = (e: MouseEvent) => {
      if (props.stopLabelTrigger) {
        emit("label-click", e.target);
        e.preventDefault();
      }
    };

    return {
      valueSlot,
      checked,
      changeChecked,
      handleLabelClick,
    };
  },
});
</script>
