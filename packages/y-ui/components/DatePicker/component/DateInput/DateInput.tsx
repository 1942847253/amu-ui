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
        <YInput readonly isDate modelValue={props.value} onFocus={() => shrinkCalendar()} onBlur={()=>emit('inputBlur')} />
      </div>
    );
  },
});
