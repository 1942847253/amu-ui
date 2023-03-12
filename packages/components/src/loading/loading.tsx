import { computed, defineComponent, watch, vShow, CSSProperties, StyleValue } from "vue";
import Transition from '../transition/transition'
import './style/index.less';

export default defineComponent({
    name: 'ALoading',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        global: {
            type: Boolean,
            default: true
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        const dotList = new Array(6).fill(NaN)
        const isGlobalLoading = computed(() => props.global && (!slots.default || typeof slots.default !== 'function'));
        const showLoadingMask = computed(() => !isGlobalLoading.value && props.modelValue)

        watch(() => props.modelValue, (val) => {
            if (val && isGlobalLoading.value) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.removeProperty('overflow')
            }
        })

        const loadingContentStyle = computed<StyleValue>(() => {
            return {
                position: isGlobalLoading.value ? 'relative' : 'absolute',
           
                left: isGlobalLoading.value ? '0' :'40%'
            }
        })

        const loadingSlotJSX = () => {
            return (
                <div v-show={props.modelValue} class="a-loading-content" style={loadingContentStyle.value}>
                    <div class="a-chase">
                        {dotList.map(() => (
                            <div class="a-chase-dot"></div>
                        ))}
                    </div>
                    <div class="a-title">{props.title}</div>
                </div>
            )
        }

        return () => (
            <Transition>
                <div class={`a-loading ${(isGlobalLoading.value && props.modelValue) && 'a-global'}`} style={{ position: isGlobalLoading.value ? 'fixed' : 'relative' }}>
                    {loadingSlotJSX()}
                    <div class="a-loading-slot" >
                        {slots.default && slots.default()}
                    </div>
                    {showLoadingMask.value && <div class="a-loading-mask"></div>}
                </div >
            </Transition>
        )
    }
})