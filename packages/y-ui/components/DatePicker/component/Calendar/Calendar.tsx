import { computed, defineComponent, inject, reactive, ref, Ref, watch, onBeforeMount } from "vue";
import useCalendar, { IDayObj } from "../../hooks/useCalendar";
import { getDateInfo } from "../../tool";
import { IDateState } from "../Menu/Menu";
import "./index.scss";

interface IState {
  weekDays: string[] | IDayObj[][];
  CalendarItemObjArr: IDayObj[];
  CalendarItemChunkArr: IDayObj[][];
}

export default defineComponent({
  name: "YCalendar",
  props: {
    dateValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const dateState = inject('dateState') as IDateState
    const updateModelValue = inject('update-modelValue') as Function
    const checkedDayIndex = ref(-1)
    const state = reactive<IState>({
      weekDays: [],
      CalendarItemChunkArr: [],
      CalendarItemObjArr: []
    })
    
    watch(() => dateState, () => {
      getDateViewState();
      initCheckedDayIndex()
    }, { deep: true })

    watch(() => props.dateValue,()=>{
      initCheckedDayIndex()
    })

    onBeforeMount(() => {
      getDateViewState()
      initCheckedDayIndex()
    })

    const getDateViewState = () => {
      const [weekDays, CalendarItemObjArr, CalendarItemChunkArr] = useCalendar(dateState.currentYear, dateState.currentMonth);
      state.weekDays = weekDays as string[]
      state.CalendarItemChunkArr = CalendarItemChunkArr as IDayObj[][]
      state.CalendarItemObjArr = CalendarItemObjArr as IDayObj[]
    }

    const initCheckedDayIndex = () => {
      const [currentYear, currentMonth, currentDate] = getDateInfo(props.dateValue)
      for (let i = 0; i < state.CalendarItemObjArr.length; i++) {
        const item = state.CalendarItemObjArr[i]
        if (dateState.currentYear === currentYear && dateState.currentMonth === currentMonth && item.day === currentDate && !item.isRestDay) {
          checkedDayIndex.value = item.day
          return
        } else {
          checkedDayIndex.value = -1
        }
      }
    }

    const createTdElement = (tdArr: IDayObj[]) => {
      return tdArr.map((td) => {
        const { day, style, isRestDay } = td
        const isChecked = (checkedDayIndex.value === day && !isRestDay)
        return (
          <td onClick={() => checkDate(td)} class={style}><div class={isChecked && 'checked-day'}>{day}</div></td>
        )
      });
    };

    const checkDate = (td: IDayObj) => {
      const { day, isRestDay } = td
      if (!isRestDay) {
        checkedDayIndex.value = day
      }
      updateModelValue(td)
    }

    return () => (
      <div class="y-calendar-content">
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
