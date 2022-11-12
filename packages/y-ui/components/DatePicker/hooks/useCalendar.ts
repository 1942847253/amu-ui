import { watch } from "vue";
import { chunk } from "../../../shared/utils";
import {
  getDateInfo,
  getLastMonthRestDays,
  getMonthDayCount,
  getNextMonthRestDays,
} from "../tool";

export interface IDayObj {
  day: number;
  style: string;
  isRestDay: boolean;
  year: number;
  month: number;
}

export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

const useCalendar = (year: number, month: number) => {
  const lastMothRestDays = getLastMonthRestDays(year, month);
  const currentMonthDays = getMonthDayCount(year, month);
  const nextMonthRestDays = getNextMonthRestDays(year, month);

  const CalendarItemArr = [] as IDayObj[];
  const [currentYear, currentMonth, currentDate] = getDateInfo();
  for (let i = 1; i <= currentMonthDays; i++) {
    const isCurrentDate =
      currentYear === year && currentMonth === month && currentDate === i;
    CalendarItemArr.push({
      day: i,
      style: isCurrentDate ? "day current-day current" : "day current-day",
      isRestDay: false,
      year,
      month,
    });
  }
  const CalendarItemObjArr = [
    ...getDaysObjArr(lastMothRestDays, year, month),
    ...CalendarItemArr,
    ...getDaysObjArr(nextMonthRestDays, year, month),
  ];
  return [
    WEEK_DAYS,
    CalendarItemObjArr,
    chunk(CalendarItemObjArr, 7) as IDayObj[][],
  ];
};

const getDaysObjArr = (DaysArr: number[], year: number, month: number) => {
  let DaysObjArr: IDayObj[] = [];
  DaysArr.forEach((day) => {
    DaysObjArr.push({
      day,
      style: "day rest-day",
      isRestDay: true,
      year,
      month,
    } as IDayObj);
  });
  return DaysObjArr;
};

export default useCalendar;
