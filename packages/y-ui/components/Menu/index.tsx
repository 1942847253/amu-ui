import { defineComponent, provide, ref, watch } from 'vue'
import './index.scss';

export default defineComponent({
    name: 'YMenu',
    props: {
        defaultActive: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit, slots }) {
        const defaultActive = ref(props.defaultActive)

        const updateDefaultValue = (value: string) => {
            if (value === defaultActive.value) return;
            defaultActive.value = value
        }

        provide('default-active', defaultActive)
        provide('updateDefaultValue', updateDefaultValue)
        return () => (
            <nav class="y-menu-content">
                <div class="y-menu-item-list">
                    {slots.default!()}
                </div>
            </nav>
        )
    }
})