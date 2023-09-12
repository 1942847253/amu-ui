import { defineComponent } from "vue";

export default defineComponent({
    name: 'ADropdownItem',
    setup(props, { emit }) {
        return () => (
            <div>ADropdownItem</div>
        )
    }
})