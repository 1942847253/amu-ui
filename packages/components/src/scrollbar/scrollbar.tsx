import { PropType, computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import "./style/index.less";

export default defineComponent({
    name: "AScrollbar",
    emits: [],
    props: {
        trigger: {
            type: String as PropType<"hover" | "none">,
            default: "hover",
        },
        xScrollable: {
            type: Boolean,
            default: false,
        },
        onScroll: {
            type: Function as PropType<(e: Event) => void>,
        },
        size: Number,
    },
    setup(props, { emit, slots }) {
        const scrollContainerRef = ref<HTMLDivElement>();

        const scrollbarRailVerticalRef = ref<HTMLDivElement>();
        const scrollbarVerticalRef = ref<HTMLDivElement>();

        const scrollbarRailHorizontalRef = ref<HTMLDivElement>();
        const scrollbarHorizontalRef = ref<HTMLDivElement>();

        const isDragging = ref(false);
        const isMouseInContainer = ref(false)
        const showScrollbarVertical = ref(true)
        const showScrollbarHorizontal = ref(true)

        const startY = ref(0);
        const startTop = ref(0);
        const startX = ref(0);
        const startLeft = ref(0)

        const currentScrollbar = ref<'vertical' | 'horizontal'>('vertical')

        onMounted(() => {
            initScrollBarXY()
            document.addEventListener("mousemove", onScrollbarMove);
            document.addEventListener("mouseup", onScrollbarUp);
        });

        onUnmounted(() => {
            document.removeEventListener('mousemove', onScrollbarMove)
            document.removeEventListener('mouseup', onScrollbarUp)
        })

        const initScrollBarXY = () => {
            initScrollBarYHeight()
            initScrollBarXWidth()
        }

        const initScrollBarYHeight = () => {
            const { clientHeight, scrollHeight } = scrollContainerRef.value!;
            if (clientHeight === scrollHeight) {
                showScrollbarVertical.value = false;
                return
            };
            const scrollbarHeight = (clientHeight / scrollHeight) * 100 + "%";
            scrollbarVerticalRef.value!.style.height = scrollbarHeight;
        }

        const initScrollBarXWidth = () => {
            if (props.xScrollable) {
                const { clientWidth, scrollWidth } = scrollContainerRef.value!;
                if (clientWidth === scrollWidth) {
                    showScrollbarHorizontal.value = false;
                    return
                };
                const initScrollBarXWidth = (clientWidth / scrollWidth) * 100 + "%";
                scrollbarHorizontalRef.value!.style.width = initScrollBarXWidth;
            }
        }

        const onscrollContainerScroll = (event: UIEvent) => {
            const scrollContainer = scrollContainerRef.value;
            const scrollbarVerticalRail = scrollbarRailVerticalRef.value;
            const scrollbarVertical = scrollbarVerticalRef.value;
            props.onScroll && props.onScroll(event)
            if (!scrollContainer || !scrollbarVerticalRail || !scrollbarVertical) return;
            const scrollPercentage = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight);
            const railHeight = scrollbarVerticalRail.clientHeight;
            const scrollbarHeight = scrollbarVertical.clientHeight;
            const newTop = scrollPercentage * (railHeight - scrollbarHeight);
            scrollbarVertical.style.top = `${newTop}px`;
        };

        const onScrollbarDown = (event: MouseEvent, type: 'vertical' | 'horizontal') => {
            currentScrollbar.value = type
            isDragging.value = true;
            if (type === 'vertical') {
                startY.value = event.clientY;
                startTop.value = scrollbarVerticalRef.value!.offsetTop;
            } else {
                startX.value = event.clientX
                startLeft.value = scrollbarHorizontalRef.value!.offsetLeft
            }
        };

        const onScrollbarMove = (event: MouseEvent) => {
            if (!isDragging.value) return
            const scrollContainer = scrollContainerRef.value!;
            if (currentScrollbar.value === 'vertical') {
                const scrollbarVerticalRail = scrollbarRailVerticalRef.value!;
                const scrollbarVertical = scrollbarVerticalRef.value!;
                const containerHeight = scrollContainer.clientHeight;

                const deltaY = event.clientY - startY.value;
                const railHeight = scrollbarVerticalRail.clientHeight;
                const newTop = Math.min(Math.max(0, startTop.value + deltaY), railHeight - scrollbarVertical.clientHeight);
                const scrollPercentage = newTop / (railHeight - scrollbarVertical.clientHeight);
                // 避免在每次事件触发时都重新计算scrollHeight和clientHeight
                const maxScroll = scrollContainer.scrollHeight - containerHeight;
                // 减少不必要的查询
                if (scrollContainer.scrollTop !== scrollPercentage * maxScroll) {
                    scrollContainer.scrollTop = scrollPercentage * maxScroll;
                }
                scrollbarVertical.style.top = `${newTop}px`;
            } else {
                const scrollbarRailHorizontal = scrollbarRailHorizontalRef.value!;
                const scrollbarHorizontal = scrollbarHorizontalRef.value!;
                const containerWidth = scrollContainer.clientWidth;

                const dataX = event.clientX - startX.value;
                const railWidth = scrollbarRailHorizontal.clientWidth;
                const newLeft = Math.min(Math.max(0, startLeft.value + dataX), railWidth - scrollbarHorizontal.clientWidth);
                const scrollPercentage = newLeft / (railWidth - scrollbarHorizontal.clientWidth);
                // 避免在每次事件触发时都重新计算scrollHeight和clientHeight
                const maxScroll = scrollContainer.scrollWidth - containerWidth;
                // 减少不必要的查询
                if (scrollContainer.scrollLeft !== scrollPercentage * maxScroll) {
                    scrollContainer.scrollLeft = scrollPercentage * maxScroll;
                }
                scrollbarHorizontal.style.left = `${newLeft}px`;
            }
        };

        const onScrollbarUp = () => {
            isDragging.value = false;
            if (!isMouseInContainer.value && props.trigger !== 'none') {
                if (props.xScrollable) {
                    scrollbarRailHorizontalRef.value!.style.opacity = '0';
                } else {
                    scrollbarRailVerticalRef.value!.style.opacity = '0';
                }
            }
        };

        const onMouseenterScrollContainer = () => {
            if (props.trigger === 'none') return
            isMouseInContainer.value = true
            if (showScrollbarVertical.value) { scrollbarRailVerticalRef.value!.style.opacity = '1' };
            if (showScrollbarHorizontal.value && props.xScrollable) {
                scrollbarRailHorizontalRef.value!.style.opacity = '1'
            }
        }

        const onMouseleaveScrollContainer = () => {
            if (props.trigger === 'none') return
            isMouseInContainer.value = false
            if (!isDragging.value) {
                if (showScrollbarVertical.value) { scrollbarRailVerticalRef.value!.style.opacity = '0' };
                if (showScrollbarHorizontal.value && props.xScrollable) {
                    scrollbarRailHorizontalRef.value!.style.opacity = '0'
                }
            }
        }

        return () => (
            <div class="a-scrollbar"
                onMouseenter={onMouseenterScrollContainer}
                onMouseleave={onMouseleaveScrollContainer}>
                <div
                    class="a-scrollbar-container"
                    ref={scrollContainerRef}
                    onScroll={(event) => onscrollContainerScroll(event)}
                >
                    <div class="a-scrollbar-content" style={{ width: props.xScrollable ? 'fit-content' : 'none' }}>
                        {slots.default && slots.default()}
                    </div>
                </div>
                {
                    showScrollbarVertical.value && (
                        <div ref={scrollbarRailVerticalRef}
                            class={["a-scrollbar-rail", 'a-scrollbar-rail--vertical']}
                            style={{ opacity: props.trigger === 'hover' ? 0 : 1 }}
                        >
                            <div class="a-scrollbar-rail__scrollbar" ref={scrollbarVerticalRef} onMousedown={(event) => onScrollbarDown(event, 'vertical')}></div>
                        </div>
                    )
                }
                {
                    props.xScrollable && showScrollbarHorizontal.value && (
                        <div ref={scrollbarRailHorizontalRef}
                            class={["a-scrollbar-rail", 'a-scrollbar-rail--horizontal']}
                            style={{ opacity: props.trigger === 'hover' ? 0 : 1 }}
                        >
                            <div class="a-scrollbar-rail__scrollbar" ref={scrollbarHorizontalRef} onMousedown={(event) => onScrollbarDown(event, 'horizontal')}></div>
                        </div>
                    )
                }
            </div>
        );
    },
});
