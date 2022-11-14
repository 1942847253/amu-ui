import { defineComponent, provide, ref, watch } from "vue";
import DateInput from "./component/DateInput/DateInput";
import Calendar from "./component/Calendar/Calendar";
import Menu from "./component/Menu/Menu";
import ShrinkBox from "../ShrinkBox/index";
import "./index.scss";
import { IDayObj } from "./hooks/useCalendar";
import { getFormetDate } from "./tool";

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
    const shrinkViewConfigSwitchFn = ref<Function>()

    const updateModelValue = (td: IDayObj) => {
      const { year, month, day } = td
      const dateValue = getFormetDate(year, month, day)
      emit('update:modelValue', dateValue)
      shrinkViewConfigSwitchFn.value!(0)
    }



    const shrinkViewSwitch = (shrinkViewConfigSwitch: Function) => {
      shrinkViewConfigSwitchFn.value = shrinkViewConfigSwitch
    }
    provide('model-value', props.modelValue)
    provide('update-modelValue', updateModelValue)
    return () => (
      <div class="y-datepicker-content">
        <DateInput shrinkViewConfigSwitchFn={shrinkViewConfigSwitchFn.value} value={props.modelValue} />
        <ShrinkBox contentClass="y-datepicker-content" shrinkViewSwitch={shrinkViewSwitch}>
          <Menu dateValue={props.modelValue} />
        </ShrinkBox>

      </div>
    );
  },
});
