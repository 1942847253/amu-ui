import { defineComponent } from "vue";
import './style/index.less'

export default defineComponent({
    name: 'ADropdownMenu',
    setup(props, { emit, slots }) {
        return () => (
            <div class="a-dropdown-menu-content">
                {slots.default && slots.default()}
            </div>
        )
    }
})