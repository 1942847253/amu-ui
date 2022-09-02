import MessageBoxComponent from './MessageBox.vue';
import { createApp, watch } from 'vue';

export type TOptions = {
    title: string,
    content: string,
    confirmBtnText?: string,
    cancelBtnText?: string,
    showMessageBox?: boolean,
    showCancelBtn?: boolean,
    mantleClose?: boolean,
    field?: string,
}


export interface IMessage {
    [key: string]: any;
    (options: TOptions): Promise<any>,
    confirm?(options: TOptions): Promise<any>,
    prompt?(options: TOptions): Promise<any>,
}

export const fields = ['confirm', 'prompt']

const MessageBox: IMessage = (options: TOptions) => {
    const MessageBoxApp = createApp(MessageBoxComponent, options);
    return new Promise((resolve, reject) => {
        showMessageBox(MessageBoxApp, { resolve, reject });
    })
}

fields.forEach(field => {
    MessageBox[field] = (options:TOptions) => {
        options.field = field;
        return MessageBox(options)
    }
})

const showMessageBox = (app:any, { resolve, reject }:any ) => {
    const oFragment = document.createDocumentFragment();
    const vm = app.mount(oFragment);
    document.body.appendChild(oFragment);
    vm.setVisible(true);
    watch(vm.state, (state) => {
        if (!state.visible) {
            switch (state.btnType) {
                case 'cancel':
                    reject();
                    break;
                case 'confirm':
                    resolve(state.promptValue);
                    break;
                default:
                    break
            }

        }
    })
}
export default MessageBox