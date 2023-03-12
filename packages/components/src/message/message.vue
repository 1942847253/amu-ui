<template>
  <transition name="a-message-fade">
    <div
      ref="messageRef"
      v-if="messageVisible"
      :style="{ top: top + 'px' }"
      class="a-message"
    >
      <div
        class="a-message-content"
        @mouseenter="onMouseActiveMessage(true)"
        @mouseleave="onMouseActiveMessage(false)"
      >
        <span
          style="margin-right: 10px; font-size: 18px"
          :class="`iconfont ${getIconType()} ${props.type}`"
        ></span>
        <div>{{ props.message }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import types from "./types";
import './style/index.less';

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
    case "error":
      return "icon-cuowu";
    case "success":
      return "icon-chenggong";
    case "warning":
      return "icon-tixingshixin";
    case "info":
      return "icon-xinxi-yuankuang";
    default:
      return "icon-xinxi-yuankuang";
  }
};

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
  isHover.value = hover;
  if (isHover.value) {
  }
};

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
