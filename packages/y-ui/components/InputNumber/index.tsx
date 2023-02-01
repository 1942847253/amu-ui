import { defineComponent, reactive, watch } from "vue";
import Input from "../../components/Input";
import './index.scss';

export default defineComponent({
    name: "YInputNumber",
    props: {
        modelValue: Number,
        min: {
            type: Number,
            default: Infinity
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
    emits: [],
    setup(props, { emit }) {
        const state = reactive({
            numberValue: props.modelValue,
        })

        const buttonJSX = () => {
            return (
                <>
                    <div onClick={() => buttonClickAction('add')} class="add-button">＋</div>
                    <div onClick={() => buttonClickAction('subtract')} class="subtract-button">-</div>
                </>
            )
        }

        watch(() => state.numberValue, (val) => {
            console.log(val);
        })

        const buttonClickAction = (action: 'add' | 'subtract') => {
            if (action === 'add') {
                state.numberValue! += props.step
            } else {
                state.numberValue! -= props.step
            }
        }

        return () => (
            <div class="y-input-number-content">
                {buttonJSX()}
                <Input textCenter width="150" v-model={state.numberValue} type="number" />
            </div>
        )
    }
})