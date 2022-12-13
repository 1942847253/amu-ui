import { defineComponent } from "vue";
import YInput from "../../../Input";
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
  emits: ["inputBlur",'inputFoucs'],
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
      <div class="y-date-selector-input">
        {/* <input
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
        ></span> */}
        <YInput isDate modelValue={props.value} onFocus={() => shrinkCalendar()} onBlur={()=>emit('inputBlur')} />
      </div>
    );
  },
});
