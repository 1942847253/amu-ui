import {
  computed,
  DefineComponent,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
import "./style/index.less";

export interface IPanelProps {
  key: number | string;
  title: string;
}
export default defineComponent({
  name: "ATabs",
  props: {
    defaultActiveKey: [String, Number],
    position: {
      type: String,
      default: () => "top",
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const state = reactive({
      barWidth: 0,
      barOffset: 0,
    });
    const navWrap = ref();
    // 获取 slots 里的 key 和 title
    const panels = ctx.slots.default!() as any;
    const titles = panels.map((child: any) => {
      const { props = {} } = child;
      const { key, title } = props;
      return {
        key,
        title,
      };
    }) as IPanelProps[];
    // 当前 actKey
    const actKey = ref(props.defaultActiveKey);
    const isTop = props.position === "top" || props.position !== "left";
    const barStyle = computed(() => {
      const transform = isTop
        ? `translate3d(${state.barOffset}px,0px,0px)`
        : `translate3d(0px,${state.barOffset}px,0px)`;
      return {
        width: `${state.barWidth}px`,
        transform: transform,
      };
    });

    onMounted(() => {
      updataBar();
    });

    const updataBar = () => {
      nextTick(() => {
        //当前选中的activeKey下标
        const index = titles.findIndex(
          (titleInfo) => titleInfo.key === actKey.value
        );
        //获取navWrap元素下的所有tab的元素
        const elemTabs = (navWrap.value as HTMLElement).querySelectorAll(
          ".tabs-tab"
        );
        //获取当前选中的元素
        const elemTab = elemTabs[index] as HTMLElement;
        state.barWidth = elemTab
          ? isTop
            ? elemTab.offsetWidth
            : elemTab.offsetHeight
          : 0;
        //计算需要移动的距离,当index > 0时进行累加
        if (index > 0) {
          let offset = 0;
          for (let i = 0; i < index; i++) {
            const currentEl = elemTabs[i] as HTMLElement;
            offset += isTop ? currentEl.offsetWidth : currentEl.offsetHeight;
          }
          state.barOffset = offset;
        } else {
          state.barOffset = 0;
        }
      });
    };
    const changeActKey = (key: string | number) => {
      actKey.value = key;
      updataBar();
      ctx.emit("change", key); // 触发回调函数
    };

    return () => (
      <div
        class="tabs-content"
        style={isTop ? { flexDirection: "column" } : ""}
      >
        <div class="tabs">
          <div
            ref={navWrap}
            class="tabs-nav-wrap"
            style={
              isTop
                ? { borderBottom: "1px solid #dcdee2" }
                : { borderRight: "1px solid #dcdee2" }
            }
          >
            <div
              class={isTop ? "tabs-inv-bar-top" : "tabs-inv-bar-left"}
              style={barStyle.value}
            ></div>
            <div
              class="tab-list"
              style={
                isTop ? "" : { flexDirection: "column", alignItems: "flex-end" }
              }
            >
              {titles.map((titleInfo) => {
                const { key, title } = titleInfo;
                return (
                  <div
                    class={`tabs-tab ${
                      key === actKey.value ? "tabs-tab-active" : ""
                    }`}
                    key={key}
                    onClick={() => changeActKey(key)}
                  >
                    {title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div class="pane-content">
          {panels.filter((panelComponent: DefineComponent) => {
            const { props } = panelComponent;
            const { key } = props;
            return actKey.value === key && <panelComponent />;
          })}
        </div>
      </div>
    );
  },
});
