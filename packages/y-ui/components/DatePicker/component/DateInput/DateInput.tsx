import { defineComponent } from "vue";
import './index.scss';
export default defineComponent({
  name: "YDateInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    showDateSelect: {
      type: Boolean,
      default: false
    },
    shrinkCalendarSwitchFn: Function,
    showDateSelectFn: Function,
  },
  emits: ["onChangeDateSelect"],
  components: {},
  setup(props, { emit }) {
    const shrinkCalendar = () => {
      props.showDateSelectFn!(false)
      props.shrinkCalendarSwitchFn!(1, 0.18)
      setTimeout(() => {
        props.showDateSelectFn!(true)
      }, 10);
    }
    return () => (
      <div class="selector-input">
        <input
          readonly
          class="input"
          type="text"
          value={props.value}
          placeholder="选择一个时间"
          ref="input"
          onFocus={() => shrinkCalendar()}
        />
        <span
          style="transform: translateX(-50 %) rotate(-90deg)"
          class="iconfont icon-xiangxia"
        ></span>
      </div>
    );
  },
});
