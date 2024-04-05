import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch } from "vue";
import { AIcon } from "..";
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
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
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

    const setColorState = (color: string, hover: string, active: string, disabled: string) => {
      colorState.color = color;
      colorState.hover = hover;
      colorState.active = active;
    }

    const getButtonColor = () => {
      const { type, disabled, text } = props;

      setColorState(
        typeToVar('color'),
        typeToVar('hover'),
        typeToVar('active'),
        typeToVar('disabled')
      );

      function typeToVar(action: string = '') {
        if (type === 'default') {
          if (disabled && ['color', 'hover'].includes(action)) {
            return 'var(--a-text-color)';
          } else {
            return 'var(--a-primary-color)';
          }
        } else if (text && disabled && ['color', 'hover'].includes(action)) {
          return 'var(--a-text-color)';
        } else {
          const actionSuffix = action === 'color' ? '' : `-${action}`;
          return `var(--a-${type}${actionSuffix}-color)`;
        }
      }
    };

    watch(() => props.type, () => getButtonColor())


    const buttonStyle = computed(() => {
      const {
        dashed,
        text,
        type,
        disabled,
        loading,
        ghost,
        round,
        circle,
        color,
        size
      } = props;

      const buttonColor = (dashed || ghost || text || type === 'default') ? colorState.color : 'var(--a-text-color-white)';
      const buttonBorderColor = disabled ? (type === 'default') ? 'var(--a-border-color)' : colorState.color : colorState.color;
      const buttonBgColor = (dashed || ghost) ? 'var(--a-bg-color)' : colorState.color;
      const buttonHoverColor = disabled ? colorState.color : colorState.hover;
      const buttonRippleColor = (loading || text || disabled) ? '' : color ? color : colorState.color;
      const buttonActiveColor = disabled ? colorState.color : colorState.active;
      const buttonLineType = dashed ? 'dashed' : 'solid';
      const buttonMaskerZIndex = loading || disabled ? '100' : '0';
      const buttonCursorType = disabled ? 'not-allowed' : loading ? 'wait' : '';
      const buttonBorderRadius = round ? '34px' : circle ? '50%' : '3px';
      const selfDefineColor = ghost || text ? color : 'var(--a-text-color-white)'
      const selfDefineBgColor = ghost || text ? 'var(--a-bg-color)' : color
      const selfDefineBorderColor = text ? 'transparent' : color
      const selfDefineFilter = disabled ? 'brightness(1)' : 'brightness(.9)'
      const selfDefineOpacity = disabled ? '0.5' : '0.8'
      const buttonCircleWidth = size === 'default' ? '34px' : size === 'small' ? '28px' : '40px'
      const buttonCircleHeight = size === 'default' ? '34px' : size === 'small' ? '28px' : '40px'
      return {
        '--button-color': buttonColor,
        '--button-border-color': buttonBorderColor,
        '--button-bg-color': buttonBgColor,
        '--button-hover-color': buttonHoverColor,
        '--button-ripple-color': buttonRippleColor,
        '--button-active-color': buttonActiveColor,
        '--button-line-type': buttonLineType,
        '--button-masker-zIndex': buttonMaskerZIndex,
        '--button-cursor-type': buttonCursorType,
        '--button-border-radius': buttonBorderRadius,
        // 自定义按钮颜色
        '--button-self-define-filter': selfDefineFilter,
        '--button-self-define-opacity': selfDefineOpacity,
        '--button-self-define-color': selfDefineColor,
        '--button-self-define-bg-color': selfDefineBgColor,
        '--button-self-define-border-color': selfDefineBorderColor,
        // 圆形按钮宽高
        '--button-circle-width': buttonCircleWidth,
        '--button-circle-height': buttonCircleHeight,
      };
    });


    const iconSlotRender = () => {
      if (props.loading) {
        return <div class="is-loading"><AIcon class="a-loading-icon" name="loading" /></div>
      } else {
        if (slots.icon) {
          return <>{slots.icon()}</>
        } else if (props.icon) {
          return <AIcon name={props.icon} />
        }
      }
    }

    const getButtonClasses = () => {
      const { type, dashed, text, ghost, disabled, circle, color } = props
      return [
        'a-button',
        getButtonSize(),
        type === 'default' ? 'bg-default' : '',
        dashed || text || ghost ? '' : 'a-solid-button',
        text ? 'bg-text' : '',
        disabled ? 'bg-disabled' : '',
        color ? 'bg-self-define' : '',
        circle ? 'bg-circle' : ''
      ].filter(Boolean)
    };

    getButtonColor()
    return () => (
      <button style={buttonStyle.value} class={getButtonClasses()}>
        <div class="a-button-content">
          {
            (props.loading || props.icon || slots.icon) && (
              <div class='icon-slot-content'>
                {iconSlotRender()}
              </div>
            )
          }
          {slots.default ? slots.default() : ''}
        </div>
        <div onClick={(event) => event.stopPropagation()} class="a-button-masker"></div>
      </button>
    );
  },
});
