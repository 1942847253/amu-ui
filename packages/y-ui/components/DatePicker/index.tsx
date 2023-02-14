import { defineComponent, provide, ref, watch } from "vue";
import DateInput from "./component/DateInput/DateInput";
import Calendar from "./component/Calendar/Calendar";
import Menu from "./component/Menu/Menu";
import ShrinkBox from "../ShrinkBox/index";
import "./index.less";
import { IDayObj } from "./hooks/useCalendar";
import { getFormetDate } from "./tool";
import { uuid } from "../../shared/utils";

export default defineComponent({
  name: "YDatePicker",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  components: {
    DateInput,
    Calendar,
  },
  setup(props, { emit }) {
    const datePickerContentkey = uuid();
    const dateSelectContentKey = uuid()
    const shrinkCalendarSwitchFn = ref<Function>()
    const isInputBlur = ref(false);
    const showDateSelect = ref(false);
    const datepickerRef = ref<HTMLDivElement | null>(null)
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
      if(value){
        isInputBlur.value = false;
      }
    }

    const onResetValue = (value:string)=>{
      emit('update:modelValue', value)
    }
    provide('model-value', props.modelValue)
    provide('update-modelValue', updateModelValue)
    provide('dateSelectContentKey', dateSelectContentKey)
    return () => (
      <div class={`y-datepicker-content`} id={`${datePickerContentkey}`} ref={datepickerRef}>
        <DateInput showDateSelect={showDateSelect.value} showDateSelectFn={showDateSelectFn} shrinkCalendarSwitchFn={shrinkCalendarSwitchFn.value} value={props.modelValue} onInputBlur={() => isInputBlur.value = true} onResetValue={(value: string) => onResetValue(value)} />
        <ShrinkBox contentID={datePickerContentkey} shrinkViewSwitch={shrinkCalendarSwitch}>
          <Menu showDateSelect={showDateSelect.value} dateValue={props.modelValue} isInputBlur={isInputBlur.value} />
        </ShrinkBox>

      </div>
    );
  },
});
