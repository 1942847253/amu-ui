<template>
  <div class="y-checked-main ">
    <input @click="changeChecked" :class="disabled && checked ? 'checked' : ''" :id="valueSlot" type="checkbox"
      :checked="checked" :disabled="disabled" />
    <label :for="valueSlot">
      <span style="margin-left: 3px">{{ valueSlot }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onBeforeMount, watch } from "vue";

export default defineComponent({
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
  },
  emits: ["update:modelValue", "updateCheckedGroup", 'tree-checked', 'updateDefaultValue'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!;
    const valueSlot = ref<string>("");
    const checked = ref<boolean>(false);

    onBeforeMount(() => {
      if (instance.slots.default) {
        valueSlot.value = instance.slots.default()[0].children as string;
      }
      if (props.defaultValue) {
        checked.value = props.defaultValue as boolean
        return
      }
      if (Array.isArray(props.modelValue)) {
        checked.value =
          props.modelValue.indexOf(props.value) !== -1 ? true : false;
      } else {
        checked.value = props.modelValue;
      }
      
    });

    watch(()=>props.defaultValue,(val)=>{
      checked.value = val as boolean
    })

    const changeChecked = () => {
      checked.value = !checked.value;
      emit('tree-checked')
      emit('updateDefaultValue', checked.value)
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

    const changeDefaultValue = () => {

    }

    return {
      valueSlot,
      checked,
      changeChecked,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../assets/index.less";

.y-checked-main {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 14px;
  margin-right: 25px;
  width: max-content;

  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  input[type="checkbox"]+label {
    cursor: pointer;
    position: relative;
    line-height: .9rem;
    user-select: none;
    color: @text-color-black;
  }

  input[type="checkbox"]+label:not(:nth-of-type(1)) {
    margin-top: 29px;
    margin-bottom: 29px;
  }

  input[type="checkbox"]:checked+label {
    color: @primary-color;
  }

  input[type="checkbox"]+label:not(:nth-of-type(6)) {
    margin-top: 13px;
    margin-bottom: 13px;
  }

  input[type="checkbox"]:disabled+label {
    cursor: not-allowed;
    color: #999;
  }

  input[type="checkbox"]+label::before {
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

  input[type="checkbox"]:not(:disabled)+label:hover::before {
    border-color: @primary-color;
  }

  input[type="checkbox"]+label::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 10%;
    display: inline-block;
    width: 4px;
    height: 8px;
    border: 1px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(0);
    transition: all 0.2s ease-in-out;
  }

  input[type="checkbox"]:checked+label::before {
    border-color: @primary-color !important;
    background-color: @primary-color;
  }

  input[type="checkbox"]:checked+label::after {
    transform: rotate(45deg) scale(1);
    transition: all 0.2s ease-in-out;
  }

  input[type="checkbox"]:disabled+label::before,
  input[type="checkbox"]:disabled.checked+label::before {
    border-color: #ccc !important;
    background-color: #f2f2f2;
  }

  input[type="checkbox"]:disabled.checked+label::after {
    border-color: #ccc;
    transform: rotate(45deg) scale(1);
  }
}
</style>