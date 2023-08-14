import { computed, defineComponent, onMounted, ref, watch, nextTick } from "vue";
import ATolltip from '../tooltip'
import AInputNumber from "@components/input-number/input-number";
import './style/index.less'


export default defineComponent({
    name: 'ASlider',
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        },
        showStops: {
            type: Boolean,
            default: false
        },
        showInput: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change'],
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
        const stepProportion = computed(() => barWidth.value * (props.step / 100))
        const inputNumberValue = ref(ModelValue.value)

        watch(ModelValue, (modelValue) => {
            if (modelValue !== props.modelValue) {
                emit('update:modelValue', modelValue)
                emit('change', modelValue)
            }
        })

        watch(() => props.modelValue, () => {
            initSliderPosition()
        })

        watch(() => inputNumberValue.value, (val) => {
            if (val !== props.modelValue) {
                emit('update:modelValue', val)
                emit('change', val)
                initSliderPosition()
            }
        })
        onMounted(() => {
            nextTick(() => {
                initSliderPosition()
            })
        })

        const initSliderPosition = () => {
            barWidth.value = barRunwayRef.value!.offsetWidth
            positionValue.value = (props.modelValue / 100) * barWidth.value
            buttonWrapperRef.value!.style.left = positionValue.value + 'px';
            sliderBarRef.value!.style.width = positionValue.value + 'px';
            inputNumberValue.value = ModelValue.value
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
            const offsetLeft = barRunwayRef.value!.getBoundingClientRect().left
            const pval = findNearestDivisible(event.clientX - offsetLeft, stepProportion.value);
            positionValue.value = pval;
            buttonWrapperRef.value!.style.left = positionValue.value + 'px';
            sliderBarRef.value!.style.width = positionValue.value + 'px';
        }
        const drag = (e: MouseEvent) => {
            e.preventDefault();
            isDrag.value = true
            let flag = e.clientX < initialX.value ? 'left' : 'right'
            const barRunwayRect = barRunwayRef.value!.getBoundingClientRect()
            const barOffsetLeft = barRunwayRect.left;
            const barWidth = barRunwayRect.width;
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
                if (Math.abs(newPosition - currentPosition) >= barWidth * (props.step / 100)) {
                    const pval = Math.min(
                        Math.max(newPosition, 0),
                        barWidth
                    );
                    positionValue.value = findNearestDivisible(pval, stepProportion.value)
                    buttonWrapperRef.value!.style.left = positionValue.value + 'px';
                    sliderBarRef.value!.style.width = positionValue.value + 'px';
                    initialX.value = e.clientX;
                }
            }
        }

        const findNearestDivisible = (number: number, divisor: number) => {
            const remainder = number % divisor;
            if (remainder === 0) {
                return number; // 当前数已经可以被取模数整除
            } else {
                const lowerBound = number - remainder; // 下界
                const upperBound = lowerBound + divisor; // 上界
                // 找到最近的一个能被取模数整除的数
                if (number - lowerBound <= upperBound - number) {
                    return lowerBound;
                } else {
                    return upperBound;
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
                { }
                <div class="a-slider-runway" style={{ marginRight: props.showInput ? '30px' : '' }} ref={barRunwayRef} onMousedown={(event) => onMousedownRunway(event)}>
                    <div class="a-slider-stop-list">
                        {
                            props.showStops && Array.from({ length: findNearestDivisible(barWidth.value / stepProportion.value, 1) }).map((_, index) => (
                                <div class="stop-item" style={{ left: (stepProportion.value * index + 1) + 'px' }}></div>
                            ))
                        }
                    </div>
                    <div class="a-slider-bar" ref={sliderBarRef}></div>
                    <div class="a-slider-button_wrapper" v-tooltip_top={ModelValue.value} ref={buttonWrapperRef} onMousedown={(event) => onMousedownButton(event)}>
                        <div ref={buttonRef} class="a-slider-button">
                        </div>
                    </div>
                </div>
                {
                    props.showInput && <AInputNumber v-model={inputNumberValue.value} width={100} max={100} min={0} step={props.step} />
                }
            </div>
        )
    }
})