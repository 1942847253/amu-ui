import { defineComponent, inject } from "vue";
import './style/index.less'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "ABreadcrumbItem",
    props: {
        path: {
            type: String,
            default: ''
        }
    },
    emits: [],
    setup(props, { emit, slots }) {
        const flag = inject<string>('flag', '/')
        const defaultSlot = () => {
            if (slots.default) {
                return slots.default()
            } else {
                return ''
            }
        }
        return () => (
            <div class="a-breadcrumb-item">
                <span class={`${props.path === "" ? 'title' : 'title-href'}`}>{defaultSlot()}</span>
                <span class="flag">{flag}</span>
            </div>
        )
    }
})