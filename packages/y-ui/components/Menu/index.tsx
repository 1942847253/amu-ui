import { defineComponent, provide, ref, watch } from 'vue'
import './index.scss';

export default defineComponent({
    name: 'YMenu',
    props: {
        defaultActive: {
            type: String,
            default: ''
        },
        dark: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const defaultActive = ref(props.defaultActive)

        const updateDefaultValue = (value: string) => {
            if (value === defaultActive.value) return;
            defaultActive.value = value
        }

        provide('default-active', defaultActive)
        provide('dark', props.dark)
        provide('updateDefaultValue', updateDefaultValue)
        return () => (
            <nav class="y-menu-content" style={`background-color:${props.dark ? '#001428' : '#FFFFFF'}`}>
                <div class="y-menu-item-list">
                    {slots.default!()}
                </div>
            </nav>
        )
    }
})