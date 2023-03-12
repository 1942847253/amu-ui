import { watch, createApp, ref } from "vue";
import { findIndex } from "../../shared/utils";
import MessageComponent from "./message.vue";
import Types, { IMessage, TOptions } from "./types";

// 存放组件实例的队列 必须是响应式的
const messageArrList = ref<any>([]);

export const AMessage = function (options: TOptions) {
  const messageApp = createApp(MessageComponent, options);
  showMessage(messageApp, options.duration!);
} as IMessage;

Object.values(Types).forEach((type) => {
  AMessage[type] = (options: TOptions) => {
    options.type = type;
    return AMessage(options);
  };
});

const showMessage = (app: any, duration: number) => {
  const oFragment: DocumentFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  messageArrList.value.push(vm);
  document.body.appendChild(oFragment);
  // 初始时设置一次高度
  $setMessageTop(vm);
  vm.setMessageVisible(true);
  // 组件实例队列变动后重新计算当前组件的高度
  watch(
    () => messageArrList.value,
    () => {
      $setMessageTop(vm);
    }
  );
  watch(
    () => vm.isHover,
    (val) => {
      !val && hideMessage(app, vm, duration);
    },
    { deep: true }
  );
  hideMessage(app, vm, duration);
};

const hideMessage = (app: any, vm: any, duration: number) => {
  vm.timer = setTimeout(() => {
    if (vm.isHover) {
      clearTimeout(vm.timer);
      vm.timer = null;
      return;
    }
    vm.setMessageVisible(false).then(() => {
      app.unmount();
      // 卸载组件后重新记录存放组件实例的队列
      messageArrList.value = messageArrList.value.filter(
        (item: any) => item !== vm
      );
      clearTimeout(vm.timer);
      vm.timer = null;
    });
  }, duration || 3000);
};

const $setMessageTop = (vm: any) => {
  const { setMessageTop, height, margin } = vm;
  // 从队列中找出当前的组件实例
  const currentIndex = findIndex(messageArrList.value, vm);
  // 当前组件的top值 =  固定20的margin + 在队列中的位置 + 固定的height * 在队列中的位置
  setMessageTop(margin * (currentIndex + 1) + height * currentIndex);
};
