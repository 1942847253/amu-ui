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
        direction: {
            type: String,
            default: 'right'
        },
        closeOnClickModal:{
            type: Boolean,
            default: true
        }
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
                setTimeout(() => {
                    drawerHideRange.value = '0'
                }, 50);
            } else {
                drawerHideRange.value = range
            }
        })
        const closeDrawer = ()=>{
            if (props.closeOnClickModal){
                drawerHideRange.value = '-' + contentWidth.value
                setTimeout(() => {
                    emit('update:modelValue', !props.modelValue)
                }, 50);
            }
        }
        return () => (
            <YTransition>
                {props.modelValue &&
                    <div class="y-drawer-mantle" onClick={() => closeDrawer()}>
                        <div onClick={(e) => e.stopPropagation()} class="y-drawer-content" style={{ width: contentWidth.value, [drawerContentDirection.value]: drawerHideRange.value }}>
                            <div class="y-drawer-header">
                                {slots.header && slots.header()}
                            </div>
                            <div class="y-drawer-body">
                                {slots.default && slots.default()}
                            </div>
                            <div class="y-drawer-footer">
                                {slots.footer && slots.footer()}
                            </div>
                        </div>
                    </div>
                }
            </YTransition>
        )
    }
})

