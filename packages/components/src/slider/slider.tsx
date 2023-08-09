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
    emits: ['update:modelValue'],
    directives: {
        ATolltip
    },
    setup(props, { slots, emit }) {
        const barRunwayRef = ref<HTMLDivElement>();
        const sliderBarRef = ref<HTMLDivElement>();
        const buttonWrapperRef = ref<HTMLDivElement>()
        const buttonRef = ref<HTMLDivElement>()
        const initialX = ref(0);
        const isDrag = ref(false)
        const barWidth = ref(0)
        const positionValue = ref(0)
        const ModelValue = computed(() => Math.round((positionValue.value / barWidth.value) * 100))

        watch(ModelValue, (modelValue) => {
            if (modelValue !== props.modelValue) {
                emit('update:modelValue', modelValue)
            }
        })

        watch(() => props.modelValue, () => {
            initSliderPosition()
        })
        onMounted(() => {
            initSliderPosition()
        })

        const initSliderPosition = () => {
            barWidth.value = barRunwayRef.value!.offsetWidth
            positionValue.value = (props.modelValue / 100) * barWidth.value
            buttonWrapperRef.value!.style.left = positionValue.value + 'px';
            sliderBarRef.value!.style.width = positionValue.value + 'px';
        }
        const onMousedownButton = (event: MouseEvent) => {
            event.stopPropagation()
            event.preventDefault();
            initialX.value = event.clientX;
            document.addEventListener('mousemove', drag); // 添加鼠标移动事件监听
            document.addEventListener('mouseup', stopDrag); // 添加鼠标松开事件监听
        }
        const onMousedownRunway = (event: MouseEvent) => {
            initialX.value = event.clientX;
            positionValue.value = event.clientX - barRunwayRef.value!.offsetLeft;
            buttonWrapperRef.value!.style.left = positionValue.value + 'px';
            sliderBarRef.value!.style.width = positionValue.value + 'px';
        }
        const drag = (e: MouseEvent) => {
            e.preventDefault();
            isDrag.value = true
            let flag = e.clientX < initialX.value ? 'left' : 'right'
            const barOffsetLeft = barRunwayRef.value!.offsetLeft;
            const barWidth = barRunwayRef.value!.offsetWidth;
            const isbarRefClientInner = e.clientX >= barOffsetLeft && (e.clientX - barOffsetLeft) <= barWidth
            const isDragAndValidPosition = isDrag.value && (
                isbarRefClientInner ||
                (flag === 'left' && ModelValue.value > 0) ||
                (flag === 'right' && ModelValue.value < 100)
              );
            if (isDragAndValidPosition) {
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

        return () => (
            <div class="a-slider-content">
                <div class="a-slider-runway" ref={barRunwayRef} onMousedown={(event) => onMousedownRunway(event)}>
                    <div class="a-slider-bar" ref={sliderBarRef}></div>
                    <div class="a-slider-button_wrapper" v-tooltip_top={ModelValue.value} ref={buttonWrapperRef} onMousedown={(event) => onMousedownButton(event)}>
                        <div ref={buttonRef} class="a-slider-button">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})