import { computed, defineComponent, inject, onMounted, Ref, ref, watch } from 'vue'
import './index.scss';

export default defineComponent({
    name: 'YMenuItem',
    props: {
        index: {
            type: String,
            default: null
        },
        disable: {
            type: Boolean,
            default: false
        },
        route: Object
    },
    setup(props, { emit, slots }) {
        const defaultActive = inject('default-active') as Ref<string>
        const updateDefaultValue = inject('updateDefaultValue') as Function
        const isCurrentKey = computed(() => defaultActive.value === props.index)
        const menuRef = ref<HTMLDivElement | null>(null);
        const isSubItem = ref(false);

        onMounted(() => {
            const subParent = menuRef.value!.parentElement;
            const slot = subParent!.getAttribute('slot')
            if (slot && slot === "sub") {
                isSubItem.value = true
            }
        })

        watch(() => defaultActive.value, (val) => {
        }, { deep: true })

        return () => (
            <div ref={menuRef} style={`padding-left:${isSubItem.value ? '40px' : ''}`} class={`y-menu-item ${isCurrentKey.value ? 'active' : ''}`} onClick={() => updateDefaultValue(props.index)}>
                <div class="item-icon">{slots.icon!()}</div>
                <div class="item-title">{slots.default!()}</div>
            </div>
        )
    }
})