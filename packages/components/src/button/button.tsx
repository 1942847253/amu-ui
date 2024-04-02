import { computed, defineComponent, reactive } from "vue";
import waterRipple from "../../directives/water-ripple";
import "./style/index.less";

export default defineComponent({
  name: "AButton",
  props: {
    type: {
      type: String,
      default: () => "default",
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
      default: false,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    waterRipple,
  },
  setup(props, { slots }) {
    const colorState = reactive({
      color: '',
      hover: '',
      active: '',
    })

    const getButtonSize = () => {
      switch (props.size) {
        case 'small':
          return 'size-s'
        case 'default':
          return 'size-m'
        case 'large':
          return 'size-l'
        default:
          return '';
      }
    }

    const setColorState = (color: string, hover: string, active: string) => {
      colorState.color = color;
      colorState.hover = hover;
      colorState.active = active;
    }

    const getButtonColor = () => {
      const { type } = props;
      setColorState(typeToVar('color'), typeToVar('hover'), typeToVar('active'))
      function typeToVar(action: string = '') {
        if (type === 'default') {
          return `var(--a-primary-color)`
        } else {
          const actionSuffix = action === 'color' ? '' : `-${action}`;
          return `var(--a-${type}${actionSuffix}-color)`;
        }
      }
    }

    getButtonColor()

    const buttonStyle = computed(() => {
      return {
        '--button-color': colorState.color,
        '--button-hover-color': colorState.hover,
        '--button-active-color': colorState.active,
      }
    })
    return () => (
      <button style={buttonStyle.value} class={['a-button', getButtonSize(), props.type === 'default' ? 'bg-default' : '']}>
        <span class="a-button-content">
          {slots.default ? slots.default() : ""}
        </span>
      </button>
    );
  },
});
