import { defineComponent } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YFormItem',
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        return () => (
            <div class="y-form-item-content">
                <label>{props.label}</label>
                <div class="y-form-item-slot">
                    {slots.default!()}
                </div>
            </div>
        )
    }
})