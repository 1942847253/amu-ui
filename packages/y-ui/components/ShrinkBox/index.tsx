import { defineComponent, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import './index.scss';

export enum EShrinkFlag {
  COLSE = 0,
  OPEN = 1,
}

export default defineComponent({
  name: "YShrinkBox",
  props: {
    shrinkViewSwitch: Function,
    contentID: String,
    zIndex: {
      type: String,
      default: "9999"
    }
  },
  emits: ['shrink'],
  setup(props, { emit, slots }) {
    const shrinkRef = ref<null | HTMLDivElement>(null);
    onMounted(() => {
      initOutClick();
      props.shrinkViewSwitch!(shrinkViewConfigSwitch);
    });

    const initOutClick = () => {
      const target = document.getElementById(`${props.contentID}`) as HTMLElement;
      target && onClickOutside(target, () => {
        shrinkViewConfigSwitch(EShrinkFlag.COLSE, 0.15);
      });
    };

    const shrinkViewConfigSwitch = (num: number, speed: number) => {
      shrinkRef.value!.style.transition = `all 0.2s ease`
      shrinkRef.value!.style.transform = `scaleY(${num})`;
      emit('shrink', num)
    };
    return () => (
      <div ref={shrinkRef} class="y-shrink-box" style={`z-index:${props.zIndex}`}>
        {slots.default!()}
      </div>
    )
  },
});
