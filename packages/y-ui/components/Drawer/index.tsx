import { computed, defineComponent, ref, watch } from "vue";
import YTransition from '../Transition'
import './index.scss';

type TPosition = 'top' | 'left' | 'bottom' | 'right'
type TSize = 'width' | 'height'

type IDirection = {
    [key in TPosition]: string;
};

type IDirectionStyleKey = {
    [key in TSize]: string;
};

export default defineComponent({
    name: 'YDrawer',
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
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const showMantle = ref(false);
        const directionKey: IDirection = {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
        const contentWidth = computed(() => typeof props.size === 'number' ? props.size + 'px' : props.size);
        const drawerHideRange = ref(props.modelValue ? '0' : `-${contentWidth.value}`)
        const drawerContentDirection = computed(() => ((Object.keys(directionKey) as TPosition[]).find(key => key === props.direction) || 'right'))
        watch(() => props.modelValue, (val) => {
            const range = drawerHideRange.value
            if (val) {
                document.body.style.overflow = 'hidden'
                setTimeout(() => {
                    drawerHideRange.value = '0'
                }, 50);
            } else {
                drawerHideRange.value = range
                document.body.style.removeProperty('overflow')
            }
        })

        const closeDrawer = () => {
            drawerHideRange.value = '-' + contentWidth.value
            setTimeout(() => {
                emit('update:modelValue', !props.modelValue)
            }, 180);
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
        return () => (
            <YTransition>
                {props.modelValue &&
                    <div class="y-drawer-mantle" onClick={() => closeDrawerOnModal()}>
                        <div onClick={(e) => e.stopPropagation()} class="y-drawer-content" style={{ width: contentWidth.value, [drawerContentDirection.value]: drawerHideRange.value }}>
                            <div class="y-drawer-header">
                                <div class="y-drawer-header-content">
                                    <div class="header-slot">
                                        {slotsHeader()}
                                    </div>
                                    <span onClick={() => closeDrawer()} class="iconfont icon-close"></span>
                                </div>

                            </div>
                            <div class="y-drawer-body">
                                {slots.default && slots.default()}
                            </div>
                            {
                                slots.footer && <div class="y-drawer-footer">
                                    {slots.footer()}
                                </div>
                            }
                        </div>
                    </div>
                }
            </YTransition>
        )
    }
})

