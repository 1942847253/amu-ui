import { defineComponent, inject } from "vue";
import './style/index.less'

export default defineComponent({
    name: "ABreadcrumbItem",
    props: {
        path: {
            type: String,
            default: ''
        }
    },
    emits: ['pathClick'],
    setup(props, { emit, slots }) {
        const flag = inject<string>('flag', '/')
        const isRouter = inject<boolean>('isRouter', false)
        const pathClick = inject<Function>('pathClick', () => { })
        const defaultSlot = () => {
            if (slots.default) {
                return slots.default()
            } else {
                return ''
            }
        }

        const onPathClick = () => {
            pathClick(props.path)
        }
        return () => (
            <div class="a-breadcrumb-item">
                <span class={'title-href'} onClick={() => onPathClick()}>{defaultSlot()}</span>
                <span class="flag">{flag}</span>
            </div>
        )
    }
})