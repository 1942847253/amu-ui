<template>
  <div class="dot-wrapper" v-if="hasDot">
    <div
      class="dot-item"
      v-for="item in dotLength"
      :key="item"
      @click="dotClick(item - 1)"
      :style="{
        backgroundColor: item - 1 === currentIndex ? dotBgColor : '#fff',
      }"
    >
      <a href="javascript:;" class="dot-link"></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  name: "CarDot",
  props: {
    dotLength: {
      type: Number,
    },
    currentIndex: {
      type: Number,
    },
    dotBgColor: {
      type: String,
      default: "#666",
    },
    hasDot: {
      type: Boolean,
    },
  },
  emits: ["dotClick"],
  setup(props, { emit }) {
    const dotClick = (index: number) => {
      emit("dotClick", index);
    };
    return {
      dotClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.dot-wrapper {
  position: absolute;
  right: 5px;
  bottom: 8px;
  display: flex;
  .dot-item {
    width: 10px;
    height: 10px;
    margin-right: 5px;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
