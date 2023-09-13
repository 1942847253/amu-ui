import { defineComponent, inject, Component, PropType } from "vue";
import { AIcon } from "..";
import './style/index.less'

export default defineComponent({
    name: 'ADropdownItem',
    props: {
        command: [String, Number, Object],
        disabled: {
            type: Boolean,
            default: false
        },
        divided: {
            type: Boolean,
            default: false
        },
        icon: [String, Object] as PropType<string | Component>
    },
    setup(props, { emit, slots }) {
        const onClickDropdownItem = inject('on-click-dropdown-item', (command: string | number | object) => { })

        const slotIconJSX = () => {
            if (typeof props.icon === 'string') {
                return <AIcon name={props.icon} />
            } else if (typeof props.icon === 'object') {
                return props.icon
            } else {
                return ''
            }
        }
        return () => (
            <div class={`a-dropdown-item ${props.disabled && 'disable'}`} onClick={() => !props.disabled && onClickDropdownItem(props.command!)}>
                <div style={{ marginRight: '5px' }}>{slotIconJSX()}</div> {slots.default && slots.default()}
            </div>
        )
    }
})