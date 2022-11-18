import { createAppointArr } from "../../../../shared/utils";
import { defineComponent, inject, onMounted, reactive, ref } from "vue";
import { getDateInfo } from "../../../../components/DatePicker/tool";
import './index.scss';


export default defineComponent({
    name: 'YDateSelect',
    props: {
        dateValue: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit }) {
        const updateModelValue = inject('update-modelValue') as Function
        const selectYearRef = ref<HTMLDivElement | null>(null)
        const selectMonthRef = ref<HTMLDivElement | null>(null)
        const state = reactive({
            selectYear: createAppointArr(1901, 200),
            selectMonth: createAppointArr(1, 12)
        })

        onMounted(() => {

        })

        const scrollIntoSelectView = (year: number, month: number) => {
            const commentInYear = selectYearRef.value!.querySelector(`.select-year-index-${year}`) as HTMLElement
            const commentInMonth = selectMonthRef.value!.querySelector(`.select-month-index-${month}`) as HTMLElement
            setTimeout(() => {
                commentInYear.scrollIntoView({ behavior: "auto" });
                commentInMonth.scrollIntoView({ behavior: 'auto' })
            }, 10);
        }

        const getSelectYear = (year: number) => {
            const [currentYear, currentMonth, currentDate] = getDateInfo(props.dateValue)
            updateModelValue({ year, month: currentMonth, day: currentDate }, false)
            scrollIntoSelectView(year, currentMonth)
        }

        const getSelectMonth = (month: number) => {
            const [currentYear, currentMonth, currentDate] = getDateInfo(props.dateValue)
            updateModelValue({ year: currentYear, month, day: currentDate }, false)
            scrollIntoSelectView(currentYear, month)
        }

        const changeSelectContentScroll = (type: string, isShow: Boolean) => {
            if (type === 'year') {
                selectYearRef.value!.style.overflow = isShow ? 'overlay' : 'hidden'
            } else {
                selectMonthRef.value!.style.overflow = isShow ? 'overlay' : 'hidden'
            }
        }

        const isCurrentYearMonth = (type: string, yearOrMonth: number) => {
            const [currentYear, currentMonth] = getDateInfo(props.dateValue)
            if (type === 'year') {
                return currentYear === yearOrMonth
            } else {
                return currentMonth === yearOrMonth
            }
        }
        return () => (
            <div class="y-date-select-content">
                <div class="select-year" ref={selectYearRef} onMouseenter={() => changeSelectContentScroll('year', true)} onMouseleave={() => changeSelectContentScroll('year', false)}>
                    {state.selectYear.map((year, index) => (
                        <div onClick={() => getSelectYear(year)} key={index} class={`year select-year-index-${year} ${isCurrentYearMonth('year', year) && 'current'}`}>{year}</div>
                    ))}
                </div>
                <div class="select-month" ref={selectMonthRef} onMouseenter={() => changeSelectContentScroll('month', true)} onMouseleave={() => changeSelectContentScroll('month', false)}>
                    {state.selectMonth.map((month, index) => (
                        <div onClick={() => getSelectMonth(month)} key={index} class={`month select-month-index-${month} ${isCurrentYearMonth('month', month) && 'current'}`}>{month}</div>
                    ))}
                    <div style={`height:212px`}></div>
                </div>
            </div>
        )
    }
})