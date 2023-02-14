import { computed, CSSProperties, defineComponent, reactive, watch } from "vue";
import Input from "../../components/Input";
import './index.scss';

export default defineComponent({
    name: "YInputNumber",
    props: {
        modelValue: [Number, String],
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        }

    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const state = reactive({
            numberValue: props.modelValue,
        })


        const disabledStyle = computed<CSSProperties>(() => {
            return {
                pointerEvents: 'none',
                cursor: 'not-allowed',
                color: '#e4e5e6'
            }
        })

        const buttonJSX = () => {
            return (
                <>
                    <div style={props.disabled ? disabledStyle.value : ''} onClick={() => buttonClickAction('add')} class="add-button">
                        <span class="iconfont icon-jia"></span>
                    </div>
                    <div style={props.disabled ? disabledStyle.value : ''} onClick={() => buttonClickAction('subtract')} class="subtract-button">
                        <span class="iconfont icon-jian"></span>
                    </div>
                </>
            )
        }   

        watch(() => state.numberValue, (val) => {
            if (val! >= props.max && props.max !== Infinity) {
                state.numberValue = props.max
            } else if (val! <= props.min && props.min !== -Infinity) {
                state.numberValue = props.min
            }
            emit('update:modelValue', state.numberValue)
        })

        const buttonClickAction = (action: 'add' | 'subtract') => {
            if (props.readonly) return;
            if (action === 'add') {
                if (!state.numberValue) {
                    state.numberValue! = props.step
                    return
                }
                (state.numberValue as number) += props.step
            } else {
                if (!state.numberValue) {
                    state.numberValue! = -props.step
                    return
                }
                (state.numberValue as number) -= props.step
            }
        }

        const onBlur = () => {
            if (state.numberValue! >= props.max) {
                state.numberValue = ''
                setTimeout(() => {
                    state.numberValue = props.max
                });
            } else if (state.numberValue! <= props.min) {
                state.numberValue = ''
                setTimeout(() => {
                    state.numberValue = props.min
                });
            }
        }

        return () => (
            <div class="y-input-number-content">
                {buttonJSX()}
                <Input onBlur={() => onBlur()} placeholder={props.placeholder} readonly={props.readonly} disabled={props.disabled} textCenter width="150" v-model={state.numberValue} type="number" />
            </div>
        )
    }
})