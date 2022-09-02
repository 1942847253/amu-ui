<template>
  <div class="y-radio-group">
    <YRadio
      @click="onChange(item)"
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-model="modelValue"
      >{{ item.label }}
    </YRadio>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
    },
    options: {
      type: Array as any,
      default: [],
    },
  },
  components: {},
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const onChange = (item) => {
      emit("update:modelValue", item.value);
      emit("change", item);
    };
    return {
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.y-radio-group {
  display: flex;
  margin-left: -2px;
}
</style>
