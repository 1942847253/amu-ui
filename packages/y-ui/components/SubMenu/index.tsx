import { defineComponent, getCurrentInstance, inject, onMounted, Ref, ref } from 'vue'
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
        const subContent = ref(null as unknown as HTMLDivElement)
        const subContentHeight = ref<number>(0)
        const instents = getCurrentInstance()
        onMounted(() => {
            subContentHeight.value = subContent.value.offsetHeight;
            subContent.value.style.height = 0 + 'px';
            expandByDefault();
        })

        const subSlotSwitch = () => {
            if (subContent.value.style.height === '0px') {
                subContent.value.style.height = subContentHeight.value + 'px';
            } else {
                subContent.value.style.height = 0 + 'px';
            }
        }

        const expandByDefault = () => {
            const allSubIitemIndexs = [] as string[]
            instents!.slots.default!().forEach(slot => {
                allSubIitemIndexs.push(slot.props!.index)
            })
            if (allSubIitemIndexs.includes(defaultActive.value)) {
                subContent.value.style.height = subContentHeight.value + 'px';
            }
        }
        return () => (
            <div class="y-sub-menu-content">
                <div class={`y-sub-item`} onClick={() => subSlotSwitch()}>
                    <div class="item-icon">{slots.icon!()}</div>
                    <div class="item-title">{slots.title!()}</div>
                    <div class="item-right-icon">></div>
                </div>
                <div ref={subContent} class="y-sub-slot" slot="sub">
                    {slots.default!()}
                </div>
            </div>
        )
    }
})