import { computed, defineComponent, PropType } from "vue";
import './style/index.less'

type TSpaceSize = 'small' | 'default' | 'large' | number

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
        return () => (
            <div class="a-space" style={{ '--a-gap-number': flexGap.value }}>
                {slots.default && slots.default()}
            </div>
        )
    }
})