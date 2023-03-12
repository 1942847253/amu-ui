import MessageBoxComponent from "./message-box.vue";
import { createApp, watch } from "vue";

export type TOptions = {
  title?: string;
  content: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  showMessageBox?: boolean;
  showCancelBtn?: boolean;
  mantleClose?: boolean;
  field?: string;
};

export interface IMessage {
  [key: string]: any;
  (options: TOptions): Promise<any>;
  confirm?(options: TOptions): Promise<any>;
  prompt?(options: TOptions): Promise<any>;
}

export const fields = ["confirm", "prompt"];
let vmList = [] as any[];
export const AMessageBox: IMessage = (options: TOptions) => {
  const MessageBoxApp = createApp(MessageBoxComponent, options);
  return new Promise((resolve, reject) => {
    if (vmList.length > 0) return;
    showMessageBox(MessageBoxApp, { resolve, reject });
  });
};

fields.forEach((field) => {
  AMessageBox[field] = (options: TOptions) => {
    options.field = field;
    return AMessageBox(options);
  };
});

const showMessageBox = (app: any, { resolve, reject }: any) => {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  document.body.appendChild(oFragment);
  vm.setVisible(true);
  vmList.push(vm);
  watch(vm.state, (state) => {
    if (!state.visible) {
      switch (state.btnType) {
        case "cancel":
          reject(false);
          break;
        case "confirm":
          resolve(state.promptValue);
          break;
        default:
          break;
      }
      setTimeout(()=>{
        app.unmount(vm);
      },100)
      vmList = [];
    }
  });
};
