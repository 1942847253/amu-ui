<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="a-message-box" :style="[{ zIndex: messageBoxZIndex }]" @click="cancelMantleClose">
        <div class="a-message-box-wrapper" @click.stop>
          <div class="a-message-title">
            <div class="title">{{ title }}</div>
            <AIcon name="close" />
            <!-- <span class="iconfont icon-close2" @click="cancelBtnClick"></span> -->
          </div>
          <div class="a-message-content">
            <ContentView :fied="props.field" />
          </div>
          <div class="a-message-footer">
            <ASpace>
              <a-button v-if="showCancelBtn" @click="cancelBtnClick">{{ cancelBtnText }}
              </a-button>
              <a-button type="primary" @click="confirmBtnClick">{{ confirmBtnText }}
              </a-button>
            </ASpace>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { h, reactive, ref, toRefs } from "vue";
import AButton from "../button";
import { ASpace } from "..";
import { AIcon } from "../icon";
import { fields } from "./index";
import "./style/index.less";
import useZIndex from "@/shared/hooks/useZIndex";

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

const { ZIndex, setZIndex } = useZIndex()
const messageBoxZIndex = ref(ZIndex)
setZIndex(messageBoxZIndex.value)

const state = reactive({
  visible: false,
  promptValue: "",
  btnType: "confirm",
});
const { visible } = toRefs(state);

const setVisible = (isVisible: boolean) => {
  state.visible = isVisible;
  if (state.visible) {
    openMaskFun();
  } else {
    closeMaskFun();
  }
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

const ContentView = ({ fied }: { [key: string]: string }) => {
  switch (fied) {
    case !fied || "confirm":
      return h("span", null, props.content);
    case "prompt":
      return h("input", {
        value: state.promptValue,
        onInput: (e: any) => (state.promptValue = e.target.value),
        class: "messageInput",
      });
  }
};

const openMaskFun = () => {
  document.body.style.overflow = "hidden";
};

const closeMaskFun = () => {
  document.body.style.removeProperty('overflow')
};

defineExpose({
  setVisible,
  state,
});
</script>
