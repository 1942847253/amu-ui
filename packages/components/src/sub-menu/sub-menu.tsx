import { getStyleAttributeValue } from '../../shared/utils';
import { defineComponent, getCurrentInstance, inject, nextTick, onMounted, Ref, ref, watch } from 'vue'
import './style/index.less';

export default defineComponent({
    name: 'ASubMenu',
    props: {
        index: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit, slots }) {
        const instents = getCurrentInstance()
        const dark = inject('dark') as Boolean
        const defaultActive = inject('default-active') as Ref<string>
        const subContentRef = ref(null as unknown as HTMLDivElement)
        const subSlotRef = ref(null as unknown as HTMLDivElement)
        const subItemRef = ref(null as unknown as HTMLDivElement)
        const subItemIconRef = ref(null as unknown as HTMLDivElement)
        const subContentHeight = ref<number>(0)
        const isContentOpen = ref(false);

        onMounted(() => {
            // 让父组件插槽获取初始高度 然后让所以菜单默认收起
            subContentHeight.value = subSlotRef.value.offsetHeight;
            subSlotRef.value.style.height = '0px'
            initTitlePadding();
            expandByDefault();
        })

        watch(() => defaultActive.value, () => {
            if (checkExpandByDefault()) {
                subItemRef.value.style.color = (dark ? '#FFFFFF' : '#0468dc')
            } else {
                subItemRef.value.style.color = ''
            }
        })

        /*
            多层嵌套的菜单pandding依次增加
            通过获取父容器的slot标识,判断父组件是否是sub-menu
            如果是的话 依次增加padding值
        */
        const initTitlePadding = () => {
            const subParent = subContentRef.value!.parentElement;
            const slot = subParent!.getAttribute('slot')
            if (slot && slot === "sub") {
                const PSubItem = subParent?.parentElement?.querySelector('.a-sub-item') as HTMLDivElement
                subItemRef.value!.style.paddingLeft = getStyleAttributeValue(PSubItem, 'padding-left') + 22 + 'px'
            }
        }

        /*
            判断menu的展开收起
            需要注意每次展开收起都需要让父容器的高度加上或者减去当前多出或减少的高度
            当触发收起操作时由于容器的overflow：hidden属性我们需要使用scrollHeight拿到其真实高度
        */
        const subSlotSwitch = () => {
            const parentElement = subContentRef.value.parentElement as HTMLDivElement
            parentElement.style.transition = 'height 0.25s ease'
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

        /*
           判断是否需要默认展开
           拿到子组件props传入的所有index组成数组对比defaultActive是否包含在内
       */
        const checkExpandByDefault = () => {
            const allSubIitemIndexs = [] as string[]
            getSlotItemIndex(allSubIitemIndexs, instents!.slots.default)
            return allSubIitemIndexs.includes(defaultActive.value)
        }
        
        // 递归收集当前sub-menu下所有子组件的index
        const getSlotItemIndex = (allSubIitemIndexs: string[], itemSlot: any) => {
            if (!itemSlot) return
            itemSlot().forEach((slot: any) => {
                if (slot.children.default) {
                    getSlotItemIndex(allSubIitemIndexs, slot.children.default)
                }
                slot.props && allSubIitemIndexs.push(slot.props.index)
            })
        }

        /*
          默认展开时添加默认样式
          为了让首次展开时不带过度动画，在nextTick时再加上transition属性
      */
        const expandByDefault = () => {
            if (checkExpandByDefault()) {
                subItemRef.value.style.color = (dark ? '#FFFFFF' : '#0468dc')
                isContentOpen.value = true
                subSlotRef.value.style.height = subContentHeight.value + 'px';
            }
            nextTick(() => {
                subItemIconRef.value.style.transition = 'transform 0.2s ease'
                subItemRef.value.style.transition = 'color 0.2s ease'
            })
        }

        const getDarkClass = () => {
            if (dark) {
                return 'a-sub-item-dark'
            } else {
                return 'a-sub-item-light'
            }
        }
        return () => (
            <div class="a-sub-menu-content" ref={subContentRef}>
                <div ref={subItemRef} class={`a-sub-item ${getDarkClass()}`} onClick={() => subSlotSwitch()}>
                    <div class="item-icon">{slots.icon && slots.icon()}</div>
                    <div class="item-title">{slots.title && slots.title()}</div>
                    <div ref={subItemIconRef} class={`item-right-icon iconfont icon-right ${isContentOpen.value ? 'open' : 'close'}`}></div>
                </div>
                <div ref={subSlotRef} class="a-sub-slot" slot="sub">
                    {slots.default && slots.default()}
                </div>
            </div>
        )
    }
})