<template>
  <!-- 指示 -->
  <transition name="tooltip">
    <div
      class="a-tooltip"
      v-show="tooltipShow"
      :style="[tooltipStyle, { backgroundColor: bgColor }]"
    >
      <span class="a-tooltip-text" v-html="text"></span>
      <div
        class="a-tooltip-arrow"
        :style="{
          '--tooltip-bgColor': bgColor,
        }"
        :class="[
          { left: placements == 'left' },
          { bottom: placements == 'bottom' },
          { right: placements == 'right' },
          { top: placements == 'top' },
        ]"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, defineComponent, CSSProperties } from "vue";
import "./style/index.less";
export default defineComponent({
  setup() {
    // 显示弹框
    const tooltipShow = ref(false);

    // 提示内容
    const text = ref();
    const bgColor = ref("#303133");
    // 方向
    const placements = ref("bottom");

    // 显示
    function showTip() {
      tooltipShow.value = true;
    }
    function hiddenTip() {
      tooltipShow.value = false;
    }

    // 位置
    const tooltipPostiton = ref({
      left: 0,
      top: 0,
    });
    const tooltipStyle = computed<CSSProperties>(() => {
      return {
        left: tooltipPostiton.value.left + "px",
        top: tooltipPostiton.value.top + "px",
      };
    });

    return {
      tooltipShow,
      showTip,
      hiddenTip,
      tooltipPostiton,
      tooltipStyle,
      text,
      placements,
      bgColor,
    };
  },
});
</script>
