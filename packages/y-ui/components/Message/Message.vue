<template>
  <transition name="y-message-fade">
    <div v-if="messageVisible" :style="{ top: top + 'px' }" :class="styleClass">
      {{ props.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import types from "./types.js";
import { computed, reactive, ref, toRefs } from "vue";
let timer = null;

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

const state = reactive({
  messageVisible: false,
  top: 0,
});

const { messageVisible, top } = toRefs(state);

const styleClass = computed(() => ["y-message", props.type]);

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

const setMessageTop = (top) => {
  state.top = top;
  return top;
};

defineExpose({
  setMessageVisible,
  setMessageTop,
  height: 45,
  margin: 20,
});
</script>

<style lang="scss" scoped>
.y-message {
  position: fixed;
  top: 10px;
  left: 50%;
  width: 380px;
  height: 45px;
  margin-left: -190px;
  text-align: left;
  line-height: 45px;
  font-size: 14px;
  border-radius: 5px;
  padding-left: 15px;
  transition: top 0.3s ease-out;
  &.success {
    color: #67c23a;
    background-color: #e1f3d8;
  }

  &.warning {
    background-color: #faecd8;
    color: #e6a23c;
  }

  &.message {
    color: #909399;
    background-color: #e9e9eb;
  }

  &.error {
    color: #f56c6c;
    background-color: #fde2e2;
  }
}

.y-message-fade-enter-from,
.y-message-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.y-message-fade-enter-active {
  transition: all 0.3s ease-in;
}
.y-message-fade-leave-active {
  transition: all 0.3s ease-out;
}
</style>
