import { getDateInfo } from "../../../../components/DatePicker/tool";
import { defineComponent, inject, onBeforeMount, provide, reactive, ref, watch } from "vue";
import Calendar from "../Calendar/Calendar";
import DateSelect from "../DateSelect/DateSelect";
import './index.scss';
import ShrinkBox from "../../../../components/ShrinkBox";
import { uuid } from "../../../../shared/utils";

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
    name: "YDateMenu",
    props: {
        dateValue: {
            type: String,
            default: ''
        },
        showDateSelect: {
            type: Boolean,
            default: false
        }
    },
    emits: [],
    setup(props, { emit }) {
        const dateSelectContentKey = inject('dateSelectContentKey') as string
        const shrinkSelectSwitchFn = ref<Function>()
        const dateState = reactive<IDateState>({
            currentYear: 0,
            currentMonth: 0,
            currentDate: 0
        })

        watch(() => props.dateValue, () => {
            initDateState()
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

        const shrinkSelectSwitch = (shrinkViewConfigSwitch: Function) => {
            shrinkSelectSwitchFn.value = shrinkViewConfigSwitch
        }

        const openShrinkSelect = () => {
            shrinkSelectSwitchFn.value!(1)
            const [currentYear, currentMonth, currentDate] = getDateInfo(props.dateValue)
            const commentInYear = document.querySelector(`.select-year-index-${currentYear}`) as HTMLElement
            const commentInMonth = document.querySelector(`.select-month-index-${currentMonth}`) as HTMLElement
            setTimeout(() => {
                commentInYear.scrollIntoView({ behavior: "auto" });
                commentInMonth.scrollIntoView({ behavior: 'auto' })
            }, 10);
        }

        const updateYearOrMonthFn = (type: 'year' | 'month', date: number) => {
            if (type === 'year') {
                dateState.currentYear = date;
            } else {
                dateState.currentMonth = date
            }
        }
        provide('dateState', dateState)
        return () => (
            <div class="y-date-menu">
                <div class="y-date-menu-head">
                    <div class="head-left">
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_DECREASE)} class="two iconfont icon-doubleleft"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_DECREASE)} class="one iconfont icon-left1"></span>
                    </div>
                    <div class="head-center">
                        <div onClick={() => openShrinkSelect()} tabindex="1" class="year-month">{dateState.currentYear} {dateState.currentMonth}月</div>
                        {props.showDateSelect && <ShrinkBox contentID={dateSelectContentKey} shrinkViewSwitch={shrinkSelectSwitch}>
                            <DateSelect updateYearOrMonthFn={updateYearOrMonthFn} currentYear={dateState.currentYear} currentMonth={dateState.currentMonth} dateValue={props.dateValue} />
                        </ShrinkBox>}
                    </div>
                    <div class="head-right">
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_ADD)} class="one iconfont icon-right-copy"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_ADD)} class="two iconfont icon-doubleright-copy"></span>
                    </div>
                </div>
                <div class="y-date-menu-body">
                    <Calendar dateValue={props.dateValue} />
                </div>
            </div>
        );
    },
});
