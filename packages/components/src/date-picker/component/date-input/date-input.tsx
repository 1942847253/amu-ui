import { defineComponent } from "vue";
import AInput from "@components/input";
import './style/index.less';
export default defineComponent({
  name: "ADateInput",
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
  emits: ["inputBlur", 'inputFoucs', 'resetValue'],
  components: {},
  setup(props, { emit }) {
    const shrinkCalendar = () => {
      props.showDateSelectFn!(false)
      props.shrinkCalendarSwitchFn!(1, 0.18)
      // 解决日历展开时,日期选择闪烁的问题
      setTimeout(() => {
        props.showDateSelectFn!(true)
      }, 100);
    }
    return () => (
      <div class="a-date-selector-input">
        <AInput readonly isDate modelValue={props.value} onResetValue={(value: string) => emit('resetValue', value)} onFocus={() => shrinkCalendar()} onBlur={() => emit('inputBlur')} />
      </div>
    );
  },
});
