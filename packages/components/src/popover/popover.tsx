import { CSSProperties, computed, defineComponent, ref, Transition, watch, onMounted, Teleport, h, nextTick } from "vue";
import './style/index.less'

export default defineComponent({
    name: "APopover",
    props: {

    },
    emits: [],
    setup(props, { emit, slots }) {
        let timer: NodeJS.Timeout | null = null
        const testRef = ref(null)
        const popoverRef = ref<HTMLDivElement | null>(null)
        const referenceSlotRef = ref<HTMLDivElement | null>(null)
        // 显示弹框
        const tooltipShow = ref(false);

        const bgColor = ref("#ffff");
        // 方向
        const placements = ref("bottom");


        onMounted(() => {
            if (tooltipShow.value) {
                positionElement(referenceSlotRef.value!.firstElementChild, placements.value)
            }

        })
        const referenceSlot = () => {
            return h(slots!.reference, { ref: testRef })
        }
        // 显示
        function showTip() {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            tooltipShow.value = true;
            setTimeout(() => {
                positionElement(referenceSlotRef.value!.firstElementChild, placements.value)
            });
        }
        function hiddenTip() {
            timer = setTimeout(() => {
                tooltipShow.value = false;
                timer = null
            }, 300);

        }

        // 位置
        const tooltipPostiton = ref({
            left: 0,
            top: 0,
        });
        const tooltipStyle = computed<CSSProperties>(() => {
            return {
                left: tooltipPostiton.value.left + "px",
                top: tooltipPostiton.value.top + "px",
                backgroundColor: bgColor.value
            };
        });
        function positionElement(target, placements) {
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
                    if ((window.innerHeight - target_dom.bottom) < el_dom.height) {
                        Placements = 'top'
                    }
                    break;
                case "left":
                    if (target_dom.left < el_dom.width) {
                        Placements = 'right'
                    }
                    break;
                case "right":
                    if ((window.innerWidth - target_dom.right) < el_dom.width) {
                        Placements = 'left'
                    }
                    break;
                default:
                    throw new Error("Invalid direction");
            }

            // tooltipArrow!.className = `a-popover-arrow ${Placements}`

            switch (Placements) {
                case "top":
                    top = target_dom.top - ELDOM.offsetHeight - 5;
                    left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2;
                    break;
                case "bottom":
                    top = target_dom.bottom + 5;
                    left = target_dom.left + (target_dom.width - el_dom.width) / 2;
                    break;
                case "left":
                    top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
                    left = target_dom.left - ELDOM.offsetWidth - 5;
                    break;
                case "right":
                    top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
                    left = target_dom.right + 5;
                    break;
                default:
                    throw new Error("Invalid direction");
            }
            tooltipPostiton.value.top = top
            tooltipPostiton.value.left = left
        }
        return () => (

            <div class="a-popover-content">
                <div class="a-reference" ref={referenceSlotRef} onMouseenter={() => showTip()} onMouseleave={() => hiddenTip()}>
                    {referenceSlot()}
                </div>
                <Teleport to="body">
                    <Transition name="popover" appear>
                        {
                            tooltipShow.value && <div ref={popoverRef} onMouseenter={() => showTip()} onMouseleave={() => hiddenTip()} class="a-popover" style={tooltipStyle.value}>
                                <span class="a-popover-text">
                                    {slots.default && slots.default()}
                                </span>
                                <div
                                    class="a-popover-arrow"
                                    style={{ '--tooltip-bgColor': bgColor.value }}
                                    class={{
                                        'left': placements.value === 'left',
                                        'bottom': placements.value === 'bottom',
                                        'right': placements.value === 'right',
                                        'top': placements.value === 'top',
                                    }}
                                ></div>
                            </div >
                        }
                    </Transition>
                </Teleport>
            </div>


        )
    }
})