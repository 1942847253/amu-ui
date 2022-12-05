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
        },
        clearable: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "Please input"
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLInputElement | null>(null);
        let value = unref(props.modelValue);
        const type = ref(props.type)
        const showIconBtn = ref(false);
        const showEyeCloseBtn = ref(false)
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

        const soltBtnActions = () => {
            if (props.type === 'password' && props.showPassword) {
                type.value = (type.value === 'password' ? 'text' : 'password')
                showEyeCloseBtn.value = !showEyeCloseBtn.value
            } else {
                value = ''
                emit('update:modelValue', value);
            }
            setTimeout(() => {
                inputRef.value!.focus();
            });
        }

        const changeInputValue = (e: Event) => {
            const target = e.target as HTMLInputElement
            showIconBtn.value = true
            value = target.value
            if(value === ""){
                showIconBtn.value = false
            }
            emit('update:modelValue', value);
        }
        const inputSlot = () => {
            return (
                <div class="y-input-slot">
                    {props.type !== 'password' && showIconBtn.value && props.clearable && (
                        <span onMousedown={() => soltBtnActions()} class="iconfont icon-guanbi"></span>
                    )}
                    {
                        props.type === 'password' && showIconBtn.value && (
                            <span onMousedown={() => soltBtnActions()} class={`iconfont ${showEyeCloseBtn.value ? 'icon-yanjing' : 'icon-yanjing1'}`}></span>
                        )
                    }
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
                        placeholder={props.placeholder}
                        class="input"
                        onInput={changeInputValue}
                        onFocus={() => props.modelValue.length > 0 && (showIconBtn.value = true)}
                        onBlur={() => { showIconBtn.value = false }}
                        disabled={props.disabled}
                        type={type.value}
                        value={value}
                        ref={inputRef}
                    />

                </div>
                {inputSlot()}
            </div>
        )
    }
})