import { getDateInfo } from "../../../../components/DatePicker/tool";
import { defineComponent, inject, provide, reactive, ref } from "vue";
import Calendar from "../Calendar/Calendar";
import './index.scss';

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
    emits: [],
    setup(props, { emit }) {
        const modelValue = inject('model-value') as string
        const [currentYear, currentMonth, currentDate] = getDateInfo(
            modelValue
        );
        const dateState = reactive<IDateState>({
            currentYear,
            currentMonth,
            currentDate
        })

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
        provide('dateState', dateState)
        return () => (
            <div class="y-date-menu">
                <div class="y-date-menu-head">
                    <div class="head-left">
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_DECREASE)} class="two iconfont icon-doubleleft"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_DECREASE)} class="one iconfont icon-left1"></span>
                    </div>
                    <div class="head-center">
                        <span class="year">{dateState.currentYear}</span>
                        <span class="month">{dateState.currentMonth}月</span>
                    </div>
                    <div class="head-right">
                        <span onClick={() => changeDate(EDateType.TYPE_MONTH, EClickFlag.FLAG_ADD)} class="one iconfont icon-right-copy"></span>
                        <span onClick={() => changeDate(EDateType.TYPE_YEAR, EClickFlag.FLAG_ADD)} class="two iconfont icon-doubleright-copy"></span>
                    </div>
                </div>
                <div class="y-date-menu-body">
                    <Calendar />
                </div>
            </div>
        );
    },
});
