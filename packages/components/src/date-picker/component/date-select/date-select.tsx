import { createAppointArr } from "@/shared/utils";
import { defineComponent, inject, onMounted, reactive, ref } from "vue";
import AScrollbar from "@components/scrollbar";
import './style/index.less';


export default defineComponent({
    name: 'ADateSelect',
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
        const selectYearRef = ref<HTMLDivElement | any>()
        const selectMonthRef = ref<HTMLDivElement | any>()
        const state = reactive({
            selectYear: createAppointArr(1901, 200),
            selectMonth: createAppointArr(1, 12)
        })

        const scrollIntoSelectView = (year: number, month: number) => {

            const scrollYearContainer = selectYearRef.value.$el.querySelector('.a-scrollbar-container')
            const scrollMonthContainer = selectMonthRef.value.$el.querySelector('.a-scrollbar-container')

            const commentInYear = selectYearRef.value!.$el.querySelector(`.select-year-index-${year}`) as HTMLElement
            const commentInMonth = selectMonthRef.value!.$el.querySelector(`.select-month-index-${month}`) as HTMLElement

            scrollYearContainer.scrollTo({ 'behavior': 'smooth', 'top': commentInYear.offsetTop })
            scrollMonthContainer.scrollTo({ 'behavior': 'smooth', 'top': commentInMonth.offsetTop })
        }

        const getSelectYear = (year: number) => {
            props.updateYearOrMonthFn!('year', year)
            scrollIntoSelectView(year, props.currentMonth!)
        }

        const getSelectMonth = (month: number) => {
            props.updateYearOrMonthFn!('month', month)
            scrollIntoSelectView(props.currentYear!, month)
        }

        const isCurrentYearMonth = (type: string, yearOrMonth: number) => {
            if (type === 'year') {
                return props.currentYear === yearOrMonth
            } else {
                return props.currentMonth === yearOrMonth
            }
        }
        return () => (
            <div class="a-date-select-content" id={dateSelectContentKey}>
                <AScrollbar style={{ height: '248px' }} ref={selectYearRef}>
                    <div class="select-year">
                        {state.selectYear.map((year, index) => (
                            <div onClick={() => getSelectYear(year)} key={index} class={`year select-year-index-${year} ${isCurrentYearMonth('year', year) && 'current'}`}>{year}</div>
                        ))}
                    </div>
                </AScrollbar>

                <AScrollbar style={{ height: '248px' }} ref={selectMonthRef}>
                    <div class="select-month">
                        {state.selectMonth.map((month, index) => (
                            <div onClick={() => getSelectMonth(month)} key={index} class={`month select-month-index-${month} ${isCurrentYearMonth('month', month) && 'current'}`}>{month}</div>
                        ))}
                        <div style={`height:212px`}></div>
                    </div>
                </AScrollbar>

            </div>
        )
    }
})