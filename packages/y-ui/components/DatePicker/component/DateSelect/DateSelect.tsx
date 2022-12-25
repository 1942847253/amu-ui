import { createAppointArr, getStyleAttributeValue, scrollIntoView } from "../../../../shared/utils";
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
        currentYear: Number,
        currentMonth: Number,
        updateYearOrMonthFn: Function
    },
    setup(props, { emit }) {
        const dateSelectContentKey = inject('dateSelectContentKey') as string
        const selectYearRef = ref<HTMLDivElement | null>(null)
        const selectMonthRef = ref<HTMLDivElement | null>(null)
        const state = reactive({
            selectYear: createAppointArr(1901, 200),
            selectMonth: createAppointArr(1, 12)
        })

        const scrollIntoSelectView = (year: number, month: number) => {
            const commentInYear = selectYearRef.value!.querySelector(`.select-year-index-${year}`) as HTMLElement
            const commentInMonth = selectMonthRef.value!.querySelector(`.select-month-index-${month}`) as HTMLElement
            setTimeout(() => {
                selectYearRef.value!.scrollTo({ 'behavior': 'smooth', 'top': commentInYear.offsetTop - 5 })
                selectMonthRef.value!.scrollTo({ 'behavior': 'smooth', 'top': commentInMonth.offsetTop - 5 })
            }, 10);
        }

        const getSelectYear = (year: number) => {
            props.updateYearOrMonthFn!('year', year)
            scrollIntoSelectView(year, props.currentMonth!)
        }

        const getSelectMonth = (month: number) => {
            props.updateYearOrMonthFn!('month', month)
            scrollIntoSelectView(props.currentYear!, month)
        }

        const changeSelectContentScroll = (type: string, isShow: Boolean) => {
            if (type === 'year') {
                selectYearRef.value!.style.overflow = isShow ? 'overlay' : 'hidden'
            } else {
                selectMonthRef.value!.style.overflow = isShow ? 'overlay' : 'hidden'
            }
        }

        const isCurrentYearMonth = (type: string, yearOrMonth: number) => {
            if (type === 'year') {
                return props.currentYear === yearOrMonth
            } else {
                return props.currentMonth === yearOrMonth
            }
        }
        return () => (
            <div class="y-date-select-content" id={dateSelectContentKey}>
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