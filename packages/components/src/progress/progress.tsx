import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { AIcon } from "../icon";
import './style/index.less'

interface ICustomColors {
    color: string
    percentage: number
}

export default defineComponent({
    name: 'AProgress',
    props: {
        percentage: {
            type: Number,
            default: 0,
            required: true
        },
        format: Function,
        status: {
            type: String as PropType<'success' | 'prompt' | 'error'>
        },
        color: {
            type: [String, Array] as PropType<string | ICustomColors[]>,
            default: "var(--a-primary-color)"
        },
        textInside: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: Number,
            default: 6
        },
    },
    emits: [],
    setup(props, { emit }) {
        const progressBarRunwayRef = ref<null | HTMLDivElement>(null)
        const Percentage = computed(() => {
            if (props.percentage <= 0) {
                return 0
            }
            if (props.percentage >= 100) {
                return 100
            }
            return props.percentage
        })

        const isTextWidthEnough = computed(() => {
            let textMaxWidth = 31.79;
            const percentageBarNumber = (progressBarRunwayRef.value?.offsetWidth || 0) * (Percentage.value / 100);
            if (percentageBarNumber > textMaxWidth) {
                return true
            } else {
                return false
            }
        })

        const bgColor = computed(() => {
            if (props.status) {
                if (props.status === 'success') {
                    return 'var(--a-success-color)'
                } else if (props.status === 'prompt') {
                    return 'var(--a-warning-color)'
                } else if (props.status === 'error') {
                    return 'var(--a-error-color)'
                }
            } else {
                return props.color
            }

        })

        const computedRightPercentageText = computed(() => {
            if (props.format) {
                return props.format(props.percentage)
            } else if (props.status && !props.textInside) {
                // @ts-ignore
                return <AIcon name={props.status} style={{ color: bgColor.value, fontSize: '16px' }} />
            } else {
                return Percentage.value + '%'
            }
        })

        const findValue = (percent: number, colorArr: ICustomColors[]) => {
            let result = '';
            for (let i = 0; i < colorArr.length; i++) {
                const { color, percentage } = colorArr[i];
                if (percent <= percentage) {
                    result = color;
                    break;
                }
            }
            return result;
        }

        const progressBarStyle = computed(() => {
            let backgroundColor = ''
            if (Array.isArray(bgColor.value)) {
                backgroundColor = findValue(Percentage.value, bgColor.value)
            } else {
                backgroundColor = bgColor.value!
            }
            return {
                width: Percentage.value + '%',
                backgroundColor,
            }
        })

        return () => (
            <div class="a-progress-content">
                <div class="a-progress-runway" ref={progressBarRunwayRef} style={{ height: props.strokeWidth + 'px' }}>
                    <div class="a-progress-bar" style={progressBarStyle.value}>
                        {props.textInside && isTextWidthEnough.value && <div class="a-percentage-inner-text"><span>{computedRightPercentageText.value}</span></div>}
                    </div>
                    {props.textInside && !isTextWidthEnough.value && <div class="a-percentage-outer-text" style={{ marginLeft: Percentage.value + '%' }}>{computedRightPercentageText.value}</div>}
                </div>
                {
                    !props.textInside && <div class="a-percentage-text">
                        <span>{computedRightPercentageText.value}</span>
                    </div>
                }
            </div>
        )
    }
})

