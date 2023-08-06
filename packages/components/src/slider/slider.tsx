import { defineComponent, ref } from "vue";
import './style/index.less'

export default defineComponent({
    name: 'ASlider',
    props: {},
    emits: [],
    setup(props, { slots }) {
        const barRef = ref<HTMLDivElement>();
        const buttonWrapperRef = ref<HTMLDivElement>()
        const buttonRef = ref<HTMLDivElement>()
        const initialX = ref(0);
        const isDrag = ref(false)
        const onMousedown = (event: MouseEvent) => {
            event.preventDefault();
            initialX.value = event.clientX;
            document.addEventListener('mousemove', drag); // 添加鼠标移动事件监听
            document.addEventListener('mouseup', stopDrag); // 添加鼠标松开事件监听
        }
        const drag = (e: MouseEvent) => {
            isDrag.value = true
            e.preventDefault();
            console.log(e.clientX);
            const barOffsetLeft = barRef.value!.offsetLeft;
            const barWidth = barRef.value!.offsetWidth;
            const isbarRefClientInner = e.clientX >= barOffsetLeft && (e.clientX - barOffsetLeft) <= barWidth;
            if (isDrag.value && isbarRefClientInner) {
                // 计算鼠标水平移动距离
                const moveX = e.clientX - initialX.value;
                // 获取当前小圆圈的位置
                const currentPosition = buttonWrapperRef.value!.offsetLeft;
                // 计算新的位置
                const newPosition = Math.min(Math.max(0, currentPosition + moveX), barRef.value!.clientWidth);
                // 设置小圆圈新的位置
                buttonWrapperRef.value!.style.left = newPosition + 'px';
                // 更新初始位置，以便下次移动计算
                initialX.value = e.clientX;
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
                    <div class="a-slider-bar"></div>
                    <div ref={buttonWrapperRef} style={{}} class="a-slider-button_wrapper" onMousedown={(event) => onMousedown(event)}>
                        <div class="a-slider-button">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})