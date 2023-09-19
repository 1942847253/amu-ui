import { defineComponent, inject, provide, reactive, ref, watch } from "vue";
import Calendar from "../date-calendar";
import DateSelect from "../date-select";
import APopover from "@components/popover";
import { getDateInfo } from "../../tool";
import ShrinkBox from "@components/shrink-box";
import './style/index.less';

export interface IDateState {
    currentYear: number;
    currentMonth: number;
    currentDate: number;
}

export enum EDateType {
    TYPE_YEAR = 'year',
    TYPE_MONTH = 'month'
}

export enum EClickFlag {
    FLAG_ADD = 'add',
    FLAG_DECREASE = 'decrease'
}

export default defineComponent({
    name: "ADateMenu",
    props: {
        dateValue: {
            type: String,
            default: ''
        },
        showDateSelect: {
            type: Boolean,
            default: false
        },
        isInputBlur: Boolean,
        showDateSelectFn: Function
    },
    emits: [],
    setup(props, { emit }) {
        const dateSelectContentKey = inject('dateSelectContentKey') as string
        const dateMenuRef = ref<HTMLDivElement | null>(null)
        const selectpopoverRef = ref()
        const dateState = reactive<IDateState>({
            currentYear: 0,
            currentMonth: 0,
            currentDate: 0
        })

        watch(() => props.dateValue, () => {
            initDateState()
        })

        watch(() => props.isInputBlur, (val) => {
            initDateState();
        })

        const initDateState = () => {
            const [currentYear, currentMonth, currentDate] = getDateInfo(
                props.dateValue
            );
            dateState.currentYear = currentYear
            dateState.currentMonth = currentMonth
            dateState.currentDate = currentDate
        }
        initDateState();
        const changeDate = (type: EDateType, flag: string) => {
            switch (type) {
                case EDateType.TYPE_YEAR:
                    if (flag === EClickFlag.FLAG_ADD) {
                        dateState.currentYear++
                    } else {
                        dateState.currentYear--
                    }
                    break;
                case EDateType.TYPE_MONTH:
                    if (flag === EClickFlag.FLAG_ADD) {
                        if (dateState.currentMonth === 12) {
                            dateState.currentMonth = 1
                            dateState.currentYear++
                            return
                        }
                        dateState.currentMonth++
                    } else {
                        if (dateState.currentMonth === 1) {
                            dateState.currentMonth = 12
                            dateState.currentYear--
                            return
                        }
                        dateState.currentMonth--
                    }
                    break;
                default:
                    break;
            }
        }

        const openShrinkSelect = () => {
            if (props.showDateSelect) {
                props.showDateSelectFn!(false)
                return
            } else {
                props.showDateSelectFn!(true)
            }
            const { popoverRef } = selectpopoverRef.value
            const selectYearEl = popoverRef.querySelector(`.select-year`) as HTMLElement
            const selectMonthEl = popoverRef.querySelector(`.select-month`) as HTMLElement
            const commentInYear = popoverRef.querySelector(`.select-year-index-${dateState.currentYear}`) as HTMLElement
            const commentInMonth = popoverRef.querySelector(`.select-month-index-${dateState.currentMonth}`) as HTMLElement
            setTimeout(() => {
                selectYearEl.scrollTo({ 'behavior': 'auto', 'top': commentInYear.offsetTop - 5 })
                selectMonthEl.scrollTo({ 'behavior': 'auto', 'top': commentInMonth.offsetTop - 5 })
            }, 50);
        }

        const updateYearOrMonthFn = (type: 'year' | 'month', date: number) => {
            if (type === 'year') {
                dateState.currentYear = date;
            } else {
                dateState.currentMonth = date
            }
        }

        const isClickElementInPopover = (flag: boolean) => {
            if (!flag) {
                props.showDateSelectFn!(false)
            }
        };

        provide('dateState', dateState)
        return () => (
            <div class="a-date-menu" ref={dateMenuRef}>
                <div class="a-date-menu-head">
                    <div class="head-left">
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_DECREASE)} class="two iconfont icon-doubleleft"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_DECREASE)} class="one iconfont icon-left1"></span>
                    </div>
                    <div class="head-center">
                        <APopover onIsClickElementInPopover={(flag) => isClickElementInPopover(flag)} ref={selectpopoverRef} trigger="click" visible={props.showDateSelect} width="max-content" padding="0">
                            {{
                                reference: () => <div onClick={() => openShrinkSelect()} tabindex="1" style={{ backgroundColor: props.showDateSelect ? ' #f3f3f3' : '' }} class="year-month">{dateState.currentYear} {dateState.currentMonth}月</div>,
                                default: () => <DateSelect updateYearOrMonthFn={updateYearOrMonthFn} currentYear={dateState.currentYear} currentMonth={dateState.currentMonth} dateValue={props.dateValue} />,
                            }}
                        </APopover>
                    </div>
                    <div class="head-right">
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_ADD)} class="one iconfont icon-right-copy"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_ADD)} class="two iconfont icon-doubleright-copy"></span>
                    </div>
                </div>
                <div class="a-date-menu-body">
                    <Calendar dateValue={props.dateValue} />
                </div>
            </div>
        );
    },
});
