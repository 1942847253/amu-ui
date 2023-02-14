<template>
  <transition name="y-message-fade">
    <div ref="messageRef" v-if="messageVisible" :style="{ top: top + 'px' }" class="y-message">
      <div class="y-message-content" @mouseenter="onMouseActiveMessage(true)" @mouseleave="onMouseActiveMessage(false)">
        <span style="margin-right: 10px;font-size: 18px;" :class="`iconfont ${getIconType()} ${props.type}`"></span>
        <div>{{
        props.message
        }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import types from "./types.js";
import { reactive, ref, toRefs } from "vue";

let timer = null as any;

const props = defineProps({
  type: {
    type: String,
    defualt: types.Message,
    validator: (value: string) => {
      return Object.values(types).includes(value);
    },
  },
  message: {
    type: String,
    default: types.Message,
  },
  duration: {
    type: Number,
  },
});

const isHover = ref(false);
const state = reactive({
  messageVisible: false,
  top: 0,
});

const { messageVisible, top } = toRefs(state);

const getIconType = () => {
  switch (props.type) {
    case 'error':
      return 'icon-cuowu'
    case 'success':
      return 'icon-chenggong'
    case 'warning':
      return 'icon-tixingshixin'
    case 'info':
      return 'icon-xinxi-yuankuang'
    default:
      return 'icon-xinxi-yuankuang'
  }
}

const setMessageVisible = (visible: boolean): Promise<any> => {
  messageVisible.value = visible;
  return new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve("");
      clearTimeout(timer);
      timer = null;
    }, 300);
  });
};

const onMouseActiveMessage = (hover: boolean) => {
  isHover.value = hover
  if (isHover.value) {

  }
}

const setMessageTop = (top: number) => {
  state.top = top;
  return top;
};

defineExpose({
  isHover,
  setMessageVisible,
  setMessageTop,
  height: 45,
  margin: 10,
});
</script>

<style lang="less" scoped>
@import '../../assets/index.less';
@import '../../iconfont/iconfont.css';

.y-message {
  position: fixed;
  z-index: 9999;
  width: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  transition: top 0.2s ease-out;
  user-select: none;
}

.y-message>.y-message-content {
  display: flex;
  align-items: center;
  padding: 11.5px 13px;
  pointer-events: all;
  background: #fff;
  width: max-content;
  max-width: 720px;
  color: #333639;
  margin: auto;
  font-size: 14px;
  user-select: contain !important;
  border-radius: 3px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.22),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  .success {
    color: @success-color;
  }

  .warning {
    color: @warning-color;
  }

  .message {
    color: @primary-color;
  }

  .error {
    color: @danger-color;
  }
}

.y-message-content:hover {
  user-select: text;
}

.y-message-fade-enter-from,
.y-message-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.y-message-fade-enter-active {
  transition: all 0.2s ease-in;
}

.y-message-fade-leave-active {
  transition: all 0.2s ease-out;
}
</style>
