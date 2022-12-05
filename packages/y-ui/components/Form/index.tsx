import { defineComponent } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YForm',
    emits: [],
    setup(props, { emit, slots }) {

        return () => (
            <div class="y-form-content">
                {slots.default!()}
            </div>
        )
    }
})