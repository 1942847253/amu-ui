import { defineComponent } from "vue";
import waterRipple from "../../directives/water-ripple";
import './style/index.less';

export default defineComponent({
  name: 'AButton',
  props: {
    type: {
      type: String,
      default: () => "",
    },
    size: {
      type: String,
      default: () => "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    waterRipple,
  },
  setup(props, { slots }) {
    const getButtonType = (type: string) => {
      switch (type) {
        case "primary":
          return "button-primary";
        case "success":
          return "button-success";
        case "danger":
          return "button-danger";
        case "warning":
          return "button-warning";
        case "info":
          return "button-info";
        default:
          return "button-default";
      }
    };

    const getButtonSize = (size: string) => {
      switch (size) {
        case "small":
          return "size-small";
        case "default":
          return "size-default";
        case "large":
          return "size-large";
        default:
          return "size-default";
      }
    };

    const iconSlotJSX = () => {
      return (
        <div class="icon-slot-content">
          {props.loading ? (
            <div class="iconfont icon-loading is-loading"></div>
          ) : (
            slots.icon && <div class="a-icon">{slots.icon()}</div>
          )}
        </div>
      )
    }

    return () => (
      <div class="a-button-content">
        <button
          v-waterRipple={`${props.type === '' ? 'rgba(29, 29, 29, 0.365)' : '#ffffff42'}`}
          disabled={props.disabled}
          class={`${(props.disabled || props.loading) && 'a-button-disabled'} a-button ${getButtonType(props.type)
            } ${getButtonSize(props.size)}`}
        >
          {iconSlotJSX()} {slots.default ? slots.default() : ''}
        </button>
      </div>
    )
  },
});
