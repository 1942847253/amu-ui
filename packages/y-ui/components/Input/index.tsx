import { getStyleAttributeValue } from "../../shared/utils";
import { computed, defineComponent, getCurrentInstance, inject, nextTick, onMounted, Ref, ref, unref, watch } from "vue";
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
    setup(props, { emit, slots }) {
        const Instance = getCurrentInstance()!;
        const rules = inject('rules') as any;
        const shrinkSelectSwitchFn = inject('shrinkSelectSwitchFn') as Ref<Function>
        const prop = Instance.parent!.props.prop as string

        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLInputElement | null>(null);
        const inputFocusBorder = ref('#0468dc');
        const inputBorder = ref('#dcdfe6')
        const inputHoverBorder = ref('#c2c3c7')
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
            if (value === "") {
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

        const onInputBlur = () => {
            console.log(1);

            showIconBtn.value = false;
            if (rules && rules[prop]) {
                rules[prop].forEach((rule: any) => {
                    if (rule.required === true && rule.trigger === "blur") {
                        if (value === "") {
                            inputFocusBorder.value = '#e53935';
                            inputBorder.value = '#e53935'
                            inputHoverBorder.value =  '#e53935'
                            shrinkSelectSwitchFn.value(1,0.2)
                        } else {
                            inputFocusBorder.value = '#0468dc';
                            inputBorder.value = '#dcdfe6'
                            inputHoverBorder.value = '#c2c3c7'
                            shrinkSelectSwitchFn.value(0,0.2)
                        }
                    }
                })
            }
        }
        return () => (
            <div class="y-input-content" style={`cursor: ${props.disabled ? 'no-drop' : ''};`}>
                <div class="y-input-wrapper" style={{
                    backgroundColor: (props.disabled ? "#f5f7fa" : ''),
                    pointerEvents: (props.disabled ? 'none' : 'auto'),
                    "--border-focus-color": inputFocusBorder.value,
                    "--border-color": inputBorder.value,
                    "--border-hover-color": inputHoverBorder.value
                }} ref={inputContentRef}>
                    <input
                        style={inputxStyle.value}
                        placeholder={props.placeholder}
                        class="input"
                        onInput={changeInputValue}
                        onFocus={() => props.modelValue.length > 0 && (showIconBtn.value = true)}
                        onBlur={() => onInputBlur()}
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