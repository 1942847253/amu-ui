import { defineComponent, inject, reactive, watch, onBeforeMount } from "vue";
import useCalendar, { IDayObj } from "../../hooks/useCalendar";
import { getDateInfo } from "../../tool";
import { IDateState } from "../date-menu/date-menu";
import "./style/index.less";

interface IState {
  weekDays: string[] | IDayObj[][];
  CalendarItemObjArr: IDayObj[];
  CalendarItemChunkArr: IDayObj[][];
}

export default defineComponent({
  name: "ACalendar",
  props: {
    dateValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const dateState = inject('dateState') as IDateState
    const updateModelValue = inject('update-modelValue') as Function
    const state = reactive<IState>({
      weekDays: [],
      CalendarItemChunkArr: [],
      CalendarItemObjArr: []
    })

    watch(() => dateState, () => {
      getDateViewState();
    }, { deep: true })


    onBeforeMount(() => {
      getDateViewState()
    })

    const getDateViewState = () => {
      const { currentYear, currentMonth } = dateState
      const [weekDays, CalendarItemObjArr, CalendarItemChunkArr] = useCalendar(currentYear, currentMonth);
      state.weekDays = weekDays as string[]
      state.CalendarItemChunkArr = CalendarItemChunkArr as IDayObj[][]
      state.CalendarItemObjArr = CalendarItemObjArr as IDayObj[]
    }

    const isCheckedDay = (td: IDayObj) => {
      let isChecked;
      if (props.dateValue !== "") {
        const [yaer, month, day] = getDateInfo(props.dateValue);
        if (yaer === td.year && month === td.month && day === td.day) {
          isChecked = true
        }
      } else {
        isChecked = false
      }
      return isChecked
    }

    const createTdElement = (tdArr: IDayObj[]) => {
      return tdArr.map((td) => {
        const { day, style } = td
        const isChecked = isCheckedDay(td)
        return (
          <td onClick={() => updateModelValue(td)} class={style}><div class={isChecked && 'checked-day'}>{day}</div></td>
        )
      });
    };

    return () => (
      <div class="a-calendar-content">
        <table>
          <thead>
            <tr>
              {state.weekDays.map((week) => (
                <th>{week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.CalendarItemChunkArr.map((tdArr) => (
              <tr>{createTdElement(tdArr as IDayObj[])}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
});
