<template>
  <div :class="`dot-wrapper-${dotPositon}`" v-if="hasDot">
    <div
      class="dot-item"
      v-for="item in dotLength"
      :key="item"
      @click="dotClick(item - 1)"
      :style="{
        backgroundColor: item - 1 === currentIndex ? '#fff' : dotBgColor,
      }"
    >
      <a href="javascript:;" class="dot-link"></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, watch } from "vue";
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
    dotPositon: {
      type: String,
      default: "center",
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
.dot-wrapper-right {
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: flex;
}
.dot-wrapper-center {
  position: absolute;
  left: 50%;
  bottom: 15px;
  display: flex;
}

.dot-wrapper-left {
  position: absolute;
  left: 15px;
  bottom: 15px;
  display: flex;
}
.dot-item {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
}
</style>