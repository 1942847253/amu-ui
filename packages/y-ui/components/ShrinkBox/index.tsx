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
    contentClass: String,
  },
  setup(props, { emit, slots }) {
    const shrinkRef = ref<null | HTMLDivElement>(null);
    onMounted(() => {
      initOutClick();
      props.shrinkViewSwitch!(shrinkViewConfigSwitch);
    });

    const initOutClick = () => {
      const target = document.querySelector(`.${props.contentClass}`) as HTMLElement;
      onClickOutside(target, () => {
        shrinkViewConfigSwitch(EShrinkFlag.COLSE, 0.2);
      });
    };

    const shrinkViewConfigSwitch = (num: number, speed: number) => {
      shrinkRef.value!.style.transition = `all ${speed}s ease`
      shrinkRef.value!.style.transform = `scaleY(${num})`;
    };
    return () => (
      <div ref={shrinkRef} class="y-shrink-box">
        {slots.default!()}
      </div>
    )
  },
});
