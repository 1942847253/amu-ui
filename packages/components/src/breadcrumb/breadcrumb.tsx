import { defineComponent, provide } from "vue";
import './style/index.less'

export default defineComponent({
    name: "ABreadcrumb",
    props: {
        flag: {
            type: String,
            default: '/'
        },
        isRouter: {
            type: Boolean,
            default: false
        }
    },
    emits: ['pathClick'],
    setup(props, { emit, slots }) {
        provide<string>('flag', props.flag);
        provide<boolean>('isRouter', props.isRouter);
        const pathClick = (path: string) => {
            emit('pathClick', path)
        }
        provide<Function>('pathClick', pathClick);
        return () => (
            <div class="a-breadcrumb-content">
                {slots.default && slots.default()}
            </div>
        )
    }
})