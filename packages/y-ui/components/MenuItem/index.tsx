import { getStyleAttributeValue } from '../../shared/utils';
import { computed, defineComponent, inject, nextTick, onMounted, Ref, ref, watch } from 'vue'
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
            nextTick(() => {
                initTitlePadding();
            })
        })

        watch(() => defaultActive.value, (val) => {
        }, { deep: true })

        const initTitlePadding = () => {
            const subParent = menuRef.value!.parentElement;
            const slot = subParent!.getAttribute('slot')
            if (slot && slot === "sub") {
                isSubItem.value = true
                const PSubItem = subParent?.parentElement?.querySelector('.y-sub-item') as HTMLDivElement
                menuRef.value!.style.paddingLeft = getStyleAttributeValue(PSubItem, 'padding-left') + 22 + 'px'
            }
        }

        return () => (
            <div ref={menuRef} class={`y-menu-item ${isCurrentKey.value ? 'active' : ''}`} onClick={() => updateDefaultValue(props.index)}>
                <div class="item-icon">{slots.icon && slots.icon()}</div>
                <div class="item-title">{slots.default && slots.default()}</div>
            </div>
        )
    }
})