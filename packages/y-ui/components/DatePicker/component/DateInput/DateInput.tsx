import { defineComponent } from "vue";
import './index.scss';
export default defineComponent({
  name: "YDateInput",
  props: {
    value: {
      type: String,
      defualt: "",
    },
    shrinkViewConfigSwitchFn: Function
  },
  emits: [],
  components: {},
  setup(props, { emit }) {
    return () => (
      <div class="selector-input">
        <input
          class="input"
          type="text"
          value={props.value}
          placeholder="选择一个时间"
          ref="input"
          onFocus={() => props.shrinkViewConfigSwitchFn!(1)}
        />
        <span
          style="transform: translateX(-50 %) rotate(-90deg)"
          class="iconfont icon-xiangxia"
        ></span>
      </div>
    );
  },
});
