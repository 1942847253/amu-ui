import { computed, CSSProperties, defineComponent, inject, onBeforeUnmount, onMounted, Ref, ref, watch } from "vue";
import AIcon from "@/src/icon";
import './style/index.less';
import $bus from "../../bus/bus";

export default defineComponent({
    name: 'AInput',
    props: {
        modelValue: {
            type: [String, Number],
        },
        value: {
            type: [String, Number],
            default: ''
        },
        textCenter: {
            type: Boolean,
            default: false
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
        },
        isSearch: {
            type: Boolean,
            default: false
        },
        isSelector: {
            type: Boolean,
            default: false
        },
        isDate: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    emits: ['update:modelValue', 'change', 'blur', 'focus', "resetValue", "enter"],
    setup(props, { emit, slots, expose }) {
        const value = ref((props.modelValue === undefined ? props.value : props.modelValue));
        const prop = inject<string>('prop', '')
        const type = ref(props.type)
        const showIconBtn = ref(false);
        const showEyeCloseBtn = ref(false)
        const isFocus = ref(false);
        // Dom相关
        const inputFocusBorder = ref('var(--a-primary-color)');
        const inputBorder = ref('var(--a-border-color)')
        const inputHoverBorder = ref('var(--a-primary-color)')
        const inputFocusShadow = ref('var(--a-primary-color)')
        const inputContentRef = ref<HTMLDivElement | null>(null);
        const inputRef = ref<HTMLInputElement | null>(null);
        const slectIconRef = ref<HTMLInputElement | null>(null);
        // 依赖注入相关
        const uniKey = inject<string | null>('uniKey', null);
        const rules = inject('rules', null) as any;
        const model = inject<any>('model', null)
        const changeErrorMessage = inject('changeErrorMessage', null) as unknown as Function
        const shrinkFormErrorSwitchFn = inject('shrinkFormErrorSwitchFn', null) as unknown as Ref<Function>
        const shrinkSelectMenuSwitchFn = inject('shrinkSelectMenuSwitchFn', null) as unknown as Ref<Function>

        const inputxStyle = computed(() => {
            return {
                width: props.width ? props.width + 'px' : '100%',
                height: props.height ? props.height + 'px' : '34px',
                textAlign: props.textCenter ? 'center' : '',
                backgroundColor: props.disabled ? 'var(--a-bg-grey-color)' : '',
                '--input-text-color': props.disabled ? 'var(--a-text-disable-color)' : 'var(--a-text-color)'
            } as CSSProperties
        })

        const showInputSlot = computed(() => props.clearable || props.isDate || props.isSearch || props.isSelector || props.type === 'password')

        watch(() => [props.width, props.height], () => {
            initInputWidth()
        }, { deep: true })

        watch(() => props.modelValue, (val) => {
            value.value = val!
        })

        watch(() => props.value, (val) => {
            value.value = val
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
                value.value = ''
                emit('update:modelValue', value.value);
            }
            setTimeout(() => {
                inputRef.value!.focus();
            });
        }

        watch(() => value.value, () => {
            if (value.value === "") {
                showIconBtn.value = false
            } else {
                showIconBtn.value = true
            }
        })

        const changeInputValue = (event: Event) => {
            const target = event.target as HTMLInputElement
            const val = (props.type === "number") ? (target.value === "" ? target.value : Number(target.value)) : target.value
            value.value = val
            emit('update:modelValue', value.value);
            emit('change', value.value)
            InputEventActions('change')
        }
        const blurInput = (event: Event) => {
            isFocus.value = false
            emit('blur', event);
            InputEventActions('blur')
            if (slectIconRef.value) {
                slectIconRef.value.$el.style.transform = `rotate(0deg)`
            }
        }
        const onInputFocus = (event: Event) => {
            isFocus.value = true
            if (value.value.toString().length > 0) showIconBtn.value = true;
            if (slectIconRef.value) {
                slectIconRef.value.$el.style.transform = `rotate(-180deg)`
            }
            shrinkSelectMenuSwitchFn && shrinkSelectMenuSwitchFn.value(1, 0.2)
            emit('focus', event)
        }
        const clearableSlot = () => {
            return <div>
                {showIconBtn.value && <span onMousedown={() => soltBtnActions()} class="iconfont icon-guanbi"></span>}
            </div>
        }

        const passwordSlot = () => {
            return <div>
                {showIconBtn.value && <div onMousedown={() => soltBtnActions()}><AIcon name={showEyeCloseBtn.value ? "select" : 'hide'} /></div>}
            </div>

        }

        const dateSlot = () => {
            return <div onMousedown={() => soltBtnActions()}><AIcon name="calendar" /></div>
        }
        const searchSlot = () => {
            return <div onMousedown={() => soltBtnActions()}><AIcon name="search" /></div>
        }

        const selectSlot = () => {
            return <div onMousedown={() => soltBtnActions()}><AIcon name="arrow-down" ref={slectIconRef} /></div>
        }

        const initIconSlot = () => {
            if (props.clearable) {
                if (props.type === "password" && props.showPassword) {
                    return passwordSlot();
                }
                return clearableSlot();
            } else if (props.isDate) {
                return dateSlot();
            } else if (props.isSelector) {
                if (props.isSearch) {
                    return searchSlot()
                } else {
                    return selectSlot();
                }
            } else if (props.type === "password" && props.showPassword) {
                return passwordSlot();
            }
        }



        const InputEventActions = (eventType: 'change' | 'blur') => {
            showIconBtn.value = false;
            if (rules && rules[prop]) {
                for (let i = 0; i < rules[prop].length; i++) {
                    const rule = rules[prop][i]
                    if (rule.trigger !== eventType) continue;
                    if (rule.required === true) {
                        if (value.value === "") {
                            setInputStatusStyle('error', rule.message);
                            return
                        }
                        setInputStatusStyle();
                    }

                    if (value.value.toString().length < rule.min || value.value.toString().length > rule.max) {
                        setInputStatusStyle('error', rule.message);
                        return
                    } else {
                        setInputStatusStyle()
                    }

                    if (rule.validator && typeof rule.validator === 'function') {
                        rule.validator(rule, value.value, (errorMessage: Error) => {
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

        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                emit('enter', value.value)
            }
        }

        const setInputStatusStyle = (flag: 'error' | 'right' = 'right', message: string = '') => {
            if (flag === 'error') {
                inputFocusBorder.value = 'var(--a-error-color)';
                inputBorder.value = 'var(--a-error-color)'
                inputHoverBorder.value = 'var(--a-error-color)'
                inputFocusShadow.value = 'var(--a-error-color)'
                changeErrorMessage(message)
                shrinkFormErrorSwitchFn.value(1, 0.2)
            } else {
                inputFocusBorder.value = 'var(--a-primary-color)';
                inputBorder.value = 'var(--a-border-color)'
                inputHoverBorder.value = 'var(--a-primary-color)'
                inputFocusShadow.value = 'var(--a-primary-color)'
                shrinkFormErrorSwitchFn.value(0, 0.2)
            }
        }

        $bus.$on(`change-input-style-${uniKey}-${prop}`, (flag: 'error' | 'right' = 'right', message: string = '') => {
            setInputStatusStyle(flag, message)
        })

        $bus.$on(`reset-input-value-${uniKey}-${prop}`, () => {
            if (!props.isSelector) {
                value.value = model[prop]
                emit('update:modelValue', value.value);
            }
            emit('resetValue', model[prop])
            setInputStatusStyle()
        })

        onBeforeUnmount(() => {
            $bus.$off(`reset-input-value-${uniKey}-${prop}`)
        })

        expose({
            setInputStatusStyle
        })

        return () => (
            <div class="a-input-content" style={{
                "--border-focus-shadow": isFocus.value ? inputFocusShadow.value : '',
                '--input-focus-opacity': isFocus.value ? 0.2 : 1,
                cursor: props.disabled ? 'no-drop' : '',
            }}>
                <div class="a-input-wrapper" style={{
                    backgroundColor: (props.disabled ? "var(--a-bg-grey-color)" : ''),
                    pointerEvents: (props.disabled ? 'none' : 'auto'),
                    "--border-focus-color": inputFocusBorder.value,
                    "--border-color": inputBorder.value,
                    "--border-hover-color": inputHoverBorder.value,

                }} ref={inputContentRef}>
                    <input
                        style={inputxStyle.value}
                        placeholder={props.placeholder}
                        class="input"
                        onInput={changeInputValue}
                        readonly={props.readonly}
                        onFocus={(event) => onInputFocus(event)}
                        onBlur={(event) => blurInput(event)}
                        onKeydown={(event) => onKeydown(event)}
                        disabled={props.disabled}
                        type={type.value}
                        v-model={value.value}
                        ref={inputRef}
                    />
                </div>
                <div v-show={showInputSlot.value} class="a-input-slot" style={{
                    backgroundColor: (props.disabled ? "var(--a-bg-grey-color)" : ''),
                }}>
                    {initIconSlot()}
                </div>

            </div>
        )
    }
})