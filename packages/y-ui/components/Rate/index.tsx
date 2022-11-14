import { defineComponent, computed, ref, onMounted } from "vue";
import "./index.scss";

export enum EMouseFlag {
  ENTER = "enter",
  CLICK = "click",
}

export enum EIconType {
  STAR_ON = "iconfont icon-xingxing",
  STAR_OFF = "iconfont icon-xingxing1",
}

export default defineComponent({
  name: "YRate",
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: "#f7ba2a",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const rateRef = ref<HTMLDivElement | null>(null);
    const activeStarList = ref<Number[]>([]);

    onMounted(() => {
      initModelValue();
      initIconList();
    });

    const initModelValue = () => {
      for (let i = 0; i < props.modelValue; i++) {
        activeStarList.value.push(i);
      }
    };

    const mouseEnterOrClickStar = (
      node: Event,
      flag: string = EMouseFlag.ENTER
    ) => {
      const nodeIndex = (node.target as HTMLElement).getAttribute("index");
      const startItemList = rateRef.value?.querySelectorAll(
        ".y-rate-item"
      ) as unknown as HTMLDivElement[];
      mouseActionDom(flag, startItemList, Number(nodeIndex));
      flag === EMouseFlag.CLICK && emit("update:modelValue", Number(nodeIndex));
    };

    const mouseActionDom = (
      flag: string,
      startItemList: HTMLDivElement[],
      nodeIndex: number
    ) => {
      flag === EMouseFlag.CLICK && (activeStarList.value = []);
      for (let i = 0; i < startItemList.length; i++) {
        const node = startItemList[i];
        const index = Number(node.getAttribute("index"));
        const icon = node.querySelector(".iconfont")!;
        switch (flag) {
          case EMouseFlag.CLICK:
            if (index <= nodeIndex) {
              activeStarList.value.push(index);
            }
            break;
          case EMouseFlag.ENTER:
            icon.className =
              index <= nodeIndex ? EIconType.STAR_ON : EIconType.STAR_OFF;
            break;
          default:
            break;
        }
      }
    };

    const initIconList = () => {
      const startItemList = rateRef.value!.querySelectorAll(
        ".y-rate-item"
      ) as unknown as HTMLDivElement[];
      startItemList.forEach((node) => {
        const icon = node.querySelector(".iconfont")!;
        const index = Number(node.getAttribute("index"));
        if (activeStarList.value.includes(index)) {
          icon.className = EIconType.STAR_ON;
        } else {
          icon.className = EIconType.STAR_OFF;
        }
      });
    };

    return () => (
      <div
        class="y-rate-content"
        ref={rateRef}
        onMouseleave={() => initIconList()}
      >
        {new Array(props.max).fill("").map((item, index) => {
          return (
            <div
              class="y-rate-item"
              onMouseenter={(e) => mouseEnterOrClickStar(e)}
              onClick={(e) => mouseEnterOrClickStar(e, EMouseFlag.CLICK)}
            >
              <div style={{ color: props.color }} class={`iconfont ${EIconType.STAR_OFF}`}></div>
            </div>
          );
        })}
      </div>
    );
  },
});
