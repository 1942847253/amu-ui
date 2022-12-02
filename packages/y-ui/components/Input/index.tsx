import { getStyleAttributeValue } from "../../shared/utils";
import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YInput',
    props: {
        value: [String],
        modelValue: {
            type: String,
            default: ''
        },
        width: [Number, String],
        height: [Number, String],
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLInputElement | null>(null);
        let value = unref(props.modelValue);
        const showCloseBtn = ref(false)
        const inputxStyle = computed(() => {
            return {
                width: props.width ? props.width + 'px' : '100%',
                height: props.height ? props.height + 'px' : '30px',
            }
        })

        watch(() => [props.width, props.height], () => {
            initInputWidth()
        }, { deep: true })

        onMounted(() => {
            initInputWidth();
        })

        const initInputWidth = () => {
            inputContentRef.value!.style.flexGrow = props.width ? '0' : '1'
        }

        const clearValue = () => {
            value = ''
            emit('update:modelValue', value);
            setTimeout(() => {
                inputRef.value!.focus();   
            });
        }

        const changeInputValue = (e: Event) => {
            const target = e.target as HTMLInputElement
            showCloseBtn.value = true     
            value = target.value
            emit('update:modelValue',value);
        }
        const closedBtn = () => {
            return (
                <div class="y-input-close">
                    <span onMousedown={() => clearValue()} class="iconfont icon-guanbi"></span>
                </div>
            )
        }
        return () => (
            <div class="y-input-content" style={`cursor: ${props.disabled ? 'no-drop' : ''};`}>
                <div class="y-input-wrapper" style={{
                    backgroundColor: (props.disabled ? "#f5f7fa" : ''),
                    pointerEvents: (props.disabled ? 'none' : 'auto'),
                }} ref={inputContentRef}>
                    <input
                        style={inputxStyle.value}
                        placeholder="Please input"
                        class="input"
                        onInput={changeInputValue}
                        onFocus={() => props.modelValue.length > 0 && (showCloseBtn.value = true)}
                        onBlur={() => { showCloseBtn.value = false}}
                        disabled={props.disabled}
                        type="text"
                        value={value}
                        ref={inputRef}
                    />

                </div>
                {showCloseBtn.value && closedBtn()}
            </div>
        )
    }
})