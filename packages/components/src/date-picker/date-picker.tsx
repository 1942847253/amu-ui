import { defineComponent, provide, ref } from "vue";
import DateInput from "./component/date-input";
import Calendar from "./component/date-calendar";
import Menu from "./component/date-menu/date-menu";
import { APopover } from "..";
import { IDayObj } from "./hooks/useCalendar";
import { getFormetDate } from "./tool";
import { uuid } from "../../shared/utils";
import "./style/index.less";

export default defineComponent({
  name: "ADatePicker",
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
    const isInputBlur = ref(true);
    const showDateSelect = ref(false);
    const datepickerRef = ref<HTMLDivElement | null>(null)
    const updateModelValue = (td: IDayObj, closed: boolean = true) => {
      const { year, month, day } = td
      const dateValue = getFormetDate(year, month, day)
      emit('update:modelValue', dateValue)
      closed && shrinkCalendarSwitchFn(0)
    }

    const shrinkCalendarSwitchFn = (flag: 0 | 1) => {
      isInputBlur.value = flag === 0 ? true : false
    }

    const showDateSelectFn = (flag: 0 | 1) => {
      if (typeof flag === 'boolean') {
        showDateSelect.value = flag
      }
    }

    const isClickElementInPopover = (flag: boolean) => {
      if (!flag && !showDateSelect.value) {
        isInputBlur.value = true;
      }
    };

    const onResetValue = (value: string) => {
      emit('update:modelValue', value)
    }

    provide('model-value', props.modelValue)
    provide('update-modelValue', updateModelValue)
    provide('dateSelectContentKey', dateSelectContentKey)

    return () => (
      <div class={`a-datepicker-content`} id={`${datePickerContentkey}`} ref={datepickerRef}>
        <APopover trigger="click" visible={!isInputBlur.value} width="max-content" padding="0" onIsClickElementInPopover={(flag) => isClickElementInPopover(flag)}>
          {{
            reference: () => <DateInput showDateSelect={showDateSelect.value} showDateSelectFn={showDateSelectFn} shrinkCalendarSwitchFn={shrinkCalendarSwitchFn} value={props.modelValue} onResetValue={(value: string) => onResetValue(value)} />,
            default: () => <Menu showDateSelectFn={showDateSelectFn} showDateSelect={showDateSelect.value} dateValue={props.modelValue} isInputBlur={isInputBlur.value} />
          }}

        </APopover>

      </div>
    );
  },
});
