<template>
<div class="a-table-input">
    <input
    type="text"
    class="edit-input"
    :value="props.value"
    @input="onInput"
    @blur="onBlur"
    @click="onClick"
  />
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import './style/index.less';

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

const onInput = (event: any) => {
  inputValue.value = event.target.value;
};

const onBlur = () => {
  if (inputValue.value.trim().length === 0) return;
  props.setValue(inputValue.value);
};

const onClick = (event: Event) => {
  event.stopPropagation();
};
</script>
