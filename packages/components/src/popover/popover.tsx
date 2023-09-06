import { CSSProperties, computed, defineComponent, ref, Transition, PropType, onMounted, Teleport, onBeforeUnmount } from "vue";
import { onClickOutside } from "@vueuse/core";
import { debounce } from "@/shared/utils";
import useElementPosition from "./hooks/useElementPosition";
import './style/index.less'

export default defineComponent({
    name: "APopover",
    props: {
        visible: {
            type: Boolean,
            default: null
        },
        trigger: {
            type: String as PropType<'hover' | 'click'>,
            default: 'click'
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        placement: {
            type: String as PropType<'top' | 'left' | 'bottom' | 'right'>,
            default: 'bottom'
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        let timer: NodeJS.Timeout | null = null

        const popoverRef = ref<HTMLDivElement | null>(null)
        const referenceSlotRef = ref<HTMLDivElement | null>(null)

        const bgColor = ref("#ffff");
        const placements = ref("bottom");
        const popoverVisible = ref(false);
        const popoverPostiton = ref({
            left: 0,
            top: 0,
        });

        const popoverStyle = computed<CSSProperties>(() => {
            let scale = ""
            let origin = ''
            switch (placements.value) {
                case 'bottom':
                    scale = 'scaleY'
                    origin = 'center top'
                    break;
                case 'left':
                    scale = 'scaleX'
                    origin = 'right'
                    break
                case 'top':
                    scale = 'scaleY'
                    origin = 'center bottom'
                    break;
                case 'right':
                    scale = 'scaleX'
                    origin = 'left'
                    break
                default:
                    break;
            }
            let Visible = (props.visible === null) ? popoverVisible.value : props.visible
            return {
                left: popoverPostiton.value.left + "px",
                top: popoverPostiton.value.top + "px",
                backgroundColor: bgColor.value,
                transform: `${scale}(${Visible ? 1 : 0})`,// 面板收起
                transformOrigin: origin
            };
        });

        const positionElement = (target: Element, Placement: string) => {
            const { top, left, placement } = useElementPosition(target, popoverRef.value!, Placement)
            placements.value = placement
            popoverPostiton.value = {
                top,
                left
            };
        }
        const ListenerFn = () => positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
        const debounceFn =  debounce(ListenerFn,50)
        onMounted(() => {
            if (props.visible === null) {
                const referenceSlotFirstElement = referenceSlotRef.value!.firstElementChild as HTMLElement
                if (props.trigger === 'click') {
                    referenceSlotFirstElement.addEventListener('click', showPopover);
                    onClickOutside(referenceSlotFirstElement, (event) => {
                        const currentClickElement = event.target as HTMLElement
                        const isElementInPopover = (popoverRef.value?.contains(currentClickElement))
                        if (!(currentClickElement.className === "a-popover" || isElementInPopover)) {
                            hiddenPopover()
                        }
                    })
                } else if (props.trigger === 'hover') {
                    referenceSlotFirstElement.addEventListener('mouseenter', showPopover);
                    referenceSlotFirstElement.addEventListener('mouseleave', hiddenPopover);
                    popoverRef.value!.addEventListener('mouseenter', showPopover);
                    popoverRef.value!.addEventListener('mouseleave', hiddenPopover);
                }
            } else {
                positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
            }
            window.addEventListener('scroll', debounceFn)

        })

        onBeforeUnmount(() => {
            const referenceSlotFirstElement = referenceSlotRef.value!.firstElementChild as HTMLElement
            window.removeEventListener('scroll', debounceFn)
            referenceSlotFirstElement.removeEventListener('mouseenter', showPopover);
            referenceSlotFirstElement.removeEventListener('mouseleave', hiddenPopover);
            referenceSlotFirstElement.removeEventListener('click', showPopover);
            popoverRef.value!.removeEventListener('mouseenter', showPopover);
            popoverRef.value!.removeEventListener('mouseleave', hiddenPopover);
        })

        const showPopover = () => {
            if (props.visible === null && timer) {
                clearTimeout(timer)
                timer = null
            }
            positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
            popoverVisible.value = true;
        }
        const hiddenPopover = () => {
            if (props.visible === null) {
                timer = setTimeout(() => {
                    popoverVisible.value = false;
                    timer = null
                }, 300);
            } else {
                popoverVisible.value = false;
            }
        }

        const referenceSlot = () => {
            if (slots!.reference) {
                return slots!.reference()
            } else {
                return ''
            }
        }
        const popoverInnerContent = () => {
            return (
                <div class="a-popover-inner-content">
                    <div v-show={props.title} class="title">{props.title}</div>
                    <div v-show={slots.default || props.content} class="content">{(slots.default && slots.default()) || props.content}</div>
                </div>
            )
        }
        return () => (
            <div class="a-popover-content">
                <div class="a-reference" ref={referenceSlotRef} >
                    {referenceSlot()}
                </div>
                <Teleport to="body">
                    {
                        <div ref={popoverRef} class="a-popover" style={popoverStyle.value}>
                            {popoverInnerContent()}
                        </div >
                    }
                </Teleport>
            </div>
        )
    }
})