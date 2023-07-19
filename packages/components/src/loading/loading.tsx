import { computed, defineComponent, watch, StyleValue, ref } from "vue";
import Transition from "../transition/transition";
import "./style/index.less";

export default defineComponent({
  name: "ALoading",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    global: {
      type: Boolean,
      default: true,
    },
  },
  emits: [],
  setup(props, { emit, slots }) {
    const dotList = new Array(6).fill(NaN);
    const isGlobalLoading = computed(
      () =>
        props.global && (!slots.default || typeof slots.default !== "function")
    );
    const showLoadingMask = computed(
      () => !isGlobalLoading.value && props.modelValue
    );
    const maskRef = ref<HTMLDivElement | null>(null);
    const isMaskClosed = ref(false);

    watch(
      () => props.modelValue,
      (visible) => {
        changeMaskStatus(visible)
      }
    );

    const changeMaskStatus = (visible: boolean) => {
      if (visible) {
        maskRef.value!.style.opacity = "1";
        if (isGlobalLoading.value) document.body.style.overflow = "hidden";
      } else {
        isGlobalLoading.value && (maskRef.value!.style.opacity = "0");
        document.body.style.removeProperty("overflow");
      }
      setTimeout(
        () => {
          isMaskClosed.value = visible;
        },
        visible ? 0 : 500
      );
    }

    const loadingContentStyle = computed<StyleValue>(() => {
      return {
        position: isGlobalLoading.value ? "relative" : "absolute",
        left: isGlobalLoading.value ? "0" : "40%",
        zIndex: isGlobalLoading.value ? 9999 : 101
      };
    });

    const loadingSlotJSX = () => {
      return (
        <div
          v-show={props.modelValue}
          class="a-loading-content"
          style={loadingContentStyle.value}
        >
          <div class="a-chase">
            {dotList.map(() => (
              <div class="a-chase-dot"></div>
            ))}
          </div>
          <div class="a-title">{props.title}</div>
        </div>
      );
    };

    return () => (
      <Transition>
        <div
          v-show={isGlobalLoading.value ? props.modelValue ? true : false : (slots.default && typeof slots.default === 'function' ? true : false)}
          ref={maskRef}
          class={`a-loading ${isGlobalLoading.value && "a-global"
            }`}
          style={{ position: isGlobalLoading.value ? "fixed" : "relative" }}
        >
          {loadingSlotJSX()}
          <div class="a-loading-slot">{slots.default && slots.default()}</div>
          {showLoadingMask.value && <div class="a-loading-mask"></div>}
        </div>
      </Transition>
    );
  },
});
