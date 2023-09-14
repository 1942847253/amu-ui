import { PropType, defineComponent, onMounted, provide, ref } from "vue";
import { AButton, AIcon, APopover } from "..";
import './style/index.less'

export default defineComponent({
    name: 'ADropdown',
    props: {
        trigger: {
            type: String as PropType<'hover' | 'click'>,
            default: 'hover'
        },
        hideOnClick: {
            type: Boolean,
            default: true
        },
        splitButton: {
            type: Boolean,
            default: false
        },
        type: {
            type: String as PropType<'primary' | 'success' | 'danger' | 'warning' | 'info' | 'default'>,
            default: 'primary'
        },
        placement: {
            type: String as PropType<'top' | 'left' | 'bottom' | 'right'>,
            default: 'bottom'
        },
    },
    emits: ['command', 'click'],
    setup(props, { emit, slots }) {
        const popoverRef = ref()
        const defaultSlotJSX = () => {
            return slots.default ? slots.default() : ''
        }
        const dropdownSlotJSX = () => {
            return slots.dropdown ? slots.dropdown() : ''
        }

        const defaultDropdownRender = () => {
            return <APopover placement={props.placement} trigger={props.trigger} width="max-content" padding="0" ref={popoverRef}>
                {{
                    default: () => <div class="slot-dropdown">{dropdownSlotJSX()}</div>,
                    reference: () => defaultSlotJSX(),
                }}
            </APopover>
        }
        const onClickDropdownItem = (command: string | number | object) => {
            emit('command', command)
            props.hideOnClick && popoverRef.value.hiddenPopover()
        }
        provide('on-click-dropdown-item', onClickDropdownItem)

        return () => (
            <div class="a-dropdown">
                {
                    props.splitButton ? (
                        <div class="split-button-content">
                            <div onClick={() => emit('click')}><AButton class="left" type={props.type}>{slots.default && slots.default()}</AButton></div>
                            <APopover placement={props.placement} trigger={props.trigger} width="max-content" padding="0" ref={popoverRef}>
                                {{
                                    default: () => <div class="slot-dropdown">{dropdownSlotJSX()}</div>,
                                    reference: () => <AButton class="right" type={props.type}><AIcon name="arrow-down" /></AButton>,
                                }}
                            </APopover>
                        </div>
                    ) : defaultDropdownRender()
                }

            </div>
        )
    }
})