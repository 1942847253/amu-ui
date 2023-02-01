import { computed, defineComponent, watch, vShow } from "vue";
import Transition from '../Transition'
import './index.scss';

export default defineComponent({
    name: 'YLoading',
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

        const loadingSlotJSX = () => {
            return (
                <div v-show={props.modelValue} class="y-loading-content" style={{ position: isGlobalLoading.value ? 'relative' : 'absolute' }}>
                    <div class="y-chase">
                        {dotList.map(() => (
                            <div class="y-chase-dot"></div>
                        ))}
                    </div>
                    <div class="y-title">{props.title}</div>
                </div>
            )
        }

        return () => (
            <Transition>
                <div class={`y-loading ${(isGlobalLoading.value && props.modelValue) && 'y-global'}`} style={{ position: isGlobalLoading.value ? 'fixed' : 'relative' }}>
                    {loadingSlotJSX()}
                    <div class="y-loading-slot" >
                        {slots.default && slots.default()}
                    </div>
                    {showLoadingMask.value && <div class="y-loading-mask"></div>}
                </div >
            </Transition>
        )
    }
})