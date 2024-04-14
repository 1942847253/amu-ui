import { computed, CSSProperties, defineComponent, PropType } from "vue";
import './style/index.less'

type TSpaceSize = 'small' | 'default' | 'large' | number
type TSpaceAlign = 'start' | 'end' | 'center' | 'baseline'
type TSpaceDirection = 'row' | 'column'

const gapMap = {
    small: '8px',
    default: "12px",
    large: '16px'
}

export default defineComponent({
    name: 'ASpace',
    props: {
        size: {
            type: [String, Number] as PropType<TSpaceSize>,
            default: 'small'
        },
        align: {
            type: String as PropType<TSpaceAlign>,
            default: 'start'
        },
        direction: {
            type: String as PropType<TSpaceDirection>,
            default: 'row'
        }
    },
    emits: [],
    setup(props, { slots, emit }) {
        const flexGap = computed(() => {
            switch (props.size) {
                case 'small':
                case 'default':
                case 'large':
                    return gapMap[props.size]
                default:
                    return props.size + 'px'
            }

        })

        const spaceStyle = computed<CSSProperties>(() => {
            return {
                alignItems: props.align,
                gap: flexGap.value,
                flexDirection: props.direction
            }
        })
        return () => (
            <div class="a-space" style={spaceStyle.value}>
                {slots.default && slots.default()}
            </div>
        )
    }
})