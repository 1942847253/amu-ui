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
    const shrinkCalendarSwitchFn = ref<Function>()
    const showDateSelect = ref(false);

    const updateModelValue = (td: IDayObj, closed: boolean = true) => {
      const { year, month, day } = td
      const dateValue = getFormetDate(year, month, day)
      emit('update:modelValue', dateValue)
      closed && shrinkCalendarSwitchFn.value!(0)
    }

    const shrinkCalendarSwitch = (shrinkViewConfigSwitch: Function) => {
      shrinkCalendarSwitchFn.value = shrinkViewConfigSwitch
    }

    const showDateSelectFn = (value: boolean) => {
      showDateSelect.value = value
    }

    provide('model-value', props.modelValue)
    provide('update-modelValue', updateModelValue)
    return () => (
      <div class="y-datepicker-content">
        <DateInput showDateSelect={showDateSelect.value} showDateSelectFn={showDateSelectFn} shrinkCalendarSwitchFn={shrinkCalendarSwitchFn.value} value={props.modelValue} />
        <ShrinkBox contentClass="y-datepicker-content" shrinkViewSwitch={shrinkCalendarSwitch}>
          <Menu showDateSelect={showDateSelect.value} dateValue={props.modelValue} />
        </ShrinkBox>

      </div>
    );
  },
});
