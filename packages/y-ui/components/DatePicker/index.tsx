import { defineComponent, provide } from "vue";
import DateInput from "./component/DateInput/DateInput";
import Calendar from "./component/Calendar/Calendar";
import Menu from "./component/Menu/Menu";
import "./index.scss";

export default defineComponent({
  name: "YDatePicker",
  props: {
    modelValue: {
      type: String,
      default: "2022-11-12",
    },
  },
  emits: ["update:modelValue"],
  components: {
    DateInput,
    Calendar,
  },
  setup(props, { emit }) {
    provide('model-value', props.modelValue)
    return () => (
      <div class="y-datepicker-content">
        <DateInput value={props.modelValue} />
        <Menu />
      </div>
    );
  },
});
