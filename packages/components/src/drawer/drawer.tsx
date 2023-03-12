import { computed, defineComponent, ref, watch } from "vue";
import ATransition from '../transition/transition'
import './style/index.less';

type TPosition = 'top' | 'left' | 'bottom' | 'right'
type TSize = 'width' | 'height'

type IDirection = {
    [key in TPosition]: string;
};

type IDirectionStyleKey = {
    [key in TSize]: string;
};

export default defineComponent({
    name: 'ADrawer',
    props: {
        modelValue: {
            type: Boolean,
            default: true
        },
        size: {
            type: [Number, String],
            default: '30%'
        },
        title: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: 'right'
        },
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        beforeClose: {
            type: Function,
        },
    },
    emits: ['update:modelValue', 'opened','closed'],
    setup(props, { emit, slots }) {
        const directionKey = ['top', 'bottom', 'left', 'right']
        const contentSizeStyle = computed(() => typeof props.size === 'number' ? props.size + 'px' : props.size);
        const drawerHideRange = ref(props.modelValue ? '0' : `-${contentSizeStyle.value}`)
        const drawerContentDirection = computed(() => (directionKey.find(key => key === props.direction) || 'right'))
        const drawerContentSize = computed(() => {
            const isY = props.direction === "left" || props.direction === 'right';
            return isY ? 'width' : 'height'
        })

        watch(() => props.modelValue, (val) => {
            const range = drawerHideRange.value
            if (val) {
                document.body.style.overflow = 'hidden'
                setTimeout(() => {
                    drawerHideRange.value = '0'
                    emit('opened')
                }, 50);
            } else {
                drawerHideRange.value = range
                emit('closed')
                document.body.style.removeProperty('overflow')
            }
        })

        const updateModelValue = () => {
            drawerHideRange.value = '-' + contentSizeStyle.value
            setTimeout(() => {
                emit('update:modelValue', !props.modelValue)
            }, 180);
        }

        const closeDrawer = () => {
            if (typeof props.beforeClose === 'function') {
                props.beforeClose(updateModelValue);
                return;
            } else {
                updateModelValue();
            }
        }

        const closeDrawerOnModal = () => {
            if (props.closeOnClickModal) {
                closeDrawer();
            }
        }

        const slotsHeader = () => {
            if (slots.header) {
                return slots.header();
            } else {
                return (
                    <span>{props.title}</span>
                )
            }
        }

        const drawerHeaderEl = () => {
            return <div class="a-drawer-header">
                <div class="a-drawer-header-content">
                    <div class="header-slot">
                        {slotsHeader()}
                    </div>
                    <span onClick={() => closeDrawer()} class="iconfont icon-close"></span>
                </div>
            </div>
        }
        const drawerContentStyle = computed(() => {
            const minWidthValue = drawerContentSize.value === 'height' ? 'width' : 'height'
            return {
                [drawerContentSize.value]: contentSizeStyle.value,
                [drawerContentDirection.value]: drawerHideRange.value,
                [`min-${minWidthValue}`]: `100v${drawerContentSize.value === 'height' ? 'w' : 'h'}`
            }
        })
        return () => (
            <ATransition>
                {props.modelValue &&
                    <div class="a-drawer-mantle" onClick={() => closeDrawerOnModal()}>
                        <div onClick={(e) => e.stopPropagation()} class="a-drawer-content" style={drawerContentStyle.value}>
                            { drawerHeaderEl() }
                            <div class="a-drawer-body">
                                {slots.default && slots.default()}
                            </div>
                            {
                                slots.footer && <div class="a-drawer-footer">
                                    {slots.footer()}
                                </div>
                            }
                        </div>
                    </div>
                }
            </ATransition>
        )
    }
})

