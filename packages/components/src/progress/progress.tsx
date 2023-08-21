import { computed, defineComponent, PropType } from "vue";
import { AIcon } from "../icon";
import './style/index.less'

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
            type: String,
            default: "#0468dc"
        },
        strokeWidth: {
            type: Number,
            default: 6
        },
        textInside: {
            type: Boolean,
            default: false
        }
    },
    emits: [],
    setup(props, { emit }) {
        const Percentage = computed(() => {
            if (props.percentage <= 0) {
                return 0
            }
            if (props.percentage >= 100) {
                return 100
            }
            return props.percentage
        })


        const bgColor = computed(() => {
            if (props.status) {
                if (props.status === 'success') {
                    return '#18a058'
                } else if (props.status === 'prompt') {
                    return '#d69800'
                } else if (props.status === 'error') {
                    return '#e53935'
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

        const progressBarStyle = computed(() => ({ width: Percentage.value + '%', backgroundColor: bgColor.value, }))

        return () => (
            <div class="a-progress-content">
                <div class="a-progress-runway" style={{ height: props.strokeWidth + 'px' }}>
                    <div class="a-progress-bar" style={progressBarStyle.value}>
                        {props.textInside && Percentage.value >= 6 && <div class="a-percentage-inner-text"><span>{computedRightPercentageText.value}</span></div>}
                    </div>
                    {Percentage.value < 6 && <div class="test" style={{ marginLeft: Percentage.value + '%' }}>{computedRightPercentageText.value}</div>}
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