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
        modal: {
            type: Boolean,
            default: true,
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
        center: {
            type: Boolean,
            default: false
        },
        destroyOnClose: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue', 'cancel-click', 'confirm-click', 'close-click'],
    setup(props, { emit, slots, expose }) {
        const dialogRef = ref<HTMLDialogElement | null>(null);
        const dialogBoxStyle = computed<CSSProperties>(() => {
            return {
                width: props.width,
                top: props.offsetTop,
            };
        });

        watch(
            () => props.modelValue,
            (visible) => {
                if (visible) {
                    showModal();
                    props.modal && (document.body.style.overflow = 'hidden')
                } else {
                    closeModal();
                    props.modal && (document.body.style.overflow = 'auto')
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

        const showModal = () => {
            if (props.modal) {
                dialogRef.value!.showModal()
            } else {
                dialogRef.value!.show();
            }
        };
        const closeModal = () => dialogRef.value!.close();

        const closeEvent = (event: 'cancel-click' | 'confirm-click' | 'close-click') => {
            emit('update:modelValue', false);
            emit(event);
        };

        expose({
            showModal,
            closeModal,
        });

        const defaultSlotRender = computed(() => {
            if (slots.default) {
                if (props.destroyOnClose) {

                    return props.modelValue && slots.default()
                } else {
                    return slots.default()
                }
            } else {
                return ''
            }
        })

        return () => (
            <div class="a-dialog-content">
                <dialog ref={dialogRef} style={dialogBoxStyle.value}>
                    <div class="dialog-box" >
                        <div v-show={props.title} class="header" style={{ justifyContent: props.center ? 'center' : 'left' }}>
                            <div class="title"><a-icon style="font-size:20px;margin-right:5px" name={props.icon}></a-icon>{props.title}</div>
                        </div>
                        <div class="close-btn" onClick={() => closeEvent('close-click')}><a-icon name="close" /></div>
                        <div class="content">
                            {defaultSlotRender.value}
                        </div>
                        <div class="footer" style={{ justifyContent: props.center ? 'center' : 'right' }}>
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
