import { computed, defineComponent, provide, ref, watch } from 'vue'
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
        const showScrollBar = ref(false)
        const updateDefaultValue = (value: string) => {
            if (value === defaultActive.value) return;
            defaultActive.value = value
        }

        const menuComputedStyle = computed(() => {
            return {
                backgroundColor: props.dark ? '#001428' : '#FFFFFF',
                overflow: showScrollBar.value ? 'overlay' : 'hidden'
            }
        })

        provide('default-active', defaultActive)
        provide('dark', props.dark)
        provide('updateDefaultValue', updateDefaultValue)
        return () => (
            <nav onMouseenter={() => showScrollBar.value = true} onMouseleave={() => showScrollBar.value = false} class="y-menu-content" style={menuComputedStyle.value}>
                <div class="y-menu-item-list">
                    {slots.default!()}
                </div>
            </nav>
        )
    }
})