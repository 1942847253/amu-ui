import { CSSProperties, computed, defineComponent, onMounted, ref, watch } from "vue";
import { AButton } from "..";
import { AIcon } from "..";
import './style/index.less';

export default defineComponent({
    name: 'ADialog',
    components: {
        AButton,
        AIcon
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '50%',
        },
        offsetTop: {
            type: String,
            default: '15vh',
        },
        showCancelButton: {
            type: Boolean,
            default: true,
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        confirmButtonText: {
            type: String,
            default: "确认"
        },
    },
    emits: ['update:modelValue', 'cancel-click', 'confirm-click', 'close-click'],
    setup(props, { emit, slots, expose }) {
        const dialogRef = ref<HTMLDialogElement | null>(null);

        const dialogBoxStyle = computed<CSSProperties>(() => {
            return {
                width: props.width,
                top: props.offsetTop
            };
        });

        watch(
            () => props.modelValue,
            (visible) => {
                if (visible) {
                    showModal();
                    document.body.style.overflow = 'hidden'
                } else {
                    closeModal();
                    document.body.style.overflow = 'auto'
                }
            },
        );

        onMounted(() => {
            if (props.modelValue === true) {
                showModal();
            }
            dialogRef.value!.onclose = () => {
                emit('update:modelValue', false);
            };
        });

        const showModal = () => dialogRef.value!.showModal();
        const closeModal = () => dialogRef.value!.close();

        const closeEvent = (event: 'cancel-click' | 'confirm-click' | 'close-click') => {
            emit('update:modelValue', false);
            emit(event);
        };

        expose({
            showModal,
            closeModal,
        });
        console.log(slots);


        return () => (
            <div class="a-dialog-content">
                <dialog ref={dialogRef} style={dialogBoxStyle.value}>
                    <div class="dialog-box" >
                        <div v-show={props.title} class="header">
                            <div class="title">{props.title}</div>
                        </div>
                        <div class="close-btn" onClick={() => closeEvent('close-click')}><a-icon name="close" /></div>
                        <div class="content">
                            {slots.default && slots.default()}
                        </div>
                        <div class="footer">
                            {
                                slots.footer ? slots.footer() : (
                                    <>
                                        <a-button v-show={props.showCancelButton} onClick={() => closeEvent('cancel-click')}>{props.cancelButtonText}</a-button>
                                        <a-button style="margin-right:0px" v-show={props.showConfirmButton} onClick={() => closeEvent('confirm-click')} type="primary">{props.confirmButtonText}</a-button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </dialog >
            </div >
        )
    }
})
