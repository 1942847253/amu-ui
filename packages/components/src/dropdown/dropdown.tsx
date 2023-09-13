import { defineComponent, onMounted, provide, ref } from "vue";
import { APopover } from "..";
import './style/index.less'

export default defineComponent({
    name: 'ADropdown',
    emits: ['command'],
    setup(props, { emit, slots }) {
        const popoverRef = ref()
        const defaultSlotJSX = () => {
            return slots.default ? slots.default() : ''
        }
        const dropdownSlotJSX = () => {
            return slots.dropdown ? slots.dropdown() : ''
        }
        const onClickDropdownItem = (command: string | number | object) => {
            emit('command', command)
            popoverRef.value.hiddenPopover()
        }
        provide('on-click-dropdown-item', onClickDropdownItem)

        return () => (
            <div class="a-dropdown">
                <APopover trigger="click" width="max-content" padding="0" ref={popoverRef}>
                    {{
                        default: () => <div class="slot-dropdown">{dropdownSlotJSX()}</div>,
                        reference: () => defaultSlotJSX(),
                    }}
                </APopover>
            </div>
        )
    }
})