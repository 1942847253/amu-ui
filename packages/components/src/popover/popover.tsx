import { CSSProperties, computed, defineComponent, ref, Transition, PropType, onMounted, Teleport, h, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import { debounce } from "@/shared/utils";
import './style/index.less'

export default defineComponent({
    name: "APopover",
    props: {
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
            default: 'right'
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        let timer: NodeJS.Timeout | null = null
        const popoverRef = ref<HTMLDivElement | null>(null)
        const referenceSlotRef = ref<HTMLDivElement | null>(null)
        // 显示弹框
        const popoverVisible = ref(false);
        const bgColor = ref("#ffff");
        // 方向
        const placements = ref("bottom");
        onMounted(() => {
            positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
            if (props.trigger === 'click') {
                referenceSlotRef.value!.addEventListener('click', () => showTip());
                onClickOutside(referenceSlotRef.value!, (event) => {
                    console.log(event.target);
                    const currentClickElement = event.target as HTMLElement
                    const isElementInPopover = (popoverRef.value?.contains(currentClickElement))
                    if (!(currentClickElement.className === "a-popover" || isElementInPopover)) {
                        hiddenTip()
                    }
                })
            } else if (props.trigger === 'hover') {
                referenceSlotRef.value!.addEventListener('mouseenter', () => showTip());
                referenceSlotRef.value!.addEventListener('mouseleave', () => hiddenTip());
                popoverRef.value!.addEventListener('mouseenter', () => showTip());
                popoverRef.value!.addEventListener('mouseleave', () => hiddenTip());
            }
            window.addEventListener('scroll', () => {
                console.log(123);

                positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
            })

        })
        const referenceSlot = () => {
            if (slots!.reference) {
                return slots!.reference()
            } else {
                return ''
            }
        }
        // 显示
        function showTip() {

            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            popoverVisible.value = true;
            positionElement(referenceSlotRef.value!.firstElementChild!, props.placement)
        }
        function hiddenTip() {
            timer = setTimeout(() => {
                popoverVisible.value = false;
                timer = null
            }, 200);

        }

        // 位置
        const tooltipPostiton = ref({
            left: 0,
            top: 0,
        });
        const tooltipStyle = computed<CSSProperties>(() => {
            let scale = ""
            let origin = ''
            switch (props.placement) {
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
            return {
                left: tooltipPostiton.value.left + "px",
                top: tooltipPostiton.value.top + "px",
                backgroundColor: bgColor.value,
                transform: `${scale}(${popoverVisible.value ? 1 : 0})`,// 面板收起
                transformOrigin: origin
            };
        });
        function positionElement(target: Element, placements: string) {
            let Placements = placements
            if (!target) return;
            tooltipPostiton.value.left = 0;
            tooltipPostiton.value.top = 0;
            let el_dom
            let target_dom
            let tooltipArrow
            let ELDOM = popoverRef.value!;
            el_dom = ELDOM.getBoundingClientRect()
            target_dom = target.getBoundingClientRect()
            tooltipArrow = (ELDOM as HTMLDivElement).querySelector('.a-popover-arrow ')
            let top, left;
            switch (Placements) {
                case "top":
                    if (target_dom.top < el_dom.height) {
                        Placements = 'bottom'
                    }
                    break;
                case "bottom":
                    if ((window.innerHeight - target_dom.bottom) < ELDOM.clientHeight) {
                        Placements = 'top'
                    }
                    break;
                case "left":
                    if (target_dom.left < ELDOM.clientWidth) {
                        Placements = 'right'
                    }
                    break;
                case "right":
                    if ((window.innerWidth - target_dom.right) < ELDOM.clientWidth) {
                        Placements = 'left'
                    }
                    break;
                default:
                    throw new Error("Invalid direction");
            }

            // tooltipArrow!.className = `a-popover-arrow ${Placements}`
            console.log(Placements);

            switch (Placements) {
                case "top":
                    top = target_dom.top - ELDOM.offsetHeight - 5 + window.scrollY;
                    left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2 + window.scrollX;
                    break;
                case "bottom":
                    top = target_dom.bottom + 5 + window.scrollY;
                    left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2 + window.scrollX;
                    break;
                case "left":
                    top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2 + window.scrollY;
                    left = target_dom.left - ELDOM.offsetWidth - 5 + window.scrollX;
                    break;
                case "right":
                    top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2 + window.scrollY;
                    left = target_dom.right + 5 + window.scrollX;
                    break;
                default:
                    throw new Error("Invalid direction");
            }

            tooltipPostiton.value.top = top
            tooltipPostiton.value.left = left
        }

        const triggerEventActions = (type?: 'show' | 'hidden') => {
            switch (props.trigger) {
                case 'hover':
                    if (type === 'show') {

                        showTip()
                    } else {
                        hiddenTip()
                    }
                    break;

                case 'click':

                    if (popoverVisible.value) {
                        hiddenTip()
                    } else {
                        showTip()
                    }
                    break
                default:
                    break;
            }
        }

        const popoverInnerContent = () => {
            return (
                <div class="a-popover-inner-content">
                    <div class="title">{props.title}</div>
                    <div class="content">{(slots.default && slots.default()) || props.content}</div>
                </div>
            )
        }
        return () => (

            <div class="a-popover-content">
                <div class="a-reference" ref={referenceSlotRef} >
                    {referenceSlot()}
                </div>
                <Teleport to="body">
                    <Transition name="popover" appear>
                        {
                            <div ref={popoverRef} class="a-popover" style={tooltipStyle.value}>
                                {
                                    popoverInnerContent()
                                }

                            </div >
                        }
                    </Transition>
                </Teleport>
            </div>


        )
    }
})