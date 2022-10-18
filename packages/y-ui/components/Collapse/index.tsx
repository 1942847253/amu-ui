import {
  computed,
  DefineComponent,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
import "./index.scss";

export interface IPanelProps {
  key: number | string;
  title: string;
}
export default defineComponent({
  name: "YCollapse",
  emits: [],
  setup(props, ctx) {
    // 获取 slots 里的 key 和 title
    const panels = ctx.slots.default!() as any;

    onMounted(() => {

    });

    return () => (
      <div class="y-collapse-content">
        {panels.map((panelComponent: DefineComponent) => {
          return <panelComponent />;
        })}
      </div>
    );
  },
});
