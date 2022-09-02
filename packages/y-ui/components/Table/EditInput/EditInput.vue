<template>
  <input
    type="text"
    class="edit-input"
    :value="props.value"
    @input="onInput"
    @blur="onBlur"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  setValue: {
    type: Function,
    default: () => {},
  },
});
const inputValue = ref(props.value);

const onInput = (event) => {
  inputValue.value = event.target.value;
};

const onBlur = () => {
  if (inputValue.value.trim().length === 0) return;
  props.setValue(inputValue.value);
};

const onClick = (event) => {
  event.stopPropagation();
};
</script>

<style lang="scss" scoped>
.edit-input {
  position: absolute;
  top: 0;
  left: 5px;
  right: 10px;
  bottom: 0;
  margin: auto;
  height: 60%;
  box-sizing: border-box;
  border: 1px solid #409eff;
  text-align: left;
  outline: none;
}
</style>
