import { defineComponent, Transition, computed, type CSSProperties, ref, watch } from 'vue'
import { AmuSpinner } from '../../spinner'
import { loadingProps } from './props'
import './style.css'

export default defineComponent({
  name: 'AmuLoading',
  props: loadingProps,
  setup(props: any, { expose }: any) { // 移除 slots，未用到
    const visible = ref(props.visible)
    const text = ref(props.text)
    const spinner = ref(props.spinner)
    const background = ref(props.background)
    const customClass = ref(props.customClass)
    const fullscreen = ref(props.fullscreen)
    const size = ref(props.size)

    watch(() => props.visible, (val) => visible.value = val)
    watch(() => props.text, (val) => text.value = val)
    watch(() => props.spinner, (val) => spinner.value = val)
    watch(() => props.background, (val) => background.value = val)
    watch(() => props.customClass, (val) => customClass.value = val)
    watch(() => props.fullscreen, (val) => fullscreen.value = val)
    watch(() => props.size, (val) => size.value = val)

    const spinnerStyle = computed<CSSProperties>(() => {
      return {
        background: background.value
      }
    })

    const classes = computed(() => {
      return [
        'amu-loading-mask',
        customClass.value,
        { 'is-fullscreen': fullscreen.value }
      ]
    })

    const renderSpinner = () => {
      if (spinner.value) {
        return spinner.value
      }
      let s = size.value
      if (typeof s === 'string' && /^\d+$/.test(s)) {
          s = Number(s)
      }
      return <AmuSpinner size={s} />
    }
    
    const setText = (val: string) => {
        text.value = val
    }

    expose({
        visible,
        setText
    })

    return () => (
      <Transition name="amu-loading-fade">
        <div
          v-show={visible.value}
          class={classes.value}
          style={spinnerStyle.value}
        >
          <div class="amu-loading-spinner">
            {renderSpinner()}
            {text.value && <p class="amu-loading-text">{text.value}</p>}
          </div>
        </div>
      </Transition>
    )
  }
})
