import { getStyleAttributeValue } from '../../shared/utils';
import { defineComponent, getCurrentInstance, inject, nextTick, onMounted, Ref, ref, watch } from 'vue'
import './index.scss';

export default defineComponent({
    name: 'YSubMenu',
    props: {
        index: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit, slots }) {
        const defaultActive = inject('default-active') as Ref<string>
        const subContentRef = ref(null as unknown as HTMLDivElement)
        const subSlotRef = ref(null as unknown as HTMLDivElement)
        const subItemRef = ref(null as unknown as HTMLDivElement)
        const subItemIconRef = ref(null as unknown as HTMLDivElement)
        const subContentHeight = ref<number>(0)
        const isContentOpen = ref(false);
        const instents = getCurrentInstance()

        onMounted(() => {
            subContentHeight.value = subSlotRef.value.offsetHeight;
            subSlotRef.value.style.height = '0px'
            initTitlePadding();
            expandByDefault();
        })

        watch(() => defaultActive.value, (val) => {
            subItemRef.value.style.color = checkExpandByDefault(val) ? '#0468dc' : ''
        })

        const initTitlePadding = () => {
            const subParent = subContentRef.value!.parentElement;
            const slot = subParent!.getAttribute('slot')
            if (slot && slot === "sub") {
                const PSubItem = subParent?.parentElement?.querySelector('.y-sub-item') as HTMLDivElement
                subItemRef.value!.style.paddingLeft = getStyleAttributeValue(PSubItem, 'padding-left') + 22 + 'px'
            }
        }

        const subSlotSwitch = () => {
            const parentElement = subContentRef.value.parentElement as HTMLDivElement
            if (subSlotRef.value.style.height === '0px') {
                subSlotRef.value.style.height = subContentHeight.value + 'px';
                parentElement.style.height = parentElement.offsetHeight + subContentHeight.value + 'px'
                isContentOpen.value = true
            } else {
                subContentHeight.value = subSlotRef.value.scrollHeight;
                subSlotRef.value.style.height = 0 + 'px';
                parentElement.style.height = parentElement.offsetHeight - subContentHeight.value + 'px'
                isContentOpen.value = false
            }
        }

        const checkExpandByDefault = (value: string) => {
            if (!instents!.slots.default) return
            const allSubIitemIndexs = [] as string[]
            instents!.slots.default!().forEach(slot => {
                allSubIitemIndexs.push(slot.props!.index)
            })
            return allSubIitemIndexs.includes(value)
        }

        const expandByDefault = () => {
            if (checkExpandByDefault(defaultActive.value)) {
                subItemRef.value.style.color = '#0468dc'
                isContentOpen.value = true
            }
            nextTick(() => {
                subItemIconRef.value.style.transition = 'transform 0.2s ease'
                subItemRef.value.style.transition = 'color 0.2s ease'
            })


        }
        return () => (
            <div class="y-sub-menu-content" ref={subContentRef}>
                <div ref={subItemRef} class={`y-sub-item`} onClick={() => subSlotSwitch()}>
                    <div class="item-icon">{slots.icon && slots.icon()}</div>
                    <div class="item-title">{slots.title && slots.title()}</div>
                    <div ref={subItemIconRef} class={`item-right-icon iconfont icon-right ${isContentOpen.value ? 'open' : 'close'}`}></div>
                </div>
                <div ref={subSlotRef} class="y-sub-slot" slot="sub">
                    {slots.default && slots.default()}
                </div>
            </div>
        )
    }
})