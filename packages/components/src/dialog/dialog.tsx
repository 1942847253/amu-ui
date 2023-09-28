import { CSSProperties, Teleport, computed, defineComponent, onMounted, ref, Transition, watch } from "vue";
import { AButton } from "..";
import { AIcon } from "..";
import './style/index.less';
import { isDefined } from "@/shared/utils";

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
            default: '15%',
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
        zIndex: {
            type: Number,
            default: 1000
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:modelValue', 'cancel-click', 'confirm-click', 'close-click'],
    setup(props, { emit, slots, expose }) {
        const dialogZIndex = ref(0)
        const dialogRef = ref<HTMLDialogElement | null>(null);
        const dialogVisible = ref(props.modelValue)
        const dialogBoxStyle = computed<CSSProperties>(() => {
            return {
                width: props.width,
                top: props.offsetTop,
            };
        });

        if (isDefined(window.$?.amuui?.zIndex)) {
            dialogZIndex.value = window.$.amuui.zIndex + 1
        } else {
            window.$ = { amuui: {} }
            dialogZIndex.value = 2000
            window.$.amuui.zIndex = dialogZIndex.value
        }
        window.$.amuui.zIndex = dialogZIndex.value
        const highestZIndex = Math.max(
            ...Array.from(document.querySelectorAll('*'), el => {
                const zIndex = parseInt(window.getComputedStyle(el).zIndex);
                return isNaN(zIndex) ? 0 : zIndex;
            })
        );

        watch(
            () => props.modelValue,
            (visible) => {
                setTimeout(() => {
                    dialogVisible.value = visible
                }, visible ? 0 : 80);
                if (visible) {
                    props.modal && (document.body.style.overflow = 'hidden')
                } else {
                    props.modal && (document.body.style.overflow = 'auto')
                }
            },
        );

        onMounted(() => {
            console.log(highestZIndex);

            return
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

        const closeOnClickModal = (event: MouseEvent) => {
            const targetElement = event.target as unknown as HTMLElement
            if (targetElement.className !== 'a-dialog-content') return
            if (props.closeOnClickModal) {
                closeEvent('close-click')
            }
        }

        expose({
            showModal,
            closeModal,
        });

        const defaultSlotRender = computed(() => {
            if (slots.default) {
                if (props.destroyOnClose) {

                    return dialogVisible.value && slots.default()
                } else {
                    return slots.default()
                }
            } else {
                return ''
            }
        })

        return () => (
            <Teleport to="body">
                <Transition name="dialog">
                    <div class="a-dialog-content" onClick={(event) => closeOnClickModal(event)} v-show={dialogVisible.value} style={{ zIndex: dialogZIndex.value }}>
                        <div class="dialog-box" style={dialogBoxStyle.value}>
                            <div v-show={props.title} class="a-dialog-header" style={{ justifyContent: props.center ? 'center' : 'left' }}>
                                <div class="title"><a-icon v-show={props.icon} style="font-size:20px;margin-right:5px" name={props.icon}></a-icon>{props.title}</div>
                            </div>
                            <div class="close-btn" onClick={() => closeEvent('close-click')}><a-icon name="close" /></div>
                            <div class="a-dialog-body">
                                {defaultSlotRender.value}
                            </div>
                            <div class="a-dialog-footer" style={{ justifyContent: props.center ? 'center' : 'right' }}>
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
                    </div >
                </Transition>
            </Teleport>

        )
    }
})
