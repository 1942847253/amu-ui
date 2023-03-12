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
import { defineComponent } from "vue";
import './style/index.less';
export default defineComponent({
  name: "ADot",
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