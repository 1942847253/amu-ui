import { defineComponent, provide } from "vue";
import './style/index.less'

export default defineComponent({
    name: "ABreadcrumb",
    props: {
        flag: {
            type: String,
            default: '/'
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        provide('flag', props.flag)
        return () => (
            <div class="a-breadcrumb-content">
                {slots.default && slots.default()}
            </div>
        )
    }
})