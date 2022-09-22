<template>
  <transition name="y-messagebox-fade">
    <div v-if="visible" class="y-message-box" @click="cancelMantleClose">
      <div class="y-message-box-wrapper" @click.stop>
        <div class="y-message-title">
          <div class="title">{{ title }}</div>
          <span class="iconfont icon-close2" @click="cancelBtnClick"></span>
        </div>
        <div class="y-message-content">
          <ContentView :fied="props.field" />
        </div>
        <div class="y-message-footer">
          <y-button type="primary" @click="confirmBtnClick">{{
          confirmBtnText
          }}</y-button>
          <y-button v-if="showCancelBtn" @click="cancelBtnClick">{{
          cancelBtnText
          }}</y-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>

import { h, reactive, toRefs } from "vue";
import YButton from "../Button/index.vue";
import { fields } from "./index";

const props = defineProps({
  title: {
    type: String,
    default: "Message",
  },
  content: {
    type: String,
    default: "Message content",
  },
  showMessageBox: {
    type: Boolean,
    default: false,
  },
  showCancelBtn: {
    type: Boolean,
    default: false,
  },
  confirmBtnText: {
    type: String,
    default: "确认",
  },
  cancelBtnText: {
    type: String,
    default: "取消",
  },
  mantleClose: {
    type: Boolean,
    default: false,
  },
  field: {
    type: String,
    default: "confirm",
    validator: (value: string) => {
      return fields.includes(value);
    },
  },
});

const state = reactive({
  visible: false,
  promptValue: "",
  btnType: "confirm",
});
const { visible } = toRefs(state);

const setVisible = (isVisible) => {

  state.visible = isVisible;
};

const confirmBtnClick = () => {
  state.btnType = "confirm";
  setVisible(false);
};

const cancelBtnClick = () => {
  state.btnType = "cancel";
  setVisible(false);
};

const cancelMantleClose = () => {
  if (props.mantleClose) {
    cancelBtnClick();
  }
};

const ContentView = ({ fied }) => {
  switch (fied) {
    case !fied || "confirm":
      return h("span", null, props.content);
    case "prompt":
      return h("input", {
        value: state.promptValue,
        onInput: (e) => (state.promptValue = e.target.value),
        class: "messageInput",
      });
  }
};
defineExpose({
  setVisible,
  state,
});
</script>

<style lang="scss" scoped>
@import "../../iconfont/iconfont.css";

.y-messagebox-fade-enter-from,
.y-messagebox-fade-leave-to {
  opacity: 0;
}

.y-messagebox-fade-enter-active {
  transition: opacity 0.2s ease-in;
}

.y-messagebox-fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.y-message-box {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .y-message-box-wrapper {
    padding: 15px;
    padding-right: 0px;
    padding-bottom: 8px;
    margin: 12% auto;
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: #fff;
    border-radius: 3px;

    .y-message-title {
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
        flex-grow: 1;
        font-size: 18px;
      }

      span {
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .y-message-content {
      padding-right: 10px;
      margin-top: 20px;
      color: #606266;
      font-size: 14px;
      flex-grow: 1;
    }

    .y-message-footer {
      margin-top: 25px;
      margin-left: 50px;
      display: flex;
      flex-direction: row-reverse;
    }
  }

  .messageInput {
    border: none;
    outline: none;
    width: 100%;
    height: 28px;
    margin-right: 10px;
    border: 1px solid #ededed;
    box-sizing: border-box;
  }
}
</style>
