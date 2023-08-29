import { CSSProperties, computed, defineComponent, ref, Transition, watch, onMounted, Teleport, h } from "vue";
import './style/index.less'

export default defineComponent({
    name: "APopover",
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        const testRef = ref(null)
        // 显示弹框
        const tooltipShow = ref(props.visible);

        const bgColor = ref("#ffff");
        // 方向
        const placements = ref("bottom");

        watch(() => props.visible, (val) => {
            tooltipShow.value = val
        })

        onMounted(() => {
            console.log(testRef.value.nextSibling);
        })

        const referenceSlot = () => {
            return h(slots!.reference, { ref: testRef })
        }
        // 显示
        function showTip() {
            tooltipShow.value = true;
        }
        function hiddenTip() {
            tooltipShow.value = false;
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
        return () => (

            <div>
                <div class="reference">
                    {referenceSlot()}
                </div>
                <Teleport to="body">
                    <Transition name="popover" appear>
                        <div class="a-popover" style={tooltipStyle.value} v-show={tooltipShow.value}>
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
                    </Transition>
                </Teleport>
            </div>


        )
    }
})