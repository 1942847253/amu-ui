import { computed, defineComponent, provide, ref, watch } from 'vue'
import './style/index.less';

export default defineComponent({
    name: 'AMenu',
    props: {
        defaultActive: {
            type: String,
            default: ''
        },
        dark: {
            type: Boolean,
            default: false
        },

    },
    setup(props, { emit, slots }) {
        const defaultActive = ref(props.defaultActive)
        const showScrollBar = ref(true)
        const updateDefaultValue = (value: string) => {
            if (value === defaultActive.value) return;
            defaultActive.value = value
        }

        const menuComputedStyle = computed(() => {
            return {
                backgroundColor: props.dark ? '#001428' : 'var(--a-bg-color)',
                overflow: showScrollBar.value ? 'overlay' : 'overlay'
            }
        })

        provide('default-active', defaultActive)
        provide('dark', props.dark)
        provide('updateDefaultValue', updateDefaultValue)
        return () => (
            <nav class="a-menu-content" style={menuComputedStyle.value}>
                <div class="a-menu-item-list">
                    {slots.default!()}
                </div>
            </nav>
        )
    }
})