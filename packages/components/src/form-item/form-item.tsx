import { computed, defineComponent, inject, onMounted, provide, ref } from "vue";
import AButton from '../button/button'
import ShrinkBox from "../shrink-box";
import './style/index.less';

export default defineComponent({
    name: 'AFormItem',
    components:{
        AButton
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: null
        },
    },
    emits: [],
    setup(props, { emit, slots }) {
        provide('prop', props.prop);
        const model = inject('model') as Object;
        const errorMessage = ref('Please enter the content first');
        const labelRef = ref<HTMLDivElement | null>(null)
        const shrinkFormErrorSwitchFn = ref<Function>()
        provide('shrinkFormErrorSwitchFn', shrinkFormErrorSwitchFn)
        provide('changeErrorMessage', (message: string) => {
            errorMessage.value = message;
        })
        onMounted(() => {
        })

        const isRequired = computed(() => {
            return Object.keys(model).includes(props.prop)
        })

        const shrinkSelectSwitch = (shrinkViewConfigSwitch: Function) => {
            shrinkFormErrorSwitchFn.value = shrinkViewConfigSwitch
        }
        return () => (
            <div class="a-form-item-content">
                <label class="a-form-item-label" ref={labelRef}>
                    {isRequired.value && <span class="iconfont icon-bitian"></span>}
                    {props.label}
                </label>
                <div class="a-form-item-slot">
                    {slots.default!()}
                    <ShrinkBox shrinkViewSwitch={shrinkSelectSwitch} zIndex="0">
                        <div class="a-form-item-error">
                            {errorMessage.value}
                        </div>
                    </ShrinkBox>
                </div>

            </div>
        )
    }
})