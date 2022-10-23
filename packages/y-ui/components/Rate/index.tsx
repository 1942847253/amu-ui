import { defineComponent, computed, ref, onMounted } from "vue";
import "./index.scss";

export enum EMouseFlag {
  ENTER = "enter",
  LEAVE = "leave",
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
  },
  emits: [],
  setup(props) {
    const rateRef = ref<HTMLDivElement | null>(null);
    const getStartIcon = () => {
      return "icon-xingxing1";
    };

    onMounted(() => {
      console.log(rateRef.value);
    });

    const mouseEnterStar = (node: Event) => {
      const nodeIndex = Number(
        (node.target as HTMLElement).getAttribute("index")
      );
      const startItemList = rateRef.value?.querySelectorAll(
        ".y-rate-item"
      ) as unknown as HTMLDivElement[];
      mouseActionDom(startItemList, nodeIndex);
    };

    const mouseActionDom = (
      startItemList: HTMLDivElement[],
      nodeIndex: number
    ) => {
      for (let i = 0; i < startItemList.length; i++) {
        const node = startItemList[i];
        const index = Number(node.getAttribute("index"));
        const icon = node.querySelector(".iconfont");
        if (index <= nodeIndex) {
          icon!.className = "iconfont icon-xingxing";
        } else {
          icon!.className = "iconfont icon-xingxing1";
        }
      }
    };

    const initIconList = () => {
      const startItemList = rateRef.value!.querySelectorAll(
        ".y-rate-item"
      ) as unknown as HTMLDivElement[];
      startItemList.forEach((node) => {
        const icon = node.querySelector(".iconfont");
        icon!.className = "iconfont icon-xingxing1";
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
              index={index}
              onMouseenter={(e) => mouseEnterStar(e)}
            >
              <div class={`iconfont ${getStartIcon()}`}></div>
            </div>
          );
        })}
      </div>
    );
  },
});
