import { getStyleAttributeValue } from "../../shared/utils";
import { computed, defineComponent, getCurrentInstance, inject, nextTick, onMounted, Ref, ref, unref, watch } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YInput',
    props: {
        modelValue: {
            type: String,
        },
        value: {
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
    emits: ['update:modelValue', 'change', 'blur', 'focus'],
    setup(props, { emit, slots }) {
        let value = unref((props.modelValue === undefined ? props.value : props.modelValue))!;
        const Instance = getCurrentInstance()!;
        const prop = Instance.parent!.props.prop as string
        const type = ref(props.type)
        const showIconBtn = ref(false);
        const showEyeCloseBtn = ref(false)
        // Dom相关
        const inputFocusBorder = ref('#0468dc');
        const inputBorder = ref('#dcdfe6')
        const inputHoverBorder = ref('#c2c3c7')
        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLInputElement | null>(null);
        // 依赖注入相关
        const rules = inject('rules', null) as any;
        const changeErrorMessage = inject('changeErrorMessage', null) as unknown as Function
        const shrinkFormErrorSwitchFn = inject('shrinkFormErrorSwitchFn', null) as unknown as Ref<Function>
        const shrinkSelectMenuSwitchFn = inject('shrinkSelectMenuSwitchFn', null) as unknown as Ref<Function>

        const inputxStyle = computed(() => {
            return {
                width: props.width ? props.width + 'px' : '100%',
                height: props.height ? props.height + 'px' : '30px',
            }
        })

        watch(() => [props.width, props.height], () => {
            initInputWidth()
        }, { deep: true })

        watch(() => props.modelValue, (val) => {
            value = val!
        })

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

        const changeInputValue = (event: Event) => {
            const target = event.target as HTMLInputElement
            showIconBtn.value = true
            value = target.value
            if (value === "") {
                showIconBtn.value = false
            }
            emit('update:modelValue', value);
            emit('change', value)
            InputEventActions('change')
        }
        const blurInput = (event: Event) => {
            emit('blur', event);
            InputEventActions('blur')
        }
        const onInputFocus = (event: Event) => {
            value!.length > 0 && (showIconBtn.value = true)
            shrinkSelectMenuSwitchFn && shrinkSelectMenuSwitchFn.value(1, 0.2)
            emit('focus', event)
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

        const InputEventActions = (eventType: 'change' | 'blur') => {
            showIconBtn.value = false;
            if (rules && rules[prop]) {
                for (let i = 0; i < rules[prop].length; i++) {
                    const rule = rules[prop][i]
                    if (rule.trigger !== eventType) continue;
                    if (rule.required === true) {
                        if (value === "") {
                            setInputStatusStyle('error', rule.message);
                            return
                        }
                        setInputStatusStyle();
                    }

                    if (value.length < rule.min || value.length > rule.max) {
                        setInputStatusStyle('error', rule.message);
                        return
                    } else {
                        setInputStatusStyle()
                    }

                    if (rule.validator && typeof rule.validator === 'function') {
                        rule.validator(rule, value, (errorMessage: Error) => {
                            if (errorMessage) {
                                setInputStatusStyle('error', errorMessage.message);
                            } else {
                                setInputStatusStyle()
                            }
                        })
                    }
                }
            }
        }

        const setInputStatusStyle = (flag: 'error' | 'right' = 'right', message: string = '') => {
            if (flag === 'error') {
                inputFocusBorder.value = '#e53935';
                inputBorder.value = '#e53935'
                inputHoverBorder.value = '#e53935'
                changeErrorMessage(message)
                shrinkFormErrorSwitchFn.value(1, 0.2)
            } else {
                inputFocusBorder.value = '#0468dc';
                inputBorder.value = '#dcdfe6'
                inputHoverBorder.value = '#c2c3c7'
                shrinkFormErrorSwitchFn.value(0, 0.2)
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
                        onFocus={(event) => onInputFocus(event)}
                        onBlur={(event) => blurInput(event)}
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