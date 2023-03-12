import { getStyleAttributeValue } from '../../shared/utils';
import { computed, defineComponent, inject, nextTick, onMounted, Ref, ref, watch } from 'vue'
import './style/index.less';

export default defineComponent({
    name: 'AMenuItem',
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
        const dark = inject('dark') as Boolean
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

        /*
          多层嵌套的菜单pandding依次增加
          通过获取父容器的slot标识,判断父组件是否是sub-menu
          如果是的话 依次增加padding值
      */
        const initTitlePadding = () => {
            const subParent = menuRef.value!.parentElement;
            if (isSubMenuItem()) {
                isSubItem.value = true
                const PSubItem = subParent?.parentElement?.querySelector('.a-sub-item') as HTMLDivElement
                menuRef.value!.style.paddingLeft = getStyleAttributeValue(PSubItem, 'padding-left') + 22 + 'px'
            }
        }

        const isSubMenuItem = () => {
            const subParent = menuRef.value!.parentElement;
            const slot = subParent!.getAttribute('slot')
            return !!(slot && slot === "sub")
        }

        const getActiveClass = () => {
            if (isCurrentKey.value) {
                if (dark) {
                    return 'active-dark'
                } else {
                    return 'active-light'
                }
            } else {
                return ''
            }
        }

        const getDarkClass = () => {
            if (dark) {
                return 'a-menu-item-dark'
            } else {
                return 'a-menu-item-light'
            }
        }

        return () => (
            <div ref={menuRef} class={`a-menu-item ${getDarkClass()} ${getActiveClass()}`} onClick={() => updateDefaultValue(props.index)}>
                <div class="item-icon">{slots.icon && slots.icon()}</div>
                <div class="item-title">{slots.default && slots.default()}</div>
            </div>
        )
    }
})