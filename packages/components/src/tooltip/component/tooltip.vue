<template>
  <!-- 指示 -->
  <transition name="tooltip">
    <div class="zc-tooltip" v-show="tooltipShow" :style="tooltipStyle">
      <span class="zc-tooltip-text" v-html="text"></span>
      <div
        class="zc-tooltip-arrow"
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
import { ref, computed, defineComponent } from "vue";
export default defineComponent({
  setup() {
    // 显示弹框
    const tooltipShow = ref(false);

    // 提示内容
    const text = ref();

    // 方向
    const placements = ref("left");

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
    const tooltipStyle = computed(() => {
      return {
        left:tooltipPostiton.value.left+'px',
        top:tooltipPostiton.value.top+'px'
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
    };
  },
});
</script>

<style lang="less" scoped>
// tooltip
.zc-tooltip {
  padding: 10px;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
  position: fixed;
  left: 0;
  top: 0;
  background: #303133;
  color: #fff;
  z-index: 1000;
  display: inline-block;
  border-radius: 8px;
  font-weight: 500;
}

// 小箭头
.zc-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: solid;
}

// 如果在左侧
.zc-tooltip-arrow.left {
  border-color: transparent transparent transparent #303133;
  right: -15px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
// 如果在下侧
.zc-tooltip-arrow.bottom {
  top: -15px;
  border-color: transparent transparent #303133 transparent;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
// 如果在右侧
.zc-tooltip-arrow.right {
  left: -15px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  border-color: transparent #303133 transparent transparent;
}
// 如果在上侧
.zc-tooltip-arrow.top {
  bottom: -15px;
  border-color: #303133 transparent transparent transparent;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

/* 动画 */
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tooltip-leave-from,
.tooltip-enter-to {
  transition: opacity 0.1s ease;
}
</style>
