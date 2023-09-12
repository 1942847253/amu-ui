import { defineComponent } from "vue";

export default defineComponent({
    name: 'ADropdown',
    setup(props, { emit, slots }) {
        const defaultSlotJSX = () => {
            return slots.default ? slots.default() : ''
        }
        const dropdownSlotJSX = () => {
            return slots.dropdown ? slots.dropdown() : ''
        }
        return () => (
            <div class="a-dropdown-item">
                <div class="slot-default">{defaultSlotJSX()}</div>
                <div class="slot-dropdown">{dropdownSlotJSX()}</div>
            </div>
        )
    }
})