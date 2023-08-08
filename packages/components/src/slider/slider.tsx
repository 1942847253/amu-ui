import { computed, defineComponent, onMounted, ref, watch } from "vue";
import ATolltip from '../tooltip'
import './style/index.less'

export default defineComponent({
    name: 'ASlider',
    props: {
        modelValue: {
            type: Number,
            default: 0
        }
    },
    emits: [],
    directives: {
        ATolltip
    },
    setup(props, { slots }) {
        const barRef = ref<HTMLDivElement>();
        const sliderBarRef = ref<HTMLDivElement>();
        const buttonWrapperRef = ref<HTMLDivElement>()
        const buttonRef = ref<HTMLDivElement>()
        const initialX = ref(0);
        const isDrag = ref(false)
        const barWidth = ref(0)
        const positionValue = ref(0)
        const ModelValue = computed(() => {
            return Math.round((positionValue.value / barWidth.value) * 100)
        })

        onMounted(() => {
            barWidth.value = barRef.value!.offsetWidth
            positionValue.value = (props.modelValue / 100) * barWidth.value
            buttonWrapperRef.value!.style.left = positionValue.value + 'px';
            sliderBarRef.value!.style.width = positionValue.value + 'px';
        })
        const onMousedown = (event: MouseEvent) => {
            event.preventDefault();
            initialX.value = event.clientX;
            document.addEventListener('mousemove', drag); // 添加鼠标移动事件监听
            document.addEventListener('mouseup', stopDrag); // 添加鼠标松开事件监听
        }
        const drag = (e: MouseEvent) => {
            isDrag.value = true
            e.preventDefault();
            const barOffsetLeft = barRef.value!.offsetLeft;
            const barWidth = barRef.value!.offsetWidth;
            const isbarRefClientInner = e.clientX >= barOffsetLeft && (e.clientX - barOffsetLeft) <= barWidth;
            if (isDrag.value && isbarRefClientInner) {
                const moveX = e.clientX - initialX.value;
                const currentPosition = buttonWrapperRef.value!.offsetLeft;
                const newPosition = currentPosition + moveX;
                if (Math.abs(newPosition - currentPosition) >= barWidth * 0.01) {
                    positionValue.value = Math.min(
                        Math.max(newPosition, 0),
                        barWidth
                    );
                    buttonWrapperRef.value!.style.left = positionValue.value + 'px';
                    sliderBarRef.value!.style.width = positionValue.value + 'px';

                    initialX.value = e.clientX;
                }
            }
        }

        const stopDrag = () => {
            isDrag.value = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }

        //    const moveMouseIntoSpan = ()=> {
        //         // 获取span相对于parentDiv的位置信息
        //         const spanRect = childSpan.getBoundingClientRect();
        //         const parentRect = childSpan.parentElement.getBoundingClientRect();

        //         // 计算span的中心位置
        //         const spanCenterX = spanRect.left + spanRect.width / 2;
        //         const spanCenterY = spanRect.top + spanRect.height / 2;

        //         // 计算鼠标相对于span中心的偏移量
        //         const offsetX = spanCenterX - parentRect.left;
        //         const offsetY = spanCenterY - parentRect.top;

        //         // 创建一个模拟鼠标事件，将鼠标移动到span的中心位置
        //         const event = new MouseEvent("mousemove", {
        //           clientX: offsetX,
        //           clientY: offsetY,
        //         });
        //         document.dispatchEvent(event);
        //       }
        return () => (
            <div class="a-slider-content">
                <div class="a-slider-runway" ref={barRef}>
                    <div class="a-slider-bar" ref={sliderBarRef}></div>
                    <div v-tooltip_top={ModelValue.value} ref={buttonWrapperRef} style={{}} class="a-slider-button_wrapper" onMousedown={(event) => onMousedown(event)}>
                        <div ref={buttonRef} class="a-slider-button">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})